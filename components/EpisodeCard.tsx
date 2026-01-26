import React from 'react';
import { Play, Clock, User } from 'lucide-react';
import { Episode } from '../types';

interface EpisodeCardProps {
  episode: Episode;
  onPlay: (episode: Episode) => void;
  isPlaying: boolean;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, onPlay, isPlaying }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onPlay(episode);
    }
  };

  return (
    <div
      className="group flex flex-col w-full bg-[#1c1c1c] border border-white/5 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={() => onPlay(episode)}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`Play episode: ${episode.title} by ${episode.author}`}
    >
      {/* 1. Square Image Container (Logo Shape) */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-900">
        <img
          src={episode.imageUrl}
          alt=""
          className="w-full h-full object-cover object-center scale-125 group-hover:scale-[1.35] transition-transform duration-700 ease-out"
          aria-hidden="true"
        />

        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
          <div className="w-14 h-14 rounded-full bg-[#fdfce9] flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play size={28} className="text-[#1695a0] ml-1" fill="currentColor" />
          </div>
        </div>

        {/* Category Tag (Floating on Image) */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white bg-black/40 backdrop-blur-md border border-white/10 shadow-sm">
            {episode.category}
          </span>
        </div>
      </div>

      {/* 2. Content Section (Below Image) */}
      <div className="flex flex-col p-5 gap-3">
        {/* Meta */}
        <div className="flex items-center gap-3 text-xs font-medium text-white/50">
          <span className="flex items-center gap-1.5">
            <Clock size={12} strokeWidth={2.5} />
            {episode.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <User size={12} strokeWidth={2.5} />
            <span className="truncate max-w-[100px]">{episode.author}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-[#fdfce9] font-serif leading-snug line-clamp-2 group-hover:text-white transition-colors">
          {episode.title}
        </h3>

        {/* Listen Now Button */}
        <div className="mt-2 pt-3 border-t border-white/5 flex items-center text-[#1695a0] text-xs font-bold uppercase tracking-widest group-hover:text-[#fdfce9] transition-colors" aria-hidden="true">
          Listen Now <span className="ml-2 text-base leading-none">&rarr;</span>
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard;