import React, { useState } from 'react';
import { Mail, Film, BookOpen, Trophy, Clapperboard, Check, ArrowRight, Users, Sparkles } from 'lucide-react';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const interests = [
    { id: 'movies', label: 'Top Movies', icon: <Clapperboard size={16} /> },
    { id: 'docs', label: 'Documentaries', icon: <Film size={16} /> },
    { id: 'books', label: 'Literature & Books', icon: <BookOpen size={16} /> },
    { id: 'competitions', label: 'Competitions', icon: <Trophy size={16} /> },
  ];

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    // Simulate API delay
    setTimeout(() => {
      setStatus('success');
      
      // Construct the mailto link to send data to worthscope@usa.com
      const subject = encodeURIComponent("New Newsletter Subscription");
      const body = encodeURIComponent(
        `Hello,\n\nI would like to subscribe to the Playing Books newsletter.\n\nEmail: ${email}\nInterests: ${selectedInterests.length > 0 ? selectedInterests.join(', ') : 'General Updates'}\n\nThank you!`
      );
      
      window.location.href = `mailto:worthscope@usa.com?subject=${subject}&body=${body}`;
    }, 1500);
  };

  return (
    <section className="relative py-16 overflow-hidden bg-[#fdfce9]" aria-labelledby="newsletter-heading">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#1695a0]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-[#7eac69]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 reveal-section" style={{ animationDelay: '0.4s' }}>
        <div className="animate-soft-glow rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl border border-[#fdfce9]/10 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <div className="text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#fdfce9]/10 rounded-full text-[#fdfce9] backdrop-blur-sm border border-[#fdfce9]/20">
                <Users size={16} className="text-[#fdfce9]" aria-hidden="true" />
                <span className="text-sm font-bold tracking-wide uppercase">JOIN THE BOOK PODCAST TEAM</span>
              </div>
              
              <h2 id="newsletter-heading" className="text-4xl md:text-5xl font-serif font-bold text-[#fdfce9] leading-[1.3] md:leading-[1.4]">
                Curated Intelligence for the <span className="text-[#7eac69] bg-[#fdfce9] px-2 italic">Modern Mind.</span>
              </h2>
              
              <p className="text-[#fdfce9]/90 text-lg leading-relaxed max-w-xl">
                Get weekly insights on <strong>bestselling books</strong>, <strong>award-winning documentaries</strong>, <strong>top-rated movies</strong>, and exclusive <strong>literary competitions</strong>. No spam, just substance.
              </p>

              <div className="flex flex-wrap gap-3 mt-6" role="group" aria-label="Select Interests">
                {interests.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleInterest(item.id)}
                    aria-pressed={selectedInterests.includes(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                      selectedInterests.includes(item.id)
                        ? 'bg-[#fdfce9] text-[#1695a0] border-[#fdfce9] shadow-lg transform -translate-y-1'
                        : 'bg-transparent text-[#fdfce9] border-[#fdfce9]/30 hover:bg-[#fdfce9]/10'
                    }`}
                  >
                    <span aria-hidden="true">{item.icon}</span>
                    {item.label}
                    {selectedInterests.includes(item.id) && <Check size={14} aria-hidden="true" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Section */}
            <div className="bg-[#fdfce9] p-8 rounded-2xl shadow-xl transform md:rotate-1 hover:rotate-0 transition-transform duration-500">
              <h3 className="text-2xl font-bold text-[#1695a0] mb-2 font-serif">Subscribe Now</h3>
              <p className="text-gray-500 mb-6 text-sm">Participate in meaningful discourse with advocates of literature and the arts.</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <label htmlFor="email-subscription" className="sr-only">Email address</label>
                  <input
                    id="email-subscription"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="block w-full pl-11 pr-4 py-4 rounded-xl border border-gray-200 bg-white text-[#36454f] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1695a0] focus:border-transparent shadow-inner transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    status === 'success'
                      ? 'bg-[#7eac69] text-white cursor-default'
                      : 'bg-[#36454f] text-[#fdfce9] hover:bg-[#2c3942] hover:shadow-xl transform hover:-translate-y-0.5'
                  }`}
                >
                  {status === 'loading' ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : status === 'success' ? (
                    <>
                      <Check size={20} aria-hidden="true" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      Send Me Updates
                      <ArrowRight size={20} aria-hidden="true" />
                    </>
                  )}
                </button>
                
                <p className="text-xs text-gray-400 text-center mt-4">
                  By subscribing, you agree to our Terms & Privacy Policy. 
                  <br/>We respect your inbox.
                </p>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;