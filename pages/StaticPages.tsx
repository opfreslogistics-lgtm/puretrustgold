import React from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon, ShieldCheckIcon, DiamondIcon, ScaleIcon, CheckIcon } from '../components/Icons';
import { Link } from 'react-router-dom';

// --- Components for sections ---
const PageHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="bg-deep-charcoal py-40 md:py-52 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-40"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
    <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl md:text-9xl font-serif text-white font-bold mb-8"
      >
        {title}
      </motion.h1>
      {subtitle && <p className="text-gold text-xl uppercase tracking-[0.2em]">{subtitle}</p>}
    </div>
  </div>
);

const ContentBlock: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-20">
        <h3 className="text-4xl font-serif text-white mb-8 border-b border-gray-800 pb-6">{title}</h3>
        <div className="text-gray-400 leading-relaxed text-xl font-light space-y-6">
            {children}
        </div>
    </div>
);

// --- Pages ---

export const About: React.FC = () => (
  <div className="min-h-screen bg-black">
    <PageHeader title="Our Legacy" subtitle="Trust • Heritage • Excellence" />
    <div className="max-w-6xl mx-auto px-4 py-32">
        
        {/* Intro */}
        <div className="text-center mb-32 max-w-4xl mx-auto">
             <p className="text-3xl text-white font-serif italic leading-relaxed">
                "We believe that selling precious assets should be as dignified and luxurious as buying them. It is not just a transaction; it is a transfer of legacy."
             </p>
             <p className="text-gold mt-6 font-bold uppercase tracking-widest text-sm">- James Sterling, Founder</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start mb-24">
             <div>
                <ContentBlock title="The History">
                    <p>Founded on the principles of absolute transparency and premium service, PureTrust Gold has established itself as the premier destination for selling high-value precious metals and diamonds.</p>
                    <p>What started as a private concierge service for estate liquidations has grown into an international network of secure buying offices. We recognized a gap in the market: the lack of a high-end, professional outlet for selling gold and diamonds that didn't feel like a pawn shop.</p>
                    <p>Today, we serve a global clientele ranging from private individuals to estate attorneys and wealth managers, handling millions in transactions monthly with the same discretion and care as day one.</p>
                </ContentBlock>
             </div>
             <div>
                 <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop" alt="Meeting" className="rounded-lg shadow-2xl opacity-80 mb-8" />
                 <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" alt="High Rise" className="rounded-lg shadow-2xl opacity-60" />
             </div>
        </div>

        <div className="mt-16 bg-deep-charcoal p-16 rounded-sm border border-gray-800">
            <ContentBlock title="Our Sustainability Commitment">
                <p>PureTrust Gold is committed to the responsible sourcing and recycling of precious metals. By facilitating the secondary market for gold and diamonds, we reduce the need for new mining operations, which often have significant environmental impacts.</p>
                <p>Every piece we purchase is either refined back into pure bullion for investment markets or refurbished for a new life, contributing to a circular economy in the luxury sector.</p>
            </ContentBlock>
        </div>

        <div className="mt-24 mb-24">
             <h3 className="text-5xl font-serif text-white text-center mb-16">Leadership Team</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                 {[
                     { name: 'Sarah Jenkins', role: 'Head Gemologist', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
                     { name: 'Michael Ross', role: 'Senior Assayer', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
                     { name: 'Elena Rodriguez', role: 'Director of Operations', img: 'https://randomuser.me/api/portraits/women/68.jpg' }
                 ].map((member, i) => (
                     <div key={i} className="bg-deep-charcoal p-12 border border-gray-800 hover:border-gold transition-all group">
                         <img src={member.img} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-6 border-2 border-gold grayscale group-hover:grayscale-0 transition-all" />
                         <h4 className="text-2xl text-white font-serif">{member.name}</h4>
                         <p className="text-gold text-xs uppercase tracking-widest mt-2">{member.role}</p>
                     </div>
                 ))}
             </div>
        </div>

        <ContentBlock title="Philanthropy">
            <p>We are proud to partner with global initiatives. A percentage of our annual yield is donated to "Gold for Good," an organization dedicated to cleaning up mercury pollution in artisanal mining communities.</p>
        </ContentBlock>
    </div>
  </div>
);

export const Locations: React.FC = () => {
  const locs = [
    { city: 'New York', address: '100 Gold St, Suite 500, NY 10038', phone: '+1 (212) 555-0100', desc: "Our flagship location in the heart of the Financial District. Features 3 private viewing suites and armored transport access." },
    { city: 'Toronto', address: '150 Bay St, Toronto, ON M5J 2N8', phone: '+1 (416) 555-0100', desc: "Located in the historic Canada Permanent Trust Building. Full bullion exchange services available." },
    { city: 'San Juan', address: '1055 Ashford Ave, San Juan, 00907', phone: '+1 (787) 555-0100', desc: "Ocean view private offices in the Condado Vanderbilt Hotel complex. VIP concierge available." },
    { city: 'Mexico City', address: 'Av. Pdte. Masaryk 111, Polanco', phone: '+52 (55) 555-0100', desc: "Exclusive secure facility in Polanco. By appointment only for high-value estate liquidations." },
  ];

  return (
    <div className="min-h-screen bg-black">
      <PageHeader title="Global Presence" subtitle="Find Us Near You" />
      <div className="max-w-7xl mx-auto px-4 py-32">
        
        <div className="mb-24 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-serif text-white mb-6">The Lounge Experience</h2>
            <p className="text-gray-400 text-lg">
                Forget standing at a counter. At PureTrust, you are escorted to a private, secure lounge. Enjoy espresso or champagne while our experts evaluate your items right in front of you. Security is paramount, and comfort is guaranteed.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          {locs.map((l, i) => (
            <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-deep-charcoal border border-gray-800 hover:border-gold transition-all duration-300 group overflow-hidden"
            >
              <div className="h-64 bg-gray-900 relative">
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                   {/* Placeholder for Map/Building Image */}
                   <div className="w-full h-full flex items-center justify-center text-gray-700 uppercase tracking-widest text-xs bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                       [ Map View: {l.city} ]
                   </div>
              </div>
              <div className="p-10">
                <div className="flex items-start justify-between mb-6">
                     <h3 className="text-4xl font-serif text-white group-hover:text-gold transition-colors">{l.city}</h3>
                     <MapPinIcon className="text-gold w-8 h-8" />
                </div>
                <p className="text-white mb-2 font-medium text-lg">{l.address}</p>
                <p className="text-gold mb-6 font-mono">{l.phone}</p>
                <p className="text-gray-400 text-base leading-relaxed mb-10">{l.desc}</p>
                <div className="flex space-x-4">
                    <button className="flex-1 py-4 border border-white text-white text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors font-bold">Get Directions</button>
                    <Link to="/book" className="flex-1 py-4 bg-gold text-black text-xs uppercase tracking-widest font-bold text-center hover:bg-white transition-colors">Book Here</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* VIP Transport */}
        <div className="bg-gradient-to-r from-gray-900 to-black p-12 border border-gray-800 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-12">
                <h3 className="text-3xl font-serif text-white mb-4">Secure Armored Transport</h3>
                <p className="text-gray-400">For transactions exceeding $100,000, we provide complimentary secure transport from your location to ours via Brinks or Dunbar Armored.</p>
            </div>
            <button className="px-8 py-4 bg-transparent border border-gold text-gold hover:bg-gold hover:text-black transition-colors uppercase tracking-widest text-sm font-bold whitespace-nowrap">
                Request Transport
            </button>
        </div>
      </div>
    </div>
  );
};

export const Process: React.FC = () => (
    <div className="min-h-screen bg-black">
      <PageHeader title="The Process" subtitle="Transparent & Secure" />
      <div className="max-w-6xl mx-auto px-4 py-32">
          
          <div className="mb-32">
              <h2 className="text-5xl font-serif text-white mb-16 text-center">From Appraisal to Payment</h2>
              <div className="w-32 h-1 bg-gold mx-auto mb-20"></div>
              
              {[
                  { num: '01', title: 'Consultation', text: 'Meet with our experts in a private, secure office. We review your items initially to sort by metal type and karat. You are offered refreshments while you wait.' },
                  { num: '02', title: 'Scientific Evaluation', text: 'We utilize Olympus Vanta XRF analyzers to determine purity without scratching or damaging your items. For diamonds, we use GIA-standard magnification and thermal conductivity tests.' },
                  { num: '03', title: 'Live Market Valuation', text: 'We weigh your items on state-certified scales (you can see the display). We then calculate the value based on the real-time London Fix gold price, which you can track on our lounge monitors.' },
                  { num: '04', title: 'Immediate Payment', text: 'Once you accept our offer, we process payment immediately. Cash, wire transfer, or check—the choice is yours. We provide a full receipt and documentation for your records.' }
              ].map((step, i) => (
                  <div key={i} className="flex flex-col md:flex-row gap-16 mb-24 items-start border-l-2 border-gray-800 pl-10 md:pl-0 md:border-none relative">
                      <div className="hidden md:block absolute left-8 top-8 bottom-0 w-px bg-gray-800 -z-10"></div>
                      <div className="text-9xl font-serif text-gray-900 font-bold leading-none md:w-1/4 text-right">{step.num}</div>
                      <div className="md:w-3/4 bg-deep-charcoal p-12 rounded border border-gray-800 hover:border-gold/30 transition-all shadow-xl">
                          <h3 className="text-3xl font-serif text-gold mb-6">{step.title}</h3>
                          <p className="text-gray-300 text-lg leading-relaxed font-light">{step.text}</p>
                      </div>
                  </div>
              ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
              <div className="bg-deep-charcoal p-12 border border-gold/20">
                <h3 className="text-3xl font-serif text-white mb-6">Security Protocols</h3>
                <div className="space-y-6">
                    <div className="flex items-start">
                        <ShieldCheckIcon className="w-8 h-8 text-gold mr-4 mt-1" />
                        <div>
                            <h4 className="text-white font-bold mb-1">ID Verification</h4>
                            <p className="text-gray-500 text-sm">We comply with all local laws requiring government-issued ID for transactions.</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="w-8 h-8 mr-4 mt-1 border border-gold rounded-full flex items-center justify-center text-gold text-xs font-bold">24/7</div>
                        <div>
                            <h4 className="text-white font-bold mb-1">Surveillance</h4>
                            <p className="text-gray-500 text-sm">All transactions are recorded in HD video for your safety and ours.</p>
                        </div>
                    </div>
                </div>
              </div>

              <div className="bg-deep-charcoal p-12 border border-gray-800">
                  <h3 className="text-3xl font-serif text-white mb-6">What to Bring</h3>
                  <ul className="space-y-4 text-gray-400">
                      <li className="flex items-center"><CheckIcon className="w-5 h-5 text-gold mr-3" /> Valid Government ID (Driver's License or Passport)</li>
                      <li className="flex items-center"><CheckIcon className="w-5 h-5 text-gold mr-3" /> The items you wish to sell</li>
                      <li className="flex items-center"><CheckIcon className="w-5 h-5 text-gold mr-3" /> Any original box or papers (increases value)</li>
                      <li className="flex items-center"><CheckIcon className="w-5 h-5 text-gold mr-3" /> Bank details (if you prefer Wire Transfer)</li>
                  </ul>
              </div>
          </div>
      </div>
    </div>
);

export const Contact: React.FC = () => {
    const [sent, setSent] = React.useState(false);
    return (
        <div className="min-h-screen bg-black">
            <PageHeader title="Contact Concierge" subtitle="We are here to assist" />
            <div className="max-w-7xl mx-auto px-4 py-32 grid grid-cols-1 md:grid-cols-2 gap-20">
                
                <div>
                    <h3 className="text-4xl text-white font-serif mb-8">Get in Touch</h3>
                    <p className="text-gray-400 mb-12 leading-relaxed text-lg">
                        Have a question about an item? Need to arrange a special appointment outside of business hours? 
                        Our concierge team is available 24/7 to assist high-net-worth clients with complete discretion.
                    </p>
                    
                    <div className="space-y-10">
                        <div>
                            <p className="text-gold text-xs uppercase tracking-widest mb-2">General Inquiries</p>
                            <p className="text-white text-2xl font-serif">info@puretrustgold.com</p>
                        </div>
                        <div>
                            <p className="text-gold text-xs uppercase tracking-widest mb-2">VIP & Estates</p>
                            <p className="text-white text-2xl font-serif">vip@puretrustgold.com</p>
                        </div>
                        <div>
                            <p className="text-gold text-xs uppercase tracking-widest mb-2">Toll Free</p>
                            <p className="text-white text-2xl font-serif">+1 (800) 555-GOLD</p>
                        </div>
                    </div>
                </div>

                <div className="bg-deep-charcoal p-12 border border-gray-800 shadow-2xl">
                    {sent ? (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-8">
                                <ShieldCheckIcon className="text-black w-10 h-10" />
                            </div>
                            <h3 className="text-3xl text-white font-serif mb-4">Message Sent</h3>
                            <p className="text-gray-400">Our concierge will respond shortly.</p>
                            <button onClick={() => setSent(false)} className="mt-8 text-gold text-sm underline">Send another</button>
                        </div>
                    ) : (
                        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-8">
                            <h3 className="text-2xl text-white font-serif mb-8">Send a Message</h3>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500 uppercase tracking-widest">Name</label>
                                    <input className="bg-black border border-gray-700 p-4 text-white w-full focus:border-gold outline-none transition-colors" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500 uppercase tracking-widest">Email</label>
                                    <input type="email" className="bg-black border border-gray-700 p-4 text-white w-full focus:border-gold outline-none transition-colors" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-gray-500 uppercase tracking-widest">Subject</label>
                                <input className="bg-black border border-gray-700 p-4 text-white w-full focus:border-gold outline-none transition-colors" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-gray-500 uppercase tracking-widest">Message</label>
                                <textarea rows={5} className="bg-black border border-gray-700 p-4 text-white w-full focus:border-gold outline-none transition-colors" required></textarea>
                            </div>
                            <button className="bg-gold text-black uppercase font-bold tracking-widest py-5 px-8 hover:bg-white transition-colors w-full">Send Message</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}