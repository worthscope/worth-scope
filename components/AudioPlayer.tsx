import React, { useRef, useEffect, useState, useCallback, useLayoutEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
  Maximize2,
  Minimize2,
  GripHorizontal,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Episode } from "../types";
import { MarqueeText } from "./MarqueeText";

interface AudioPlayerProps {
  episode: Episode | null;
  onClose: () => void;
  autoPlay: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
  onPlayOldest?: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  episode,
  onClose,
  autoPlay,
  onNext,
  onPrevious,
  onPlayOldest,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const lastClickTimeForward = useRef<number>(0);
  const lastClickTimeBackward = useRef<number>(0);
  const clickTimeoutForward = useRef<NodeJS.Timeout | null>(null);
  const clickTimeoutBackward = useRef<NodeJS.Timeout | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSquare, setIsSquare] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.8);
  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem("player-position-v4");
    const viewportHeight = window.innerHeight;
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          typeof parsed.x === "number" &&
          !isNaN(parsed.x) &&
          typeof parsed.y === "number" &&
          !isNaN(parsed.y)
        ) {
          // Ensure it's not off-screen on the top
          return {
            x: parsed.x,
            y: Math.max(20, Math.min(parsed.y, viewportHeight - 100)),
          };
        }
      } catch (e) { }
    }
    // Default: slightly below center of nav (assuming nav is ~80px + some spacing)
    // y is distance from bottom of screen to bottom of player
    // So if we want it near top, y = viewportHeight - playerHeight - offset
    // Default rect height is 320px. Let's say top offset is 100px.
    const defaultY = Math.max(20, viewportHeight - 320 - 100);
    return { x: 0, y: defaultY };
  });

  useEffect(() => {
    localStorage.setItem("player-position-v4", JSON.stringify(position));
  }, [position]);

  useEffect(() => {
    // Disable entry animation after first load
    const timer = setTimeout(() => setShouldAnimate(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Use useLayoutEffect to prevent visual flashing during position updates
  useLayoutEffect(() => {
    if (!playerRef.current) return;

    // ResizeObserver removed to prevent loop limit crashes during restore animation.
    // Clamping is handled by toggleMinimize, toggleShape, and window resize listeners.

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!playerRef.current) return;
        const viewportHeight = window.innerHeight;
        const playerHeight = playerRef.current.offsetHeight;
        const minY = 20;
        const maxY = Math.max(minY, viewportHeight - playerHeight - 20);

        setPosition((prev) => ({
          ...prev,
          y: Math.max(minY, Math.min(prev.y || 20, maxY)),
        }));
      }, 100);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);



  useEffect(() => {
    if (episode && autoPlay) {
      setIsPlaying(true);
      // Short timeout to ensure DOM is ready and prevent race conditions
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current
            .play()
            .catch((e) => console.log("Autoplay blocked:", e));
        }
      }, 150);
    } else if (episode) {
      // If we have an episode but autoPlay is false, just make sure we are not "playing" state-wise
      // But don't reset to false if it was already playing (e.g. during state transitions)
    } else {
      setIsPlaying(false);
    }
  }, [episode, autoPlay]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(prevVolume);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      setIsMuted(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration > 0) {
        setProgress((current / duration) * 100);
      } else {
        setProgress(0);
      }
    }
  };

  const toggleShape = () => {
    const nextSquare = !isSquare;
    setIsSquare(nextSquare);
    setIsMinimized(false);
    setShouldAnimate(false);

    // Predict height for clamping
    const predictedHeight = nextSquare ? 440 : 320;
    const viewportHeight = window.innerHeight;
    const minY = 20;
    const maxY = viewportHeight - predictedHeight - 20;

    setPosition((prev) => ({
      ...prev,
      y: Math.max(minY, Math.min(prev.y || 20, maxY)),
    }));
  };

  const toggleMinimize = () => {
    const nextMinimized = !isMinimized;
    setIsMinimized(nextMinimized);
    setShouldAnimate(false);

    // Predict height for clamping
    const predictedHeight = nextMinimized ? 64 : isSquare ? 440 : 320;
    const viewportHeight = window.innerHeight;
    const minY = 20;
    const maxY = viewportHeight - predictedHeight - 20;

    setPosition((prev) => ({
      ...prev,
      y: Math.max(minY, Math.min(prev.y || 20, maxY)),
    }));
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    // Prevent dragging when clicking on buttons, inputs or links
    const target = e.target as HTMLElement;
    if (
      target.closest("button") ||
      target.closest("input") ||
      target.closest("a")
    )
      return;

    setShouldAnimate(false); // Stop entry animation immediately if user starts dragging

    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY =
      "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    setIsDragging(true);
    // position.y is distance from bottom of screen to BOTTOM of player.
    // window.innerHeight - clientY is distance from bottom of screen to MOUSE.
    setDragStart({
      x: clientX - position.x,
      y: window.innerHeight - clientY - position.y,
    });
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;

      const clientX =
        "touches" in e
          ? (e as TouchEvent).touches[0].clientX
          : (e as MouseEvent).clientX;
      const clientY =
        "touches" in e
          ? (e as TouchEvent).touches[0].clientY
          : (e as MouseEvent).clientY;

      const newX = clientX - dragStart.x;
      const newY = window.innerHeight - clientY - dragStart.y;

      // Boundary checks
      const playerWidth = playerRef.current?.offsetWidth || 0;
      const playerHeight = playerRef.current?.offsetHeight || 0;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const minX = -(viewportWidth / 2) + playerWidth / 2;
      const maxX = viewportWidth / 2 - playerWidth / 2;

      // y is distance of bottom of player from bottom of screen.
      const minY = 20;
      const maxY = viewportHeight - playerHeight - 20;

      const boundedX = Math.max(minX, Math.min(maxX, newX));
      const boundedY = Math.max(minY, Math.min(maxY, newY));

      setPosition({ x: boundedX, y: boundedY });
    },
    [isDragging, dragStart],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleMouseMove);
      window.addEventListener("touchend", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const formatTimeLocal = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (!episode) return null;

  // Determine if we should show the full player UI or the small control
  // We use this to prevent layout thrashing and ensure visibility
  const showMinimizedUI = isMinimized;

  return (
    <>
      <style>
        {`
          @keyframes slide-up {
            from { transform: translate(calc(-50% + var(--player-x)), 100vh); opacity: 0; }
            to { transform: translate(calc(-50% + var(--player-x)), calc(-1 * var(--player-y))); opacity: 1; }
          }
          .animate-slide-up {
            animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .player-container-fixed {
            position: fixed !important;
            left: 50% !important;
            bottom: 0 !important;
            z-index: 9999 !important;
          }
          .dragging {
            cursor: grabbing !important;
            user-select: none;
            transition: none !important;
          }
          .draggable-area {
            cursor: grab;
          }
          .draggable-area:active {
            cursor: grabbing;
          }
          .marquee-container {
            pointer-events: auto !important;
            display: flex;
            justify-content: flex-start !important;
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            overflow: hidden !important;
            width: 100%;
          }
          .marquee-content {
            pointer-events: auto !important;
            flex-shrink: 0;
            display: inline-block !important;
            white-space: nowrap !important;
          }
          .glass-effect {
            background: rgba(253, 252, 233, 0.75);
            backdrop-filter: blur(24px) saturate(180%);
            -webkit-backdrop-filter: blur(24px) saturate(180%);
            border: 1px solid rgba(22, 149, 160, 0.2);
          }
          .player-shadow {
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15), 0 5px 15px rgba(0, 0, 0, 0.05);
          }
          input[type="range"] {
            -webkit-appearance: none;
            background: rgba(0,0,0,0.1);
            height: 4px;
            border-radius: 2px;
          }
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 12px;
            height: 12px;
            background: #1695a0;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            transition: transform 0.2s;
          }
          input[type="range"]::-webkit-slider-thumb:hover {
            transform: scale(1.2);
          }
        `}
      </style>
      <div
        ref={playerRef}
        className={`player-container-fixed text-[#161616] glass-effect player-shadow flex flex-col ${isDragging ? "dragging" : ""
          } ${shouldAnimate ? "animate-slide-up" : ""} ${isMinimized
            ? "w-[240px] h-[64px] rounded-xl"
            : isSquare
              ? "w-[280px] h-[440px] rounded-xl"
              : "w-[90%] max-w-2xl h-[320px] rounded-xl"
          }`
        }
        style={
          {
            "--player-x": `${position?.x || 0}px`,
            "--player-y": `${position?.y || 20}px`,
            transform: shouldAnimate
              ? undefined
              : `translate(calc(-50% + ${position?.x || 0}px), ${-(position?.y || 20)}px)`,
            transition: "none", // Animations removed per user request for instant response
            opacity: 1,
            visibility: "visible",
            display: "flex",
            willChange: "transform, width, height",
            overflow: "hidden",
            zIndex: 9999,
          } as React.CSSProperties
        }
        role="region"
        aria-label="Audio Player"
      >
        <audio
          ref={audioRef}
          src={episode.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />

        {/* Drag Handle Overlay - Only show when NOT minimized */}
        {!isMinimized && (
          <div
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            className="absolute top-0 left-0 right-0 h-12 z-[60] pointer-events-auto draggable-area"
          >
            <div className="w-12 h-1 bg-black/10 rounded-full mx-auto mt-3" />
          </div>
        )}

        {showMinimizedUI ? (
          <div
            className="flex items-center justify-between w-full h-full px-3 relative z-[70] cursor-grab active:cursor-grabbing pointer-events-auto"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            <div className="flex items-center gap-3 min-w-0 flex-grow pointer-events-none">
              <img
                src={episode.imageUrl}
                alt=""
                className="w-10 h-10 rounded-lg object-cover shadow-sm pointer-events-none"
              />
              <div className="flex-grow min-w-0">
                <MarqueeText
                  text={episode.title}
                  alwaysScroll={true}
                  className="text-sm font-semibold"
                />
              </div>
            </div>
            <div className="flex items-center gap-1 pointer-events-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="w-10 h-10 flex items-center justify-center text-[#1695a0] hover:bg-black/5 rounded-full transition-colors relative z-[80]"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause size={20} fill="currentColor" />
                ) : (
                  <Play size={20} fill="currentColor" className="ml-0.5" />
                )}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMinimize();
                }}
                className="w-8 h-10 flex items-center justify-center text-black/40 hover:text-black/60 relative z-[80]"
                title="Restore"
              >
                <ChevronUp size={20} />
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`flex flex-col h-full relative z-[70] ${isSquare ? "p-5 pt-7" : "p-3 sm:p-4 pt-7"} pointer-events-none`}
          >
            <div
              className={`flex ${isSquare ? "flex-col items-center" : "items-center gap-4"} pointer-events-none mb-2`}
            >
              {/* Artwork */}
              <div
                className={`relative flex-shrink-0 group ${isSquare ? "w-24 h-24 mb-3" : "w-14 h-14 sm:w-16 sm:h-16"} pointer-events-none`}
              >
                <img
                  src={episode.imageUrl}
                  alt={episode.title}
                  className={`w-full h-full object-cover rounded-2xl shadow-lg transition-transform duration-500 group-hover:scale-[1.02] ${isSquare ? "aspect-square" : ""}`}
                />
                {isPlaying && (
                  <div className="absolute bottom-2 right-2 flex gap-0.5 items-end h-4 px-1.5 py-1 bg-white/20 backdrop-blur-md rounded-md">
                    <div
                      className="w-0.5 bg-white animate-[pulse_0.6s_infinite]"
                      style={{ height: "100%" }}
                    ></div>
                    <div
                      className="w-0.5 bg-white animate-[pulse_0.8s_infinite_0.1s]"
                      style={{ height: "60%" }}
                    ></div>
                    <div
                      className="w-0.5 bg-white animate-[pulse_0.7s_infinite_0.2s]"
                      style={{ height: "80%" }}
                    ></div>
                  </div>
                )}
              </div>

              {/* Title & Info */}
              <div
                className={`min-w-0 flex-grow text-center w-full pointer-events-none ${!isSquare ? "sm:pr-14" : ""}`}
              >
                <div className="w-full flex justify-center mb-1">
                  <MarqueeText
                    text={episode.title}
                    alwaysScroll={true}
                    className={`font-bold tracking-tight w-full px-4 ${isSquare ? "text-xl" : "text-lg sm:text-xl"}`}
                  />
                </div>
                <div className="w-full text-center flex justify-center">
                  <p className="text-[#1695a0] font-medium opacity-80">
                    Playing Books
                  </p>
                </div>
              </div>
            </div>

            {/* Main Controls Area */}
            <div
              className={`mt-4 ${isSquare ? "flex-grow flex flex-col justify-center mb-4" : ""} pointer-events-auto`}
            >
              {/* Progress Bar */}
              <div className="mb-4">
                <div
                  className="relative h-1.5 bg-black/5 rounded-full cursor-pointer group mb-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (audioRef.current) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const percentage = Math.max(
                        0,
                        Math.min(1, x / rect.width),
                      );
                      audioRef.current.currentTime =
                        percentage * audioRef.current.duration;
                    }
                  }}
                >
                  <div
                    className="absolute top-0 left-0 h-full bg-[#1695a0] rounded-full transition-all duration-150 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#1695a0] border-2 border-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ left: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-semibold opacity-40 uppercase tracking-widest">
                  <span>
                    {audioRef.current
                      ? formatTimeLocal(audioRef.current.currentTime)
                      : "0:00"}
                  </span>
                  <span>
                    {isSquare
                      ? formatTimeLocal(audioRef.current?.duration || 0)
                      : episode.duration}
                  </span>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-6 sm:gap-8">
                <button
                  className="text-black/40 hover:text-black/80 transition-all hover:scale-110 active:scale-95 relative z-[80]"
                  onClick={(e) => {
                    e.stopPropagation();
                    const now = Date.now();

                    if (now - lastClickTimeBackward.current < 300) {
                      // Double click detected
                      if (clickTimeoutBackward.current) {
                        clearTimeout(clickTimeoutBackward.current);
                        clickTimeoutBackward.current = null;
                      }
                      onPlayOldest?.();
                      lastClickTimeBackward.current = 0;
                    } else {
                      // Potential single click
                      lastClickTimeBackward.current = now;
                      clickTimeoutBackward.current = setTimeout(() => {
                        if (audioRef.current)
                          audioRef.current.currentTime -= 15;
                        clickTimeoutBackward.current = null;
                      }, 300);
                    }
                  }}
                  title="Click to seek back, double click to play oldest"
                >
                  <SkipBack size={24} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  className="w-14 h-14 sm:w-16 sm:h-16 bg-[#1695a0] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all relative z-[80]"
                >
                  {isPlaying ? (
                    <Pause size={28} fill="currentColor" />
                  ) : (
                    <Play size={28} fill="currentColor" className="ml-1" />
                  )}
                </button>
                <button
                  className="text-black/40 hover:text-black/80 transition-all hover:scale-110 active:scale-95 relative z-[80]"
                  onClick={(e) => {
                    e.stopPropagation();
                    const now = Date.now();

                    if (now - lastClickTimeForward.current < 300) {
                      // Double click detected
                      if (clickTimeoutForward.current) {
                        clearTimeout(clickTimeoutForward.current);
                        clickTimeoutForward.current = null;
                      }
                      onNext?.();
                      lastClickTimeForward.current = 0;
                    } else {
                      // Potential single click
                      lastClickTimeForward.current = now;
                      clickTimeoutForward.current = setTimeout(() => {
                        if (audioRef.current)
                          audioRef.current.currentTime += 15;
                        clickTimeoutForward.current = null;
                      }, 300);
                    }
                  }}
                  title="Click to seek forward, double click to play next latest"
                >
                  <SkipForward size={24} />
                </button>
              </div>
            </div>

            {/* Bottom Bar: Volume & View Controls */}
            <div
              className={`mt-auto flex flex-col gap-4 ${isSquare ? "border-t border-black/5 pt-4 pb-8" : "pb-8"} pointer-events-auto`}
            >
              <div
                className={`flex flex-col gap-2 ${isSquare ? "" : "items-center"}`}
              >
                <div
                  className={`flex items-center gap-3 w-full ${isSquare ? "" : "max-w-[200px]"}`}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute();
                    }}
                    className="text-black/40 hover:text-[#1695a0] transition-colors relative z-[80]"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX size={20} />
                    ) : (
                      <Volume2 size={20} />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      const newVol = parseFloat(e.target.value);
                      setVolume(newVol);
                      if (newVol > 0) setIsMuted(false);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    className="flex-grow accent-[#1695a0] relative z-[80]"
                  />
                </div>

                <div
                  className={`flex items-center justify-center ${isSquare ? "gap-2" : "gap-6"}`}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMinimize();
                    }}
                    className="p-2 text-black/40 hover:text-black/60 transition-colors relative z-[80]"
                    title={isMinimized ? "Restore" : "Minimize"}
                  >
                    <ChevronDown size={22} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleShape();
                    }}
                    className="p-2 text-black/40 hover:text-black/60 transition-colors relative z-[80]"
                    title="Expand"
                  >
                    {isSquare ? (
                      <Minimize2 size={22} />
                    ) : (
                      <Maximize2 size={22} />
                    )}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose();
                    }}
                    className="p-2 text-black/40 hover:text-red-500 transition-colors relative z-[80]"
                    title="Cancel"
                  >
                    <X size={22} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

export default AudioPlayer;
