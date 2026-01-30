import { Episode } from '../types';

const RSS_URL = 'https://anchor.fm/s/103ba4880/podcast/rss';

export const fetchEpisodes = async (): Promise<Episode[]> => {
    const timestamp = Date.now();
    const freshRssUrl = `${RSS_URL}?t=${timestamp}`;

    // Strategy 1: Direct Fetch (Primary - fastest and most reliable if CORS allowed)
    try {
        console.log("Attempting Strategy 1: Direct Fetch...");
        const response = await fetch(freshRssUrl);
        if (response.ok) {
            const str = await response.text();
            if (str.includes('<rss') || str.includes('<?xml')) {
                const parser = new DOMParser();
                const xml = parser.parseFromString(str, "text/xml");
                const items = xml.querySelectorAll("item");

                if (items.length > 0) {
                    console.log("Episodes fetched via Direct Fetch");
                    const episodes = Array.from(items)
                        .map(item => mapXmlItemToEpisode(item, xml))
                        .filter(e => e.audioUrl);

                    if (episodes.length > 0) return episodes;
                }
            }
        }
    } catch (error) {
        console.warn("Strategy 1 (Direct Fetch) failed:", error);
    }

    // Strategy 2: Try CORS Proxy with raw XML (Backup)
    try {
        console.warn("Falling back to Strategy 2 (corsproxy)...");
        // Add cache buster to the proxy request as well just in case
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(freshRssUrl)}`;
        const response = await fetch(proxyUrl);

        if (response.ok) {
            const str = await response.text();
            if (str.includes('<rss') || str.includes('<?xml')) {
                const parser = new DOMParser();
                const xml = parser.parseFromString(str, "text/xml");
                const items = xml.querySelectorAll("item");

                if (items.length > 0) {
                    console.log("Episodes fetched via CORS proxy (Fresh XML structure)");
                    const episodes = Array.from(items)
                        .map(item => mapXmlItemToEpisode(item, xml))
                        .filter(e => e.audioUrl);

                    if (episodes.length > 0) return episodes;
                }
            }
        }
    } catch (error) {
        console.warn("Strategy 2 (corsproxy) failed:", error);
    }

    // Strategy 3: Try rss2json (Last Resort - reliable but cached)
    try {
        console.warn("Falling back to Strategy 3 (rss2json)...");
        // Add count=50 to get a good number of episodes.
        // Uses api.rss2json.com which handles XML parsing server-side.
        // Note: rss2json usually ignores query params on the source URL for caching, so it might still be stale,
        // but it serves as a good reliable backup if the proxy fails.
        const jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}&count=50`;
        const response = await fetch(jsonUrl);

        if (response.ok) {
            const data = await response.json();
            if (data.status === 'ok' && data.items && data.items.length > 0) {
                console.log("Episodes fetched via rss2json");
                return data.items
                    .map((item: any) => mapJsonItemToEpisode(item, data.feed))
                    .filter((e: Episode) => e.audioUrl);
            }
        }
    } catch (error) {
        console.warn("Strategy 3 (rss2json) failed:", error);
    }

    // All strategies failed
    console.warn("All fetch strategies failed.");
    return [];
};

// --- Helpers for Strategy 3 (JSON) ---

function mapJsonItemToEpisode(item: any, feed: any): Episode {
    const feedImage = feed.image || "";
    // rss2json puts itunes:image into thumbnail usually
    const imageUrl = item.thumbnail || feedImage || "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop";

    return {
        id: item.guid,
        title: item.title,
        author: item.author || feed.title || "Playing Books",
        description: stripHtml(item.description || item.content),
        duration: formatDuration(item.enclosure?.duration),
        imageUrl: imageUrl,
        audioUrl: item.enclosure?.link || "",
        category: "Podcast"
    };
}

// --- Helpers for Strategy 1 & 2 (XML) ---

function mapXmlItemToEpisode(item: Element, xml: Document): Episode {
    const getVal = (tag: string) => item.getElementsByTagName(tag)[0]?.textContent || "";

    // Image handling
    const channelImage = xml.querySelector("channel > image > url")?.textContent || "";
    let imageUrl = channelImage;
    const itunesImage = item.getElementsByTagName("itunes:image")[0];
    if (itunesImage && itunesImage.getAttribute("href")) {
        imageUrl = itunesImage.getAttribute("href")!;
    }
    if (!imageUrl) {
        imageUrl = "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop";
    }

    const enclosure = item.getElementsByTagName("enclosure")[0];
    const audioUrl = enclosure?.getAttribute("url") || "";

    return {
        id: getVal("guid") || Math.random().toString(),
        title: getVal("title"),
        author: getVal("itunes:author") || getVal("author") || "Playing Books",
        description: stripHtml(getVal("description") || getVal("itunes:summary")),
        duration: formatDuration(getVal("itunes:duration")),
        imageUrl: imageUrl,
        audioUrl: audioUrl,
        category: getVal("itunes:category") || "Podcast"
    };
}

// --- General Utilities ---

function stripHtml(html: string): string {
    if (!html) return "";
    try {
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        let txt = tmp.textContent || tmp.innerText || "";
        txt = txt.replace(/\s+/g, " ").trim();
        if (txt.length > 250) return txt.substring(0, 250) + "...";
        return txt;
    } catch (e) {
        return html.substring(0, 250);
    }
}

function formatDuration(duration: any): string {
    if (!duration) return "Audio";

    // Handle seconds (number or string like "1234")
    const seconds = parseInt(duration, 10);
    if (!isNaN(seconds) && !String(duration).includes(":")) {
        const mins = Math.floor(seconds / 60);
        return `${mins} min`;
    }

    // Handle "HH:MM:SS" or "MM:SS"
    const str = String(duration);
    if (str.includes(":")) {
        const parts = str.split(":");
        if (parts.length === 3) { // HH:MM:SS
            const h = parseInt(parts[0]);
            const m = parseInt(parts[1]);
            if (h > 0) return `${h}h ${m}m`;
            return `${m} min`;
        }
        if (parts.length === 2) { // MM:SS
            return `${parseInt(parts[0])} min`;
        }
    }
    return str;
}