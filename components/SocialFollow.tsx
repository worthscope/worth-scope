import React from 'react';
import { ExternalLink } from 'lucide-react';

const SocialFollow: React.FC = () => {
  const socials = [
    {
      name: "Facebook",
      handle: "@worthscope",
      url: "https://www.facebook.com/worthscope",
      color: "hover:bg-[#1877F2] hover:border-[#1877F2]",
      textColor: "group-hover:text-[#1877F2]",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-8 md:h-8">
          <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.648 0-2.928 1.67-2.928 3.403v1.518h3.949l-1.006 3.667h-2.943v7.98h-5.34z" />
        </svg>
      )
    },
    {
      name: "X (Twitter)",
      handle: "@worthscope",
      url: "https://x.com/worthscope",
      color: "hover:bg-black hover:border-black",
      textColor: "group-hover:text-black",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-8 md:h-8">
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
        </svg>
      )
    },
    {
      name: "Instagram",
      handle: "@playingbookspodcast",
      url: "https://www.instagram.com/playingbookspodcast",
      color: "hover:bg-[#E1306C] hover:border-[#E1306C]",
      textColor: "group-hover:text-[#E1306C]",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-8 md:h-8">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.011-4.849-.069-3.225-.149-4.771-1.664-4.919-4.919-.058-1.265-.069-1.644-.069-4.849 0-3.204.013-3.583.069-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
        </svg>
      )
    },
    {
      name: "TikTok",
      handle: "@playingbookspodcast",
      url: "https://www.tiktok.com/@playingbookspodcast",
      color: "hover:bg-[#FE2C55] hover:border-[#FE2C55] hover:shadow-[0_0_15px_rgba(254,44,85,0.5)]",
      textColor: "group-hover:text-[#FE2C55]",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-8 md:h-8">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.76v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.1c-.13 1.83-1.04 3.54-2.43 4.81-1.4 1.28-3.27 2.01-5.12 2.01-1.99.03-3.95-.71-5.46-2.07-1.52-1.35-2.44-3.28-2.58-5.32-.17-2.31 1.05-4.52 3.02-5.74 1.48-.91 3.22-1.31 4.95-1.26v4.05c-.86-.06-1.72.19-2.43.69-.71.5-1.16 1.29-1.25 2.16.03 1.09.73 2.07 1.75 2.45 1.02.38 2.19.16 3.02-.57.84-.73 1.34-1.78 1.39-2.89V6.04c0-2.01-.02-4.01.01-6.02Z" />
        </svg>
      )
    }
  ];

  return (
    <section className="bg-[#1695a0] py-8 md:py-16 border-t border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 md:mb-12 gap-6 text-center md:text-left">
          <div>
            <h2 className="text-xl md:text-3xl font-serif font-bold text-[#fdfce9] mb-2">Connect with Fellow Advocates of Literature and the Arts</h2>
            <p className="text-sm md:text-base text-[#fdfce9] max-w-lg">Follow us for daily quotes, offers, and updates. Thank you.</p>
          </div>
          <div className="hidden md:block h-px flex-grow bg-white/10 mx-8"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex flex-col items-center justify-center p-3 md:p-6 rounded-xl md:rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 ${social.color} hover:-translate-y-1 hover:shadow-xl`}
            >
              <div className={`text-[#fdfce9] transition-colors duration-300 mb-2 md:mb-3 ${social.textColor === 'group-hover:text-[#00f2ea]' ? 'group-hover:text-black' : social.textColor === 'group-hover:text-[#1877F2]' ? 'group-hover:text-white' : 'group-hover:text-white'}`}>
                {social.icon}
              </div>
              <span className={`font-bold text-xs md:text-base text-[#fdfce9] group-hover:text-white transition-colors`}>
                {social.name}
              </span>
              <span className="text-[10px] md:text-xs text-[#fdfce9]/50 mt-0.5 md:mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:text-white/90">
                {social.handle}
              </span>
              
              <div className="absolute top-2 right-2 md:top-3 md:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ExternalLink className="text-white w-2.5 h-2.5 md:w-3 md:h-3" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialFollow;