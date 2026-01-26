import React, { useState, useEffect } from 'react';
import { Heart, Search, Menu, X, ChevronRight, BookOpen, Podcast, Users, Home } from 'lucide-react';
import { CustomMicIcon } from './CustomMicIcon';

interface HeaderProps {
  onDonateClick: () => void;
  onSubscribeClick: () => void;
  onAboutClick: () => void;
  onLibraryClick: () => void;
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onDonateClick,
  onSubscribeClick,
  onAboutClick,
  onLibraryClick,
  onLogoClick
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const handleMobileNav = (action: () => void) => {
    setIsMenuOpen(false);
    // Small delay to ensure UI feels responsive
    setTimeout(action, 100);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-[1000] transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-[#fdfce9] shadow-sm' : 'bg-[#fdfce9]'
          } border-b border-[#36454f]/10`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer group gap-2 relative z-[1001]"
              onClick={() => handleMobileNav(onLogoClick)}
              role="button"
              tabIndex={0}
              aria-label="Go to Homepage"
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleMobileNav(onLogoClick); }}
            >
              <div className="group-hover:rotate-12 transition-transform duration-300">
                <CustomMicIcon className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden="true" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-[#1695a0] tracking-tight font-serif">
                Playing Books
              </h1>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-6 lg:space-x-8 items-center" aria-label="Main Navigation">
              <button onClick={onLibraryClick} className="text-[#1695a0] hover:text-[#36454f] font-medium transition-colors bg-transparent border-none cursor-pointer">
                Library
              </button>
              <button onClick={onSubscribeClick} className="text-[#1695a0] hover:text-[#36454f] font-medium transition-colors bg-transparent border-none cursor-pointer">
                Subscribe
              </button>
              <button onClick={onAboutClick} className="text-[#1695a0] hover:text-[#36454f] font-medium transition-colors bg-transparent border-none cursor-pointer">
                About
              </button>
              <div className="relative group">
                <label htmlFor="search-input" className="sr-only">Search books</label>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#1695a0] transition-colors" size={16} aria-hidden="true" />
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search..."
                  className="pl-9 pr-4 py-2 rounded-full bg-white border border-gray-200 focus:outline-none focus:border-[#1695a0] focus:ring-1 focus:ring-[#1695a0] text-sm w-32 lg:w-48 transition-all focus:w-56 lg:focus:w-64"
                  aria-label="Search books"
                />
              </div>
              <button
                onClick={onDonateClick}
                className="bg-[#7eac69] hover:bg-[#6c9658] text-white px-5 py-2.5 rounded-full font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2 transform hover:-translate-y-0.5"
                aria-label="Donate to support the podcast"
              >
                <Heart size={16} fill="currentColor" aria-hidden="true" />
                Donate
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-[#1695a0] hover:bg-[#1695a0]/10 rounded-full transition-colors relative z-[1001]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 bg-[#fdfce9] z-[900] transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex flex-col h-full pt-24 pb-8 px-6 overflow-y-auto">
          {/* Mobile Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#1695a0]" size={20} />
              <input
                type="text"
                placeholder="Search library..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-[#1695a0]/20 focus:outline-none focus:border-[#1695a0] text-base shadow-sm"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-grow space-y-2">
            <button
              onClick={() => handleMobileNav(onLogoClick)}
              className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-[#1695a0]/5 group transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-[#1695a0]/10 text-[#1695a0] rounded-lg group-hover:bg-[#1695a0] group-hover:text-white transition-colors">
                  <Home size={22} />
                </div>
                <span className="text-lg font-bold text-[#36454f] group-hover:text-[#1695a0]">Home</span>
              </div>
              <ChevronRight className="text-gray-300 group-hover:text-[#1695a0]" />
            </button>

            <button
              onClick={() => handleMobileNav(onLibraryClick)}
              className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-[#1695a0]/5 group transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-[#1695a0]/10 text-[#1695a0] rounded-lg group-hover:bg-[#1695a0] group-hover:text-white transition-colors">
                  <BookOpen size={22} />
                </div>
                <span className="text-lg font-bold text-[#36454f] group-hover:text-[#1695a0]">Library</span>
              </div>
              <ChevronRight className="text-gray-300 group-hover:text-[#1695a0]" />
            </button>

            <button
              onClick={() => handleMobileNav(onSubscribeClick)}
              className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-[#1695a0]/5 group transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-[#1695a0]/10 text-[#1695a0] rounded-lg group-hover:bg-[#1695a0] group-hover:text-white transition-colors">
                  <Podcast size={22} />
                </div>
                <span className="text-lg font-bold text-[#36454f] group-hover:text-[#1695a0]">Subscribe</span>
              </div>
              <ChevronRight className="text-gray-300 group-hover:text-[#1695a0]" />
            </button>

            <button
              onClick={() => handleMobileNav(onAboutClick)}
              className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-[#1695a0]/5 group transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-[#1695a0]/10 text-[#1695a0] rounded-lg group-hover:bg-[#1695a0] group-hover:text-white transition-colors">
                  <Users size={22} />
                </div>
                <span className="text-lg font-bold text-[#36454f] group-hover:text-[#1695a0]">About Us</span>
              </div>
              <ChevronRight className="text-gray-300 group-hover:text-[#1695a0]" />
            </button>
          </nav>

          {/* Bottom Actions */}
          <div className="mt-6 pt-6 border-t border-[#1695a0]/10 flex flex-col items-center">
            <button
              onClick={() => handleMobileNav(onDonateClick)}
              className="w-auto px-8 bg-[#7eac69] text-white py-2.5 rounded-full font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <Heart size={16} fill="currentColor" />
              Donate
            </button>
            <p className="text-center text-xs text-[#1695a0]/60 mt-4">
              © {new Date().getFullYear()} Playing Books
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;