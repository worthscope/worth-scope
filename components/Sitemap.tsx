import React from 'react';
import { ArrowLeft, Map, Home, Library, Info, Heart, Mail, Shield, FileText, Cookie, Podcast, ExternalLink, Facebook, Twitter, Instagram, Video } from 'lucide-react';

interface SitemapProps {
  onBack: () => void;
  onHome: () => void;
  onLibrary: () => void;
  onAbout: () => void;
  onSubscribe: () => void;
  onDonate: () => void;
  onTerms: () => void;
  onPrivacy: () => void;
  onCookie: () => void;
}

const Sitemap: React.FC<SitemapProps> = ({
  onBack,
  onHome,
  onLibrary,
  onAbout,
  onSubscribe,
  onDonate,
  onTerms,
  onPrivacy,
  onCookie
}) => {
    const sections = [
        {
            title: "Main Navigation",
            links: [
                { label: "Home", icon: <Home size={18} />, action: onHome },
                { label: "Library & Episodes", icon: <Library size={18} />, action: onLibrary },
                { label: "About Us", icon: <Info size={18} />, action: onAbout },
            ]
        },
        {
            title: "Get Involved",
            links: [
                { label: "Subscribe", icon: <Podcast size={18} />, action: onSubscribe },
                { label: "Donate", icon: <Heart size={18} />, action: onDonate },
                { label: "Contact", icon: <Mail size={18} />, href: "mailto:worthscope@usa.com" },
            ]
        },
        {
            title: "Social Media",
            links: [
                { label: "Facebook", icon: <Facebook size={18} />, href: "https://www.facebook.com/worthscope" },
                { label: "X (Twitter)", icon: <Twitter size={18} />, href: "https://x.com/worthscope" },
                { label: "Instagram", icon: <Instagram size={18} />, href: "https://www.instagram.com/playingbookspodcast" },
                { label: "TikTok", icon: <Video size={18} />, href: "https://www.tiktok.com/@playingbookspodcast" },
            ]
        },
        {
            title: "Legal & Privacy",
            links: [
                { label: "Privacy Policy", icon: <Shield size={18} />, action: onPrivacy },
                { label: "Terms of Service", icon: <FileText size={18} />, action: onTerms },
                { label: "Cookie Policy", icon: <Cookie size={18} />, action: onCookie },
            ]
        }
    ];

    return (
        <div className="bg-[#fdfce9] min-h-screen animate-fade-in-up">
             {/* Header */}
             <div className="bg-[#1695a0] text-[#fdfce9] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#127a82]/50 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <button 
                        onClick={onBack}
                        className="flex items-center gap-2 text-[#fdfce9]/80 hover:text-white mb-8 transition-colors font-medium group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </button>

                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-[#fdfce9]/20 backdrop-blur-md rounded-2xl">
                            <Map size={32} />
                        </div>
                        <span className="text-[#fdfce9]/80 font-medium tracking-wide uppercase text-sm">Site Overview</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Sitemap</h1>
                    <p className="text-xl text-[#fdfce9]/90 max-w-2xl leading-relaxed">
                        An overview of the available content and community links on Playing Books.
                    </p>
                </div>
             </div>

             <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {sections.map((section, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-[#1695a0]/10">
                            <h2 className="text-[#1695a0] font-serif font-bold text-xl mb-6 pb-2 border-b border-[#1695a0]/10">
                                {section.title}
                            </h2>
                            <ul className="space-y-4">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        {link.action ? (
                                            <button 
                                                onClick={link.action}
                                                className="flex items-center gap-3 text-[#36454f] hover:text-[#1695a0] transition-colors w-full text-left group"
                                            >
                                                <span className="p-2 bg-[#fdfce9] rounded-lg text-[#1695a0] group-hover:bg-[#1695a0] group-hover:text-[#fdfce9] transition-colors">
                                                    {link.icon}
                                                </span>
                                                <span className="font-medium">{link.label}</span>
                                            </button>
                                        ) : (
                                            <a 
                                                href={link.href}
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 text-[#36454f] hover:text-[#1695a0] transition-colors w-full text-left group"
                                            >
                                                 <span className="p-2 bg-[#fdfce9] rounded-lg text-[#1695a0] group-hover:bg-[#1695a0] group-hover:text-[#fdfce9] transition-colors">
                                                    {link.icon}
                                                </span>
                                                <span className="font-medium flex-grow">{link.label}</span>
                                                <ExternalLink size={14} className="opacity-50" />
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
             </div>
        </div>
    );
};

export default Sitemap;