import React from 'react';
import { Quote } from 'lucide-react';

const SeriousReadingSection: React.FC = () => {
  return (
    <section className="pt-8 pb-4 md:pt-16 md:pb-8 bg-[#1695a0] text-[#fdfce9] relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#fdfce9 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">

        {/* Title */}
        <h2 className="text-[#fdfce9] font-serif font-bold text-2xl md:text-4xl mb-4 md:mb-8 tracking-wide">
          Make Serious & Steady Reading a Habit
        </h2>

        {/* Huge Quote Section */}
        <div className="max-w-6xl mx-auto px-2">
          <Quote className="text-[#fdfce9]/20 mx-auto mb-4 md:mb-8 w-12 h-12 md:w-32 md:h-32" />
          <blockquote className="relative z-10">
            <p className="font-serif font-bold text-xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl leading-[2.2] md:leading-[2.5] mb-3 md:mb-6 tracking-tight text-center">
              "Everyone who knows how to read has it in their power to <span className="text-[#7eac69] underline decoration-2 md:decoration-4 underline-offset-4 decoration-[#7eac69]/30">magnify themselves</span>, to multiply the ways in which they exist, to make their life full, significant, and interesting."
            </p>
            <footer className="flex flex-col items-center gap-2 md:gap-4 justify-center">
              <div className="h-1 w-16 md:w-24 bg-[#7eac69] rounded-full"></div>
              <cite className="not-italic text-lg md:text-3xl font-bold font-sans tracking-wide">Aldous Huxley.</cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default SeriousReadingSection;