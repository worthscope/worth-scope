import React from 'react';
import { ArrowLeft, FileText, Shield, Gavel, Users, Lock, Ban, Send, Settings, Mail, CheckCircle2 } from 'lucide-react';

interface TermsOfServiceProps {
  onBack: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack }) => {
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
                <FileText size={32} />
             </div>
             <span className="text-[#fdfce9]/80 font-medium tracking-wide uppercase text-sm">Legal Documentation</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-[#fdfce9]/90 max-w-2xl leading-relaxed">
            Please read these terms carefully before using our services.
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
            
            {/* Agreement */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 bg-[#1695a0]/10 rounded-lg text-[#1695a0]">
                    <Gavel size={24} />
                 </div>
                 <h2 className="text-2xl font-serif font-bold text-[#1695a0] m-0">Agreement to Terms</h2>
              </div>
              <p className="leading-relaxed text-gray-600 mb-4">
                These Terms of Service constitute a legally binding agreement made between you and Playing Books Podcast ("we," "us," or "our"), concerning your access to and use of the Playing Books Podcast website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
              </p>
              <p className="leading-relaxed text-gray-600">
                You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these Terms of Service, then you are expressly prohibited from using the Site and you must discontinue use immediately.
              </p>
            </section>

            {/* Intellectual Property */}
            <section className="mb-12 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 bg-[#1695a0]/10 rounded-lg text-[#1695a0]">
                    <Shield size={24} />
                 </div>
                 <h2 className="text-2xl font-serif font-bold text-[#1695a0] m-0">Intellectual Property Rights</h2>
              </div>
              <p className="leading-relaxed text-gray-600 mb-4">
                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights.
              </p>
              <p className="leading-relaxed text-gray-600">
                The Content and the Marks are provided on the Site "AS IS" for your information and personal use only. Except as expressly provided in these Terms of Service, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
              </p>
            </section>

            {/* User Representations */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-2 bg-[#1695a0]/10 rounded-lg text-[#1695a0]">
                    <Users size={24} />
                 </div>
                 <h2 className="text-2xl font-serif font-bold text-[#1695a0] m-0">User Representations</h2>
              </div>
              <p className="leading-relaxed text-gray-600 mb-6">By using the Site, you represent and warrant that:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {[
                    "All registration information you submit will be true, accurate, current, and complete",
                    "You will maintain the accuracy of such information and promptly update it as necessary",
                    "You have the legal capacity and you agree to comply with these Terms of Service",
                    "You are not a minor in the jurisdiction in which you reside",
                    "You will not access the Site through automated or non-human means (bots, scripts, etc.)",
                    "You will not use the Site for any illegal or unauthorized purpose"
                 ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 bg-[#fdfce9] p-4 rounded-xl border border-[#1695a0]/10">
                        <CheckCircle2 size={18} className="text-[#7eac69] mt-1 shrink-0" />
                        <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                    </li>
                 ))}
              </ul>
            </section>

            {/* User Registration & Prohibited Activities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-[#1695a0]/10 rounded-lg text-[#1695a0]">
                            <Lock size={24} />
                        </div>
                        <h2 className="text-xl font-serif font-bold text-[#1695a0] m-0">User Registration</h2>
                    </div>
                    <p className="leading-relaxed text-gray-600 text-sm">
                        You may be required to register with the Site. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
                    </p>
                </section>

                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-[#1695a0]/10 rounded-lg text-[#1695a0]">
                            <Ban size={24} />
                        </div>
                        <h2 className="text-xl font-serif font-bold text-[#1695a0] m-0">Prohibited Activities</h2>
                    </div>
                    <p className="leading-relaxed text-gray-600 text-sm">
                        You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                    </p>
                </section>
            </div>

            {/* Submissions */}
            <section className="mb-12 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 bg-[#1695a0]/10 rounded-lg text-[#1695a0]">
                    <Send size={24} />
                 </div>
                 <h2 className="text-2xl font-serif font-bold text-[#1695a0] m-0">Submissions</h2>
              </div>
              <p className="leading-relaxed text-gray-600">
                You acknowledge and agree that any questions, comments, suggestions, ideas, feedback, or other information regarding the Site ("Submissions") provided by you to us are non-confidential and shall become our sole property. We shall own exclusive rights, including all intellectual property rights, and shall be entitled to the unrestricted use and dissemination of these Submissions for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.
              </p>
            </section>

            {/* Site Management */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-2 bg-[#1695a0]/10 rounded-lg text-[#1695a0]">
                    <Settings size={24} />
                 </div>
                 <h2 className="text-2xl font-serif font-bold text-[#1695a0] m-0">Site Management</h2>
              </div>
              <p className="leading-relaxed text-gray-600 mb-6">We reserve the right, but not the obligation, to:</p>
              <ul className="space-y-4">
                 {[
                    "Monitor the Site for violations of these Terms of Service",
                    "Take appropriate legal action against anyone who violates the law or these Terms",
                    "Refuse, restrict access to, limit availability of, or disable any of your Contributions",
                    "Remove from the Site or disable files/content that are excessive in size or burdensome",
                    "Otherwise manage the Site to protect our rights/property and facilitate proper functioning"
                 ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#1695a0] mt-2 shrink-0"></div>
                        <span className="text-gray-700 leading-relaxed">{item}</span>
                    </li>
                 ))}
              </ul>
            </section>

            {/* Contact */}
            <section className="bg-[#36454f] text-[#fdfce9] p-8 rounded-2xl relative overflow-hidden">
               <div className="relative z-10">
                <h2 className="text-2xl font-serif font-bold text-white mb-6 flex items-center gap-2">
                  Contact Us
                </h2>
                <p className="leading-relaxed text-[#fdfce9]/80 mb-6">
                  If you have questions or comments about these Terms of Service, please contact us at:
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

export default TermsOfService;