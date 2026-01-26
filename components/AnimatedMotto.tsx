import React from 'react';

const AnimatedMotto: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`font-serif tracking-wide leading-relaxed inline-block ${className}`}>
      <style>
        {`
          .motto - special {
          display: inline-block;
        color: #fdfce9;
        font-weight: 700;
          }

        .motto-word {
          display: inline-block;
        font-weight: 800;
        color: #fdfce9;
        letter-spacing: -0.02em;
          }
        `}
      </style>
      <span className="text-[#fdfce9]">
        <span className="motto-special">Tapping</span> the
      </span>{" "}
      <br className="sm:hidden" />
      <span className="motto-word">Length.</span>{" "}
      <span className="motto-word">Breath.</span>{" "}
      <span className="motto-word">Depth.</span>{" "}
      <span className="motto-word">Height.</span>{" "}
      <span className="text-[#fdfce9]">
        of the <span className="motto-special">human person.</span>
      </span>
    </div>
  );
};

export default AnimatedMotto;