import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheckIcon, CalendarIcon, DollarSignIcon, DiamondIcon, GoldBarIcon, ScaleIcon, MapPinIcon } from '../components/Icons';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const ParallaxSection: React.FC<{ image: string; title: string; subtitle: string; align?: 'left' | 'right' }> = ({ image, title, subtitle, align = 'left' }) => (
    <section className="relative h-[800px] flex items-center overflow-hidden">
        <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed" 
            style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
             <div className={`max-w-xl ${align === 'right' ? 'ml-auto text-right' : 'mr-auto text-left'}`}>
                 <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                 >
                     <h2 className="text-5xl md:text-7xl font-serif text-white font-bold mb-6 leading-tight">{title}</h2>
                     <p className="text-xl text-gray-200 mb-8 leading-relaxed font-light">{subtitle}</p>
                     <Link to="/about">
                        <button className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all uppercase tracking-widest text-sm font-bold">
                            Discover More
                        </button>
                     </Link>
                 </motion.div>
             </div>
        </div>
    </section>
);

const Home: React.FC = () => {
  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative h-screen min-h-[900px] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/60 bg-gradient-to-b from-black/80 via-black/20 to-black"></div>
        </div>
        
        {/* Particles/Shimmer Overlay (CSS) */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-bold text-white mb-8 leading-[1.1]">
              Sell Your Gold & <br />
              <span className="text-gold-gradient">Diamonds With Confidence</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-2xl text-gray-300 mb-12 tracking-wide font-light max-w-3xl mx-auto"
          >
            The world's premier buyer of luxury assets. Professional assay, private appointments, and instant same-day payment.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <Link to="/book" className="group relative px-10 py-5 bg-gold overflow-hidden rounded-sm min-w-[200px]">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
              <span className="relative text-deep-black font-bold uppercase tracking-widest text-sm">Book Appointment</span>
            </Link>
            <Link to="/process" className="px-10 py-5 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 font-bold uppercase tracking-widest text-sm min-w-[200px]">
              How It Works
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. TRUST BADGES */}
      <section className="bg-deep-charcoal border-b border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-12 md:gap-32 items-center opacity-80 hover:opacity-100 transition-all duration-500"
          >
            {['GIA Certified Alumni', 'Licensed Precious Metals Dealer', 'A+ BBB Rating', 'Since 1998'].map((badge, idx) => (
               <motion.div key={idx} variants={fadeInUp} className="flex items-center space-x-4">
                 <ShieldCheckIcon className="text-gold w-10 h-10" />
                 <span className="font-serif text-white text-xl tracking-wide">{badge}</span>
               </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* NEW: PRESS SECTION */}
      <section className="py-12 bg-black border-b border-gray-900">
         <div className="max-w-7xl mx-auto px-4 text-center">
             <p className="text-gray-500 uppercase tracking-widest text-xs mb-8">As Featured In</p>
             <div className="flex justify-center items-center space-x-12 md:space-x-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                 <h3 className="text-2xl font-serif text-white">FORBES</h3>
                 <h3 className="text-2xl font-serif text-white">BLOOMBERG</h3>
                 <h3 className="text-2xl font-serif text-white">CNBC</h3>
                 <h3 className="text-2xl font-serif text-white">VOGUE</h3>
             </div>
         </div>
      </section>

      {/* NEW: THE GOLD STANDARD PARALLAX */}
      <ParallaxSection 
        image="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2075&auto=format&fit=crop"
        title="The Gold Standard"
        subtitle="We have redefined the selling experience. No pawn shops, no uncertainty. Just a private, luxury environment where your assets are treated with the respect they deserve."
      />

      {/* 3. HOW IT WORKS */}
      <section className="py-40 bg-black relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24">
             <div>
                <h2 className="text-gold font-sans text-sm tracking-[0.3em] uppercase mb-4">Our Process</h2>
                <h3 className="text-5xl md:text-7xl font-serif text-white">Simple, Secure, Superior.</h3>
             </div>
             <p className="text-gray-400 max-w-md mt-6 md:mt-0 text-right leading-relaxed text-lg">
                We've streamlined the selling process to respect your time and maximize your payout. Experience the difference of true professionalism.
             </p>
          </div>

          <motion.div 
             variants={staggerContainer}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10"
          >
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-16 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>

            {[
              { icon: CalendarIcon, title: "1. Book Appointment", desc: "Schedule a private consultation at one of our secure locations in New York, Toronto, or San Juan." },
              { icon: ScaleIcon, title: "2. Professional Assay", desc: "Our experts test your items in front of you using advanced XRF technology and specific gravity tests." },
              { icon: DollarSignIcon, title: "3. Get Paid Instantly", desc: "Accept our offer and receive an immediate cash payment, wire transfer, or certified check." },
            ].map((step, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="relative bg-deep-charcoal p-12 border border-gray-800 hover:border-gold/30 transition-all group shadow-2xl">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-8 border border-gold group-hover:bg-gold group-hover:text-black transition-colors text-gold">
                  <step.icon className="w-8 h-8" />
                </div>
                <h4 className="text-3xl font-serif text-white mb-6">{step.title}</h4>
                <p className="text-gray-400 leading-relaxed text-base">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* NEW: TECHNOLOGY & PRECISION */}
      <section className="py-32 bg-deep-charcoal border-y border-gray-800">
         <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
                 <div className="absolute -inset-4 border-2 border-gold/20 rounded-lg transform translate-x-4 translate-y-4"></div>
                <img src="https://images.unsplash.com/photo-1589758438368-0ad531db3366?q=80&w=1932&auto=format&fit=crop" alt="Assaying" className="rounded-lg shadow-2xl relative z-10" />
            </div>
            <div>
                <h2 className="text-gold font-sans text-sm tracking-[0.3em] uppercase mb-4">Precision Assaying</h2>
                <h3 className="text-4xl md:text-6xl font-serif text-white mb-8">Scientific Accuracy. <br/>Transparent Valuation.</h3>
                <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                    We don't guess. We verify. Using state-of-the-art X-Ray Fluorescence (XRF) spectrometers, we determine the exact elemental composition of your items down to the decimal. You watch the entire process, ensuring complete transparency.
                </p>
                <ul className="space-y-6 mb-12">
                    <li className="flex items-center text-gray-300"><span className="w-2 h-2 bg-gold mr-4 rounded-full"></span>Non-destructive testing methods</li>
                    <li className="flex items-center text-gray-300"><span className="w-2 h-2 bg-gold mr-4 rounded-full"></span>Calibrated daily for 99.9% accuracy</li>
                    <li className="flex items-center text-gray-300"><span className="w-2 h-2 bg-gold mr-4 rounded-full"></span>Live market price integration</li>
                </ul>
                <Link to="/process" className="text-gold uppercase tracking-widest text-sm border-b border-gold pb-1 hover:text-white transition-colors">Learn about our technology</Link>
            </div>
         </div>
      </section>

      {/* 4. WHAT WE BUY */}
      <section className="py-32 bg-black">
         <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-24">
               <h3 className="text-4xl md:text-6xl font-serif text-white mb-4">What We Buy</h3>
               <p className="text-gray-400 text-lg">We accept a wide range of precious assets.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                 { title: 'Gold Jewelry', subtitle: 'Any Karat (10k-24k)', img: 'https://images.unsplash.com/photo-1617038224558-28ad3fb558a7?q=80&w=1974&auto=format&fit=crop' },
                 { title: 'Diamonds', subtitle: 'Loose or Mounted', img: 'https://images.unsplash.com/photo-1618585474705-095932594a9a?q=80&w=2070&auto=format&fit=crop' },
                 { title: 'Luxury Watches', subtitle: 'Rolex, Patek, AP', img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1999&auto=format&fit=crop' },
                 { title: 'Bullion & Coins', subtitle: 'Gold, Silver, Platinum', img: 'https://images.unsplash.com/photo-1610375461369-d613b5215f7f?q=80&w=2070&auto=format&fit=crop' }
               ].map((item, idx) => (
                 <motion.div 
                   key={idx}
                   whileHover={{ y: -10 }}
                   className="relative h-[600px] group overflow-hidden border border-gray-900 cursor-pointer shadow-xl"
                 >
                   <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-50" style={{ backgroundImage: `url(${item.img})` }}></div>
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                   <div className="absolute bottom-0 left-0 p-10 w-full">
                     <h4 className="text-3xl font-serif text-white mb-2">{item.title}</h4>
                     <p className="text-gold text-sm uppercase tracking-widest mb-8">{item.subtitle}</p>
                     <Link to="/buy" className="inline-block px-8 py-3 border border-white/30 text-white text-xs uppercase tracking-widest hover:bg-gold hover:border-gold hover:text-black transition-all">View Details</Link>
                   </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* NEW: MARKET INSIGHTS */}
      <section className="py-24 bg-deep-charcoal">
          <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between items-end mb-16">
                  <h3 className="text-4xl font-serif text-white">Market Insights</h3>
                  <Link to="/about" className="text-gold text-sm uppercase tracking-widest">Read All News →</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                      { title: "Gold Hits All-Time High", date: "Oct 12, 2023", img: "https://images.unsplash.com/photo-1610375461369-d613b5215f7f?q=80&w=2070" },
                      { title: "Understanding Diamond Clarity", date: "Sep 28, 2023", img: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=1974" },
                      { title: "Investing in Platinum Bullion", date: "Sep 15, 2023", img: "https://images.unsplash.com/photo-1574689049597-7e6df3db18b4?q=80&w=2066" }
                  ].map((news, i) => (
                      <div key={i} className="group cursor-pointer">
                          <div className="h-64 overflow-hidden mb-6">
                              <img src={news.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={news.title} />
                          </div>
                          <p className="text-gold text-xs uppercase tracking-widest mb-2">{news.date}</p>
                          <h4 className="text-2xl font-serif text-white group-hover:text-gold transition-colors">{news.title}</h4>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* 5. WHY CHOOSE US - GRID */}
      <section className="py-32 bg-black">
         <div className="max-w-7xl mx-auto px-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                 <div>
                    <h3 className="text-5xl font-serif text-white mb-8">The PureTrust Promise</h3>
                    <p className="text-gray-400 mb-10 text-xl leading-relaxed">
                        In an industry often clouded by opacity, we stand as a beacon of trust. Our business model is built on long-term relationships, not one-off transactions.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        {[
                            { title: "Licensed Experts", desc: "GIA alumni with decades of experience." },
                            { title: "Highest Payouts", desc: "Up to 98% of spot price for bullion." },
                            { title: "Immediate Payment", desc: "Walk out with funds in hand." },
                            { title: "Private Lounge", desc: "Discrete, secure, and comfortable." }
                        ].map((f, i) => (
                            <div key={i} className="border-l-2 border-gold pl-6">
                                <h4 className="text-white font-serif text-xl mb-2">{f.title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                 </div>
                 <div className="relative">
                     <div className="absolute -inset-6 border border-gold/20 rounded-full animate-spin-slow"></div>
                     <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2127&auto=format&fit=crop" alt="Handshake" className="w-full h-full object-cover rounded shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" />
                 </div>
             </div>
         </div>
      </section>

      {/* 6. LOCATIONS PREVIEW */}
      <section className="py-32 bg-deep-charcoal border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div className="mb-4 md:mb-0">
                  <h3 className="text-4xl md:text-5xl font-serif text-white">Our Locations</h3>
                  <p className="text-gray-400 mt-2">Visit our premium buying centers.</p>
              </div>
              <Link to="/locations" className="text-gold hover:text-white transition-colors uppercase tracking-widest text-sm font-bold flex items-center">
                View All Locations <span className="ml-2">→</span>
              </Link>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {['New York', 'Puerto Rico', 'Toronto', 'Mexico City'].map((loc, idx) => (
               <div key={idx} className="relative h-96 bg-gray-900 overflow-hidden group border-b-4 border-gold">
                 <div className="absolute inset-0 bg-gray-800 group-hover:scale-105 transition-transform duration-700">
                    <img src={`https://picsum.photos/seed/${loc}luxury/400/600`} alt={loc} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all" />
                 </div>
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                 <div className="absolute bottom-8 left-8">
                   <h4 className="text-3xl font-serif text-white mb-2">{loc}</h4>
                   <p className="text-gray-400 text-xs mb-6">Secure Financial District</p>
                   <Link to="/book" className="flex items-center text-white text-xs uppercase tracking-widest hover:text-gold transition-colors">
                      Book Here <span className="ml-2">→</span>
                   </Link>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* FAQ SNIPPET */}
      <section className="py-24 bg-black">
          <div className="max-w-4xl mx-auto px-4">
              <h3 className="text-3xl font-serif text-white text-center mb-16">Frequently Asked Questions</h3>
              <div className="space-y-6">
                  {[
                      { q: "How do I know I'm getting a fair price?", a: "We base our offers on live global market prices (Spot Price) which update every minute. We explain exactly how we calculate your payout based on weight and purity." },
                      { q: "Do I need an appointment?", a: "While walk-ins are welcome, we highly recommend booking an appointment to ensure a private consultation in our VIP lounge without waiting." },
                      { q: "What form of payment do you offer?", a: "We offer immediate cash payment, company check, or instant wire transfer to your bank account, depending on your preference and the transaction size." }
                  ].map((item, i) => (
                      <div key={i} className="border border-gray-800 p-8 rounded bg-deep-charcoal hover:border-gold/30 transition-colors">
                          <h4 className="text-gold font-bold mb-3 font-serif text-lg">{item.q}</h4>
                          <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
                      </div>
                  ))}
              </div>
              <div className="text-center mt-12">
                  <Link to="/faq" className="text-white text-xs border-b border-gray-600 pb-1 hover:border-white transition-colors uppercase tracking-widest">View all FAQs</Link>
              </div>
          </div>
      </section>

      {/* 9. CTA */}
      <section className="py-40 relative overflow-hidden flex items-center justify-center">
         <div className="absolute inset-0 bg-gold-gradient opacity-10"></div>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-5"></div>
         <div className="relative z-10 text-center max-w-5xl px-6">
            <h2 className="text-5xl md:text-8xl font-serif font-bold text-white mb-10 leading-tight">Ready to Unlock the Value of Your Assets?</h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">Join thousands of satisfied clients who have chosen PureTrust for their gold and diamond transactions.</p>
            <Link to="/book">
              <button className="px-14 py-6 bg-gold hover:bg-white hover:text-black text-black font-bold text-lg uppercase tracking-widest transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(255,255,255,0.6)] rounded-sm">
                Book Your Appointment Today
              </button>
            </Link>
         </div>
      </section>
    </div>
  );
};

export default Home;