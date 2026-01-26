import React from 'react';
import { Heart } from 'lucide-react';

// Define the custom element as a React component to bypass IntrinsicElements check
const StripeBuyButton = 'stripe-buy-button' as unknown as React.FC<{
  'buy-button-id': string;
  'publishable-key': string;
}>;

const DonationSection: React.FC = () => {
  return (
    <section id="donate" className="bg-[#fdfce9] pt-4 pb-2 md:pt-8 md:pb-4 border-t border-[#36454f]/5">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center justify-center p-2.5 md:p-3 bg-green-100 text-[#7eac69] rounded-full mb-4 md:mb-6">
          <Heart size={24} className="md:w-8 md:h-8" fill="currentColor" />
        </div>
        <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#1695a0] mb-3 md:mb-4">
          Support The PB Podcast.
        </h2>
        <p className="text-[#1695a0] mb-6 md:mb-8 max-w-xl mx-auto leading-relaxed text-sm md:text-base">
          Your contribution helps bring meaningful insights from bestselling books to listeners, encouraging thoughtful reflection, positive action, and overcoming despair.
        </p>

        <div className="flex justify-center bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 max-w-sm mx-auto">
          {/*
              Stripe Buy Button
              The script is loaded in index.html, this is just the web component usage.
            */}
          <StripeBuyButton
            buy-button-id="buy_btn_1SqYe6GOWPO5RkkFaO1sudt2"
            publishable-key="pk_live_51Kx69TGOWPO5RkkFEEQEMpHpCaLnLIyU5t1I7QADJ7JbvTf6v6n45WziZKchNsUL40hKWptTk1KzYRAki83ALwmp00SFoZtZzU"
          />
        </div>
        <div className="text-[#1695a0] mt-4 md:mt-6 space-y-2">
          <p className="text-xs opacity-70">Secure payments processed by Stripe.</p>
          <p className="text-base md:text-xl font-medium">Thank you for your kind and large-hearted donations.</p>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;