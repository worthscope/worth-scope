import React, { useState, forwardRef } from 'react';
import { BookOpen, X, CheckCircle2, Lightbulb, BrainCircuit, Heart, Podcast, Quote } from 'lucide-react';

interface AboutSectionProps {
    onSubscribeClick: () => void;
    onDonateClick: () => void;
}

const AboutSection = forwardRef<HTMLElement, AboutSectionProps>(({ onSubscribeClick, onDonateClick }, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubscribe = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            onSubscribeClick();
        }, 100);
    };

    const handleDonate = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            onDonateClick();
        }, 100);
    };

    return (
        <section ref={ref} id="about" className="pt-8 pb-4 md:pt-16 md:pb-8 bg-[#fdfce9] relative overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#1695a0 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">

                {/* Added Title */}
                <h2 className="text-[#1695a0] font-serif font-bold text-3xl md:text-5xl mb-4 md:mb-8 text-center">About Playing Books</h2>

                {/* Huge Quote Section */}
                <div className="text-center max-w-6xl mx-auto mb-4 md:mb-8 px-2">
                    <Quote className="text-[#1695a0]/20 mx-auto mb-4 md:mb-8 w-12 h-12 md:w-32 md:h-32" />
                    <blockquote className="relative z-10">
                        <p className="font-serif font-bold text-xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-[#1695a0] leading-tight mb-3 md:mb-6 tracking-tight">
                            "There are altogether too many people who are trying to make something of themselves by reading books without <span className="text-[#7eac69] underline decoration-2 md:decoration-4 underline-offset-4 decoration-[#7eac69]/30">thinking</span>; all such will fail. You are not mentally developed by what you read, but by what you <span className="text-[#7eac69] underline decoration-2 md:decoration-4 underline-offset-4 decoration-[#7eac69]/30">think</span> about what you read."
                        </p>
                        <footer className="flex flex-col items-center gap-2 md:gap-4 justify-center">
                            <div className="h-1 w-16 md:w-24 bg-[#7eac69] rounded-full"></div>
                            <cite className="not-italic text-lg md:text-3xl font-bold text-[#1695a0] font-sans tracking-wide">Wallace D. Wattles.</cite>
                        </footer>
                    </blockquote>
                </div>

                {/* Philosophy & Action - No Background */}
                <div className="max-w-4xl mx-auto text-center relative z-10 mt-4 md:mt-8">
                    <span className="text-[#7eac69] font-bold tracking-widest uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 md:mb-6 block">Our Mission</span>
                    <p className="text-[#1695a0] text-lg md:text-3xl mb-8 md:mb-12 leading-relaxed font-serif px-2">
                        We founded <span className="font-bold text-[#7eac69]">Playing Books</span> to bridge the gap between reading and thinking. Join our community to transform passive listening into active growth.
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 md:gap-3 bg-[#1695a0] text-white px-6 py-3 md:px-10 md:py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-[#127a82] transition-all transform hover:-translate-y-1 text-base md:text-lg"
                    >
                        <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
                        <span>Read Full Mission</span>
                    </button>
                </div>
            </div>

            {/* Full Content Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[1100] flex justify-center p-4 pt-8 md:pt-12 overflow-y-auto">
                    <div className="fixed inset-0 bg-[#36454f]/90 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>

                    <div className="bg-[#fdfce9] w-full max-w-4xl rounded-2xl shadow-2xl relative flex flex-col h-fit max-h-none mb-12 animate-fade-in-up">
                        {/* Modal Header */}
                        <div className="bg-[#1695a0] p-4 md:p-6 text-white flex justify-between items-center shrink-0">
                            <h2 className="text-xl md:text-2xl font-serif font-bold text-[#fdfce9]">About Playing Books</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-[#fdfce9]/70 hover:text-[#fdfce9] bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
                            >
                                <X size={20} className="md:w-6 md:h-6" />
                            </button>
                        </div>

                        {/* Modal Scrollable Content */}
                        <div className="p-6 md:p-8 text-[#36454f] space-y-6 md:space-y-8">

                            {/* Intro Sections */}
                            <section>
                                <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1695a0] mb-3 md:mb-4">Our Mission</h3>
                                <p className="mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
                                    At Playing Books, reading is just the beginning of a transformative journey. The Playing Books podcast exists to incentivize people of all ages, especially young people, to not only read but to think and optimize what they read in practical ways.
                                </p>
                                <p className="mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
                                    While reading is undoubtedly important, the true value comes from engaging deeply with the material—questioning it, connecting it to your experiences, and applying its lessons to your life. Our podcast is designed to guide you through this process.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1695a0] mb-3 md:mb-4">The Curse of Reading and Forgetting</h3>
                                <p className="mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
                                    In 2013, Ian Crouch wrote a compelling article for The New Yorker titled "The Curse of Reading and Forgetting." In it, he highlighted a universal frustration: we read books, sometimes even take notes, but soon forget most of what we've learned. This "curse" is something we're actively fighting against.
                                </p>
                                <p className="leading-relaxed text-sm md:text-base">
                                    Through our podcast, we make the case for audiobooks as a powerful tool for retention. The ability to replay portions of a book, to hear concepts explained in different ways, and to engage with the material while on the go creates multiple pathways for learning.
                                </p>
                            </section>

                            <div className="w-full h-px bg-[#1695a0]/20 my-4"></div>

                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <Lightbulb className="text-[#1695a0] w-6 h-6 md:w-7 md:h-7" />
                                    <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1695a0]">Why Audiobooks Matter</h3>
                                </div>
                                <p className="mb-4 text-gray-700 text-sm md:text-base">Audiobooks offer unique advantages:</p>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {[
                                        "Learning during otherwise 'lost' time",
                                        "Engage different cognitive processes",
                                        "Easily replayed for better retention",
                                        "Add emotional dimension through narration",
                                        "Make complex ideas more accessible",
                                        "Lead to a desire to read physical books",
                                        "Integrate reading seamlessly into your day",
                                        "Ignite a passionate desire inside you",
                                        "Shape lives to reflect the power of books"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm md:text-base">
                                            <CheckCircle2 size={16} className="text-[#1695a0] mt-1 shrink-0 md:w-[18px] md:h-[18px]" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <div className="w-full h-px bg-[#1695a0]/20 my-4"></div>

                            <section className="bg-[#1695a0] p-6 md:p-8 rounded-xl shadow-lg text-[#fdfce9]">
                                <div className="flex items-center gap-3 mb-4">
                                    <BrainCircuit className="text-[#fdfce9] w-6 h-6 md:w-7 md:h-7" />
                                    <h3 className="text-lg md:text-xl font-bold text-[#fdfce9]">Active Thinking & Taking Action</h3>
                                </div>
                                <p className="leading-relaxed mb-6 text-sm md:text-base text-[#fdfce9]/90">
                                    At Playing Books, we believe that true transformation happens when active thinking leads to positive action. It's not enough to simply absorb information—real growth comes when you apply what you've learned to your daily life.
                                </p>
                                <div className="space-y-6">
                                    <p className="font-semibold text-[#fdfce9] text-base md:text-lg">
                                        Join us. Subscribe to our podcast, engage with our discussions, and let's transform passive consumption into a positive revolution.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button
                                            onClick={handleSubscribe}
                                            className="flex items-center justify-center gap-2 bg-[#fdfce9] text-[#1695a0] px-6 py-3 rounded-full font-bold shadow-md hover:shadow-xl hover:bg-white transition-all transform hover:-translate-y-1"
                                        >
                                            <Podcast size={20} />
                                            Subscribe Now
                                        </button>
                                        <button
                                            onClick={handleDonate}
                                            className="flex items-center justify-center gap-2 bg-[#7eac69] text-white px-6 py-3 rounded-full font-bold shadow-md hover:shadow-xl hover:bg-[#6c9658] transition-all transform hover:-translate-y-1"
                                        >
                                            <Heart size={20} fill="currentColor" />
                                            Donate
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;