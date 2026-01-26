import React from 'react';
import { PlayCircle } from 'lucide-react';
import AnimatedMotto from './AnimatedMotto';

interface HeroProps {
  onStartListening: () => void;
  onBrowseLibrary: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartListening, onBrowseLibrary }) => {
  return (
    <div className="relative animate-soft-glow overflow-hidden">
      <div className="absolute inset-0">
        {/* Abstract shapes/pattern */}
        <div className="absolute -top-24 -right-24 w-72 h-72 md:w-96 md:h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 md:w-64 md:h-64 bg-[#fdfce9]/10 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 sm:pt-8 sm:pb-12 lg:pt-12 lg:pb-16 relative z-10 reveal-section">
        <div className="text-center">
          {/* Animated Text Section - Moved to Top */}
          {/* Animated Text Section - Moved to Top */}
          <div className="mb-3 md:mb-6 px-4">
            <AnimatedMotto className="text-lg sm:text-xl md:text-3xl text-[#fdfce9]/80" />
          </div>

          <span className="inline-flex items-center justify-center px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#fdfce9]/20 text-[#fdfce9] text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold mb-4 backdrop-blur-sm border border-[#fdfce9]/30 mx-auto">
            For Time-Constrained Professionals
          </span>
          {/* SEO Optimized Heading with Google-style Colorful Animation */}
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-6 sm:mb-8 leading-tight font-serif" aria-label="The Playing Books Podcast: Read More. Understand Far More. Grow Better. Live Boldly.">
            <span className="inline-block animate-slide-up opacity-0" style={{ animationDelay: '0.1s' }}>
              <span className="animate-gradient-text bg-clip-text text-transparent bg-[length:200%_auto] bg-gradient-to-r from-white via-[#7eac69] to-white">
                Read More.
              </span>
            </span>
            <br />
            <span className="inline-block animate-slide-up opacity-0" style={{ animationDelay: '0.3s' }}>
              <span className="animate-gradient-text bg-clip-text text-transparent bg-[length:200%_auto] bg-gradient-to-r from-[#7eac69] via-white to-[#7eac69]">
                Understand Far More.
              </span>
            </span>
            <br />
            <span className="inline-block animate-slide-up opacity-0" style={{ animationDelay: '0.5s' }}>
              <span className="animate-gradient-text bg-clip-text text-transparent bg-[length:200%_auto] bg-gradient-to-r from-white via-[#7eac69] to-white">
                Grow Better.
              </span>
            </span>
            <br />
            <span className="inline-block animate-slide-up opacity-0" style={{ animationDelay: '0.7s' }}>
              <span className="animate-gradient-text bg-clip-text text-transparent bg-[length:200%_auto] bg-gradient-to-r from-[#7eac69] via-white to-[#7eac69]">
                Live Boldly.
              </span>
            </span>
          </h1>

          <style>
            {`
              @keyframes slide-up-spring {
                0% {
                  opacity: 0;
                  transform: translateY(40px) scale(0.9);
                  filter: blur(5px);
                }
                50% {
                    opacity: 1;
                    transform: translateY(-5px) scale(1.02);
                    filter: blur(0);
                }
                100% {
                  opacity: 1;
                  transform: none;
                  filter: none;
                }
              }
              @keyframes gradient-x {
                0% { background-position: 0% 50%; }
                100% { background-position: 200% 50%; }
              }
              .animate-slide-up {
                animation: slide-up-spring 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
              }
              .animate-gradient-text {
                animation: gradient-x 3s linear infinite;
              }
            `}
          </style>

          <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-[#fdfce9]/90 leading-relaxed px-2 animate-slide-up opacity-0" style={{ animationDelay: '0.9s' }}>
            High-quality audio summaries of the world's bestselling books.
            Absorb key insights during your commute, workout, rest, coffee, or thinking time.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartListening}
              className="bg-[#fdfce9] text-[#1695a0] px-8 py-3 sm:px-8 sm:py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-white transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 w-auto min-w-[200px]"
              aria-label="Start listening to the latest episode"
            >
              <PlayCircle size={24} aria-hidden="true" />
              Start Listening
            </button>
            <button
              onClick={onBrowseLibrary}
              className="bg-transparent border-2 border-[#fdfce9] text-[#fdfce9] px-8 py-3 sm:px-8 sm:py-4 rounded-full font-bold hover:bg-[#fdfce9]/10 transition-all w-auto min-w-[200px]"
              aria-label="Browse full episode library"
            >
              Browse Library
            </button>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Hero;