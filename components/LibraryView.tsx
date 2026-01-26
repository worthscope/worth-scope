import React, { useState, useMemo } from 'react';
import { ArrowLeft, Heart, Podcast, Search } from 'lucide-react';
import EpisodeCard from './EpisodeCard';
import { Episode } from '../types';

interface LibraryViewProps {
  episodes: Episode[];
  currentEpisodeId: string | undefined;
  onPlay: (episode: Episode) => void;
  onBack: () => void;
  onDonate: () => void;
  onSubscribe: () => void;
}

const LibraryView: React.FC<LibraryViewProps> = ({
  episodes,
  currentEpisodeId,
  onPlay,
  onBack,
  onDonate,
  onSubscribe
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEpisodes = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return episodes.filter((episode) =>
      episode.title.toLowerCase().includes(query) ||
      episode.author.toLowerCase().includes(query) ||
      episode.description.toLowerCase().includes(query) ||
      episode.category.toLowerCase().includes(query)
    );
  }, [episodes, searchQuery]);

  return (
    <div className="min-h-screen bg-[#fdfce9] animate-fade-in-up">
      {/* Library Header */}
      <div className="bg-[#1695a0] text-[#fdfce9] py-12 px-4 sm:px-6 lg:px-8 shadow-lg relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#fdfce9]/80 hover:text-white mb-6 transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">Complete Library</h1>
              <p className="text-[#fdfce9]/80 text-lg">Explore our entire episodes.</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={onSubscribe}
                className="flex items-center gap-2 bg-[#fdfce9] text-[#1695a0] px-5 py-2.5 rounded-full font-bold shadow-md hover:shadow-xl hover:bg-white transition-all transform hover:-translate-y-0.5"
              >
                <Podcast size={18} />
                Subscribe
              </button>
              <button
                onClick={onDonate}
                className="flex items-center gap-2 bg-[#7eac69] text-white px-5 py-2.5 rounded-full font-bold shadow-md hover:shadow-xl hover:bg-[#6c9658] transition-all transform hover:-translate-y-0.5"
              >
                <Heart size={18} fill="currentColor" />
                Donate
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#1695a0]" />
            </div>
            <input
              type="text"
              placeholder="Search episodes by title, author, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-4 py-4 rounded-xl border-none bg-white text-[#36454f] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fdfce9] shadow-lg text-lg transition-all"
            />
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredEpisodes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEpisodes.map((episode) => (
              <div key={episode.id} className="w-full max-w-xs mx-auto">
                <EpisodeCard
                  episode={episode}
                  onPlay={onPlay}
                  isPlaying={currentEpisodeId === episode.id}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-[#1695a0]/30">
            <Search className="mx-auto h-12 w-12 text-[#1695a0]/40 mb-4" />
            <h3 className="text-xl font-medium text-[#36454f] mb-2">No episodes found</h3>
            <p className="text-gray-500">
              We couldn't find any episodes matching "{searchQuery}". Try a different search term.
            </p>
          </div>
        )}

        {/* Footer of Library */}
        <div className="mt-16 text-center border-t border-[#1695a0]/10 pt-12">
          <p className="text-[#36454f] mb-6 text-lg">Enjoying the content? Help us create more.</p>
          <button
            onClick={onDonate}
            className="bg-[#7eac69] hover:bg-[#6c9658] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 inline-flex items-center gap-2"
          >
            <Heart size={20} fill="currentColor" />
            Support the Podcast
          </button>
        </div>
      </div>
    </div>
  );
};

export default LibraryView;