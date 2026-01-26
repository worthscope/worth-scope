import React, { useEffect, useRef, useState } from "react";

interface MarqueeTextProps {
  text: string;
  className?: string;
  isActive?: boolean;
  alwaysScroll?: boolean;
}

export const MarqueeText: React.FC<MarqueeTextProps> = ({
  text,
  className = "",
  isActive = true,
  alwaysScroll = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setShouldScroll(false);
      return;
    }

    if (alwaysScroll) {
      setShouldScroll(true);
      return;
    }

    const checkScroll = () => {
      if (containerRef.current && textRef.current) {
        // Use a slight tolerance (1px) to handle sub-pixel rendering differences
        const overflow = textRef.current.scrollWidth > containerRef.current.clientWidth + 1;
        setShouldScroll(overflow);
      }
    };

    // Check immediately
    checkScroll();

    // Check after short delays to account for font loading/layout shifts
    const t1 = setTimeout(checkScroll, 100);
    const t2 = setTimeout(checkScroll, 500);
    const t3 = setTimeout(checkScroll, 2000);

    window.addEventListener("resize", checkScroll);
    return () => {
      window.removeEventListener("resize", checkScroll);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [text, isActive]);

  const [isPaused, setIsPaused] = useState(false);

  if (!shouldScroll) {
    return (
      <div ref={containerRef} className={`truncate ${className}`}>
        <div ref={textRef} className="whitespace-nowrap">
          {text}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden flex pointer-events-auto ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="animate-marquee flex whitespace-nowrap"
        style={{
          animationPlayState: isPaused ? "paused" : "running",
          width: "max-content" // Ensure the track is wide enough
        }}
      >
        <span className="mr-2">{text}</span>
        <span className="mr-2">{text}</span>
        <span className="mr-2">{text}</span>
        <span className="mr-2">{text}</span>
      </div>
    </div>
  );
};
