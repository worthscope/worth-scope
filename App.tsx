import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import Hero from './components/Hero';
import EpisodeCard from './components/EpisodeCard';
import AudioPlayer from './components/AudioPlayer';
import DonationSection from './components/DonationSection';
import SubscribeSection from './components/SubscribeSection';
import AboutSection from './components/AboutSection';
import SeriousReadingSection from './components/SeriousReadingSection';
import LibraryView from './components/LibraryView';
import AnimatedMotto from './components/AnimatedMotto';
import CookiePolicy from './components/CookiePolicy';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import NewsletterSection from './components/NewsletterSection';
import SocialFollow from './components/SocialFollow';
import Sitemap from './components/Sitemap';
import { CustomMicIcon } from './components/CustomMicIcon';
import { fetchEpisodes } from './services/rssService';
import { Episode } from './types';
import { Loader2, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'home' | 'library' | 'cookie-policy' | 'terms-of-service' | 'privacy-policy' | 'sitemap'>('home');

  const donateRef = useRef<HTMLDivElement>(null);
  const subscribeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const loadEpisodes = async () => {
      setLoading(true);
      const fetchedEpisodes = await fetchEpisodes();
      setEpisodes(fetchedEpisodes);
      setLoading(false);
    };

    loadEpisodes();
  }, []);

  const handlePlay = (episode: Episode) => {
    setCurrentEpisode(episode);
  };

  const handlePlayNext = () => {
    if (episodes.length === 0) return;

    if (!currentEpisode) {
      // If nothing is playing, play the latest
      setCurrentEpisode(episodes[0]);
      return;
    }

    const currentIndex = episodes.findIndex(e => e.id === currentEpisode.id);
    if (currentIndex > 0) {
      // episodes is likely sorted newest to oldest, so index-1 is "next latest" (moving towards index 0)
      setCurrentEpisode(episodes[currentIndex - 1]);
    } else {
      // Already at the latest episode
      setCurrentEpisode(episodes[0]);
    }
  };

  const handlePlayOldest = () => {
    if (episodes.length === 0) return;

    if (!currentEpisode) {
      // If nothing is playing, play the absolute oldest
      setCurrentEpisode(episodes[episodes.length - 1]);
      return;
    }

    const currentIndex = episodes.findIndex(e => e.id === currentEpisode.id);
    if (currentIndex < episodes.length - 1) {
      // index+1 is "next oldest" (moving towards end of array)
      setCurrentEpisode(episodes[currentIndex + 1]);
    } else {
      // Already at the oldest episode in the list.
      // The requirement says "play the oldest podcast episode",
      // which can be interpreted as staying on the oldest if already there.
      setCurrentEpisode(episodes[episodes.length - 1]);
    }
  };

  const scrollToDonate = () => {
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        donateRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      donateRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSubscribe = () => {
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        subscribeRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      subscribeRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLibraryClick = () => {
    setView('library');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCookiePolicyClick = () => {
    setView('cookie-policy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleTermsOfServiceClick = () => {
    setView('terms-of-service');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handlePrivacyPolicyClick = () => {
    setView('privacy-policy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleSitemapClick = () => {
    setView('sitemap');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleStartListening = () => {
    if (episodes.length > 0) {
      setCurrentEpisode(episodes[0]);
    }
  };

  // Helper to render content based on view state
  const renderContent = () => {
    if (view === 'privacy-policy') {
      return <PrivacyPolicy onBack={handleBackToHome} />;
    }

    if (view === 'terms-of-service') {
      return <TermsOfService onBack={handleBackToHome} />;
    }

    if (view === 'cookie-policy') {
      return <CookiePolicy onBack={handleBackToHome} />;
    }

    if (view === 'sitemap') {
      return (
        <Sitemap
          onBack={handleBackToHome}
          onHome={handleBackToHome}
          onLibrary={handleLibraryClick}
          onAbout={scrollToAbout}
          onSubscribe={scrollToSubscribe}
          onDonate={scrollToDonate}
          onTerms={handleTermsOfServiceClick}
          onPrivacy={handlePrivacyPolicyClick}
          onCookie={handleCookiePolicyClick}
        />
      );
    }

    if (view === 'library') {
      return (
        <LibraryView
          episodes={episodes}
          currentEpisodeId={currentEpisode?.id}
          onPlay={handlePlay}
          onBack={handleBackToHome}
          onDonate={scrollToDonate}
          onSubscribe={scrollToSubscribe}
        />
      );
    }

    // Home view
    return (
      <>
        <Hero
          onStartListening={handleStartListening}
          onBrowseLibrary={handleLibraryClick}
        />

        {/* Episodes Grid - Home View (Limited to 3) */}
        <section id="episodes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-0">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-serif font-bold text-[#1695a0] mb-2">Latest Episodes</h2>
              <div className="h-1 w-20 bg-[#1695a0] rounded-full"></div>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col justify-center items-center py-20 min-h-[300px]">
              <Loader2 className="animate-spin text-[#1695a0] mb-4" size={48} />
              <p className="text-gray-500">Loading your library...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {episodes.slice(0, 3).map((episode) => (
                  <div key={episode.id} className="w-full max-w-xs mx-auto">
                    <EpisodeCard
                      episode={episode}
                      onPlay={handlePlay}
                      isPlaying={currentEpisode?.id === episode.id}
                    />
                  </div>
                ))}
                {episodes.length === 0 && (
                  <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                    <p className="text-lg text-gray-500">No episodes found. Please check back later.</p>
                  </div>
                )}
              </div>

              {episodes.length > 0 && (
                <div className="text-center">
                  <button
                    onClick={handleLibraryClick}
                    className="inline-flex items-center gap-2 bg-[#1695a0] text-[#fdfce9] px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-[#127a82] transition-all transform hover:-translate-y-1 text-lg"
                  >
                    Listen to All Episodes
                    <ArrowRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        <AboutSection
          ref={aboutRef}
          onSubscribeClick={scrollToSubscribe}
          onDonateClick={scrollToDonate}
        />

        <div ref={subscribeRef}>
          <SubscribeSection />
        </div>

        <div ref={donateRef}>
          <DonationSection />
        </div>

        <SeriousReadingSection />

        <NewsletterSection />
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#1695a0] selection:text-white">
      <Header
        onLogoClick={handleBackToHome}
        onDonateClick={scrollToDonate}
        onSubscribeClick={scrollToSubscribe}
        onAboutClick={scrollToAbout}
        onLibraryClick={handleLibraryClick}
      />

      <main className="flex-grow">
        {renderContent()}
      </main>

      <SocialFollow />

      {/* Footer */}
      <footer role="contentinfo" className="bg-[#36454f] text-[#fdfce9] py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Branding Column */}
          <div className="col-span-1 sm:col-span-2 flex flex-col items-start text-left">
            <div className="flex items-center gap-2 mb-4">
              <CustomMicIcon className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden="true" />
              <h3 className="text-[#1695a0] font-serif font-bold text-2xl">Playing Books</h3>
            </div>
            <div className="max-w-sm text-[#fdfce9]/80 mb-6">
              <AnimatedMotto />
            </div>
          </div>

          {/* Sitemap Column */}
          <div>
            <h4 className="text-[#1695a0] font-bold mb-6 tracking-wide uppercase text-sm">Navigation</h4>
            <nav aria-label="Footer Navigation">
              <ul className="space-y-3 text-sm">
                <li><button onClick={handleBackToHome} className="hover:text-[#1695a0] transition-colors text-left w-full">Home</button></li>
                <li><button onClick={handleLibraryClick} className="hover:text-[#1695a0] transition-colors text-left w-full">Library & Episodes</button></li>
                <li><button onClick={scrollToSubscribe} className="hover:text-[#1695a0] transition-colors text-left w-full">Subscribe</button></li>
                <li><button onClick={scrollToDonate} className="hover:text-[#1695a0] transition-colors text-left w-full">Donate</button></li>
                <li><button onClick={scrollToAbout} className="hover:text-[#1695a0] transition-colors text-left w-full">About Us</button></li>
                <li><a href="mailto:worthscope@usa.com" className="hover:text-[#1695a0] transition-colors block">Contact Us</a></li>
                <li><button onClick={handleSitemapClick} className="hover:text-[#1695a0] transition-colors text-left w-full">Sitemap</button></li>
              </ul>
            </nav>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-[#1695a0] font-bold mb-6 tracking-wide uppercase text-sm">Legal & Privacy</h4>
            <nav aria-label="Footer Legal">
              <ul className="space-y-3 text-sm">
                <li><button onClick={handleCookiePolicyClick} className="hover:text-[#1695a0] transition-colors text-left w-full">Cookie Policy</button></li>
                <li><button onClick={handlePrivacyPolicyClick} className="hover:text-[#1695a0] transition-colors text-left w-full">Privacy Policy</button></li>
                <li><button onClick={handleTermsOfServiceClick} className="hover:text-[#1695a0] transition-colors text-left w-full">Terms of Service</button></li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#fdfce9]">
          <p>© {new Date().getFullYear()} Playing Books. All rights reserved.</p>
          <div className="flex gap-4">
            <p>Designed for Readers. Built for Listeners.</p>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <ErrorBoundary>
        <AudioPlayer
          episode={currentEpisode}
          onClose={() => setCurrentEpisode(null)}
          autoPlay={true}
          onNext={handlePlayNext}
          onPlayOldest={handlePlayOldest}
        />
      </ErrorBoundary>
    </div>
  );
};

export default App;