import React from 'react';
import { ArrowLeft, Lock, User, Smartphone, Eye, Share2, Shield, Mail, CheckCircle2, Server } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
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
                <Lock size={32} />
             </div>
             <span className="text-[#fdfce9]/80 font-medium tracking-wide uppercase text-sm">Legal Documentation</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-[#fdfce9]/90 max-w-2xl leading-relaxed">
            We value your trust and are committed to protecting your personal data.
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
                Welcome to the Privacy Policy of Playing Books Podcast ("we," "our," or "us"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our mobile application, or interact with our podcast content.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-[#1695a0] mb-8">Information We Collect</h2>
              <p className="leading-relaxed text-gray-600 mb-8">
                We may collect information about you in a variety of ways. The information we may collect includes:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Personal Data */}
                <div className="bg-[#fdfce9]/30 p-6 rounded-2xl border border-[#1695a0]/10 hover:border-[#1695a0]/30 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-[#1695a0]/10 text-[#1695a0] rounded-lg">
                      <User size={20} />
                    </div>
                    <h3 className="font-bold text-[#1695a0] text-lg m-0">Personal Data</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Personally identifiable information, such as your name, email address, and telephone number, that you voluntarily give to us when you register with our website, subscribe to our newsletter, or when you choose to participate in various activities related to our podcast.
                  </p>
                </div>

                {/* Derivative Data */}
                <div className="bg-[#fdfce9]/30 p-6 rounded-2xl border border-[#1695a0]/10 hover:border-[#1695a0]/30 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-[#1695a0]/10 text-[#1695a0] rounded-lg">
                      <Server size={20} />
                    </div>
                    <h3 className="font-bold text-[#1695a0] text-lg m-0">Derivative Data</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Information our servers automatically collect when you access our website, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the website.
                  </p>
                </div>

                {/* Mobile Device Data */}
                <div className="bg-[#fdfce9]/30 p-6 rounded-2xl border border-[#1695a0]/10 hover:border-[#1695a0]/30 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-[#1695a0]/10 text-[#1695a0] rounded-lg">
                      <Smartphone size={20} />
                    </div>
                    <h3 className="font-bold text-[#1695a0] text-lg m-0">Mobile Device Data</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Device information, such as your mobile device ID, model, and manufacturer, and information about the location of your device, if you access our website from a mobile device.
                  </p>
                </div>
              </div>
            </section>

            {/* Use of Your Information */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-2 bg-[#1695a0]/10 rounded-lg text-[#1695a0]">
                    <Eye size={24} />
                 </div>
                 <h2 className="text-2xl font-serif font-bold text-[#1695a0] m-0">Use of Your Information</h2>
              </div>
              <p className="leading-relaxed text-gray-600 mb-6">
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via our website to:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {[
                    "Create and manage your account",
                    "Send you a newsletter",
                    "Email you regarding your account or order",
                    "Fulfill and manage purchases and transactions",
                    "Increase the efficiency and operation of our website",
                    "Monitor and analyze usage and trends to improve experience",
                    "Notify you of updates to our podcast",
                    "Resolve disputes and troubleshoot problems"
                 ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                        <CheckCircle2 size={16} className="text-[#7eac69] mt-1 shrink-0" />
                        <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                    </li>
                 ))}
              </ul>
            </section>

            {/* Disclosure of Your Information */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-2 bg-[#1695a0]/10 rounded-lg text-[#1695a0]">
                    <Share2 size={24} />
                 </div>
                 <h2 className="text-2xl font-serif font-bold text-[#1695a0] m-0">Disclosure of Your Information</h2>
              </div>
              <p className="leading-relaxed text-gray-600 mb-6">
                We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
              </p>
              
              <div className="space-y-6">
                  <div className="border-l-4 border-[#1695a0] pl-6 py-2">
                    <h3 className="font-bold text-[#36454f] mb-2">By Law or to Protect Rights</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-[#7eac69] pl-6 py-2">
                    <h3 className="font-bold text-[#36454f] mb-2">Third-Party Service Providers</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
                    </p>
                  </div>
              </div>
            </section>

            {/* Security of Your Information */}
            <section className="mb-12 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 bg-[#1695a0]/10 rounded-lg text-[#1695a0]">
                    <Shield size={24} />
                 </div>
                 <h2 className="text-2xl font-serif font-bold text-[#1695a0] m-0">Security of Your Information</h2>
              </div>
              <p className="leading-relaxed text-gray-600">
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-[#36454f] text-[#fdfce9] p-8 rounded-2xl relative overflow-hidden">
               <div className="relative z-10">
                <h2 className="text-2xl font-serif font-bold text-white mb-6 flex items-center gap-2">
                  Contact Us
                </h2>
                <p className="leading-relaxed text-[#fdfce9]/80 mb-6">
                  If you have questions or comments about this Privacy Policy, please contact us at:
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

export default PrivacyPolicy;