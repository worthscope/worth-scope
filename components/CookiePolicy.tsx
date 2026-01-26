import React from 'react';
import { ArrowLeft, Cookie, Shield, Settings, BarChart3, Megaphone, Mail } from 'lucide-react';

interface CookiePolicyProps {
  onBack: () => void;
}

const CookiePolicy: React.FC<CookiePolicyProps> = ({ onBack }) => {
  return (
    <div className="bg-[#fdfce9] min-h-screen animate-fade-in-up">
      {/* Header / Hero */}
      <div className="bg-[#1695a0] text-[#fdfce9] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#127a82]/50 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[#fdfce9]/80 hover:text-white mb-8 transition-colors font-medium group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          
          <div className="flex items-center gap-4 mb-4">
             <div className="p-3 bg-[#fdfce9]/20 backdrop-blur-md rounded-2xl">
                <Cookie size={32} />
             </div>
             <span className="text-[#fdfce9]/80 font-medium tracking-wide uppercase text-sm">Legal Documentation</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Cookie Policy</h1>
          <p className="text-xl text-[#fdfce9]/90 max-w-2xl leading-relaxed">
            Transparency about how we use technology to improve your experience on Playing Books.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="bg-white rounded-3xl shadow-sm border border-[#1695a0]/10 p-8 md:p-12">
          
          {/* Last Updated Badge */}
          <div className="inline-flex items-center gap-2 bg-[#fdfce9] text-[#1695a0] px-4 py-2 rounded-full text-sm font-semibold mb-10 border border-[#1695a0]/20">
            <span>Last updated: January 19, 2026</span>
          </div>

          <div className="prose prose-teal max-w-none text-[#36454f]">
            
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-[#1695a0] mb-4">Introduction</h2>
              <p className="leading-relaxed text-gray-600 mb-6">
                This Cookie Policy explains how Playing Books Podcast ("we," "us," or "our") uses cookies and similar technologies to recognize you when you visit our website at playingbooks.com ("Website"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
              </p>
            </section>

            {/* What are Cookies */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-[#1695a0] mb-4">What Are Cookies?</h2>
              <p className="leading-relaxed text-gray-600 mb-4">
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
              </p>
              <p className="leading-relaxed text-gray-600">
                Cookies set by the website owner (in this case, Playing Books Podcast) are called "first-party cookies." Cookies set by parties other than the website owner are called "third-party cookies." Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
              </p>
            </section>

            {/* Why Do We Use Cookies */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-[#1695a0] mb-4">Why Do We Use Cookies?</h2>
              <p className="leading-relaxed text-gray-600">
                We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Website. Third parties serve cookies through our Website for advertising, analytics, and other purposes. This is described in more detail below.
              </p>
            </section>

            {/* Types of Cookies (Grid Layout) */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-[#1695a0] mb-8">Types of Cookies We Use</h2>
              <p className="leading-relaxed text-gray-600 mb-8">
                The specific types of first and third-party cookies served through our Website and the purposes they perform are described below:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Essential */}
                <div className="bg-[#fdfce9]/50 p-6 rounded-2xl border border-[#1695a0]/20 hover:border-[#1695a0] transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-[#1695a0] text-white rounded-lg">
                      <Shield size={20} />
                    </div>
                    <h3 className="font-bold text-[#1695a0] text-lg m-0">Essential Cookies</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the Website, you cannot refuse them without impacting how our Website functions.
                  </p>
                </div>

                {/* Performance */}
                <div className="bg-[#fdfce9]/50 p-6 rounded-2xl border border-[#1695a0]/20 hover:border-[#1695a0] transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-[#1695a0] text-white rounded-lg">
                      <Settings size={20} />
                    </div>
                    <h3 className="font-bold text-[#1695a0] text-lg m-0">Performance & Functionality</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    These cookies are used to enhance the performance and functionality of our Website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.
                  </p>
                </div>

                {/* Analytics */}
                <div className="bg-[#fdfce9]/50 p-6 rounded-2xl border border-[#1695a0]/20 hover:border-[#1695a0] transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-[#1695a0] text-white rounded-lg">
                      <BarChart3 size={20} />
                    </div>
                    <h3 className="font-bold text-[#1695a0] text-lg m-0">Analytics & Customization</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are, or to help us customize our Website for you in order to enhance your experience.
                  </p>
                </div>

                {/* Advertising */}
                <div className="bg-[#fdfce9]/50 p-6 rounded-2xl border border-[#1695a0]/20 hover:border-[#1695a0] transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-[#1695a0] text-white rounded-lg">
                      <Megaphone size={20} />
                    </div>
                    <h3 className="font-bold text-[#1695a0] text-lg m-0">Advertising Cookies</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests.
                  </p>
                </div>
              </div>
            </section>

            {/* How to Control */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-[#1695a0] mb-4">How Can You Control Cookies?</h2>
              <p className="leading-relaxed text-gray-600 mb-4">
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided in the cookie banner on our Website.
              </p>
              <p className="leading-relaxed text-gray-600">
                You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our Website though your access to some functionality and areas of our Website may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information.
              </p>
            </section>

            {/* Updates */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-[#1695a0] mb-4">How Often Will We Update This Cookie Policy?</h2>
              <p className="leading-relaxed text-gray-600 mb-4">
                We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
              </p>
              <p className="leading-relaxed text-gray-600">
                The date at the top of this Cookie Policy indicates when it was last updated.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-[#36454f] text-[#fdfce9] p-8 rounded-2xl relative overflow-hidden">
               <div className="relative z-10">
                <h2 className="text-2xl font-serif font-bold text-white mb-6 flex items-center gap-2">
                  Contact Us
                </h2>
                <p className="leading-relaxed text-[#fdfce9]/80 mb-6">
                  If you have any questions about our use of cookies or other technologies, please contact us at:
                </p>
                <div className="flex flex-col gap-2">
                  <div className="font-bold text-xl">Worthscope</div>
                  <a href="mailto:worthscope@usa.com" className="flex items-center gap-2 text-[#7eac69] hover:text-[#fdfce9] transition-colors font-medium">
                    <Mail size={18} />
                    worthscope@usa.com
                  </a>
                </div>
              </div>
              
              {/* Decorative shapes */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#7eac69]/20 rounded-full blur-2xl"></div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;