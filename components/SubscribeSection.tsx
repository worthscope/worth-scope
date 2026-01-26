import React from 'react';
import { Headphones, Radio, Podcast } from 'lucide-react';

// Custom Heart Icon wrapper for reuse
const HeartIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
    <path d="M12 5.36l-1.41-1.42a5.4 5.4 0 0 0-7.65 0C.8 6.07.68 9.65 3.35 12.35" className="opacity-50" strokeDasharray="4 2"/>
  </svg>
);

// Simple small letter 'a' Icon
const AmazonIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none"
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="14" r="4" />
    <path d="M16 10v8" />
  </svg>
);

const SubscribeSection: React.FC = () => {
  const platforms = [
    {
      name: "Apple Podcasts",
      url: "https://podcasts.apple.com/us/podcast/playing-books/id1768578068",
      Icon: Podcast,
      color: "hover:bg-purple-600"
    },
    {
      name: "Spotify",
      url: "https://open.spotify.com/show/79YPMiPBPl08ffi3u30aRj",
      Icon: Headphones,
      color: "hover:bg-green-600"
    },
    {
      name: "Amazon Music",
      url: "https://music.amazon.com/podcasts/aed261f1-3816-4aef-b12c-4f2881c3ade0/playing-books",
      Icon: AmazonIcon,
      color: "hover:bg-[#25D1DA]" // Official Amazon Music Cyan
    },
    {
      name: "Podcast Addict",
      url: "https://podcastaddict.com/podcast/playing-books/5948903",
      Icon: Radio,
      color: "hover:bg-orange-600"
    },
    {
      name: "iHeart",
      url: "https://www.iheart.com/podcast/269-playing-books-273472023/",
      Icon: HeartIcon,
      color: "hover:bg-red-600"
    }
  ];

  return (
    <section id="subscribe" className="animate-soft-glow py-8 md:py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal-section" style={{ animationDelay: '0.2s' }}>
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-xl md:text-4xl font-serif font-bold text-[#fdfce9] mb-2 md:mb-4">
            Subscribe Now
          </h2>
          <p className="text-[#fdfce9]/90 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
            Never miss an episode. Subscribe to our podcast on your favorite platform.
          </p>
        </div>

        {/* Updated Layout: Flex with fixed small sizes on mobile */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-6 max-w-5xl mx-auto">
          {platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center justify-center w-28 h-28 md:w-40 md:h-40 p-2 md:p-4 rounded-xl md:rounded-2xl border border-transparent bg-[#fdfce9] text-[#36454f] transition-all duration-300 hover:text-white hover:shadow-2xl transform hover:-translate-y-2 group ${platform.color} shadow-lg`}
            >
              <div className="mb-2 md:mb-4 p-2 md:p-4 bg-white rounded-full shadow-sm text-[#1695a0] group-hover:bg-white/20 group-hover:text-white transition-colors flex items-center justify-center h-12 w-12 md:h-16 md:w-16">
                <platform.Icon className="w-5 h-5 md:w-8 md:h-8" />
              </div>
              <span className="font-bold text-center leading-tight text-[10px] md:text-base">{platform.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;