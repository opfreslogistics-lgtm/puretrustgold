'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoIcon, MenuIcon, XIcon, DiamondIcon, PhoneIcon, MailIcon, MapPinIcon, InstagramIcon, FacebookIcon, TwitterIcon, GoldBarIcon, UserIcon } from './Icons';
import { motion, AnimatePresence } from 'framer-motion';

// --- Mega Menu Components ---
const MegaMenuContext = React.createContext<{ active: string | null; setActive: (v: string | null) => void }>({ active: null, setActive: () => {} });

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  // Mega Menu Data
  const servicesLinks = [
    { name: 'Sell Gold', desc: 'Highest payout for 24k, 18k, 14k', path: '/services' },
    { name: 'Sell Diamonds', desc: 'GIA certified gemologists', path: '/services' },
    { name: 'Sell Bullion', desc: 'Bars, rounds, and ingots', path: '/services' },
    { name: 'Assay Process', desc: 'How we test your purity', path: '/process' },
  ];

  const locationsLinks = [
    { name: 'New York', desc: 'Flagship - Financial District', path: '/locations' },
    { name: 'Toronto', desc: 'Bay Street Secure Center', path: '/locations' },
    { name: 'San Juan', desc: 'Condado Luxury Suite', path: '/locations' },
    { name: 'Mexico City', desc: 'Polanco Private Office', path: '/locations' },
  ];

  return (
    <div className="flex flex-col w-full z-50">
      
      {/* SECTION 1: TOP BAR (Utility) */}
      <div className="bg-[#0A0A0A] border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-10 flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-400">
           <div className="flex space-x-6">
              <span className="flex items-center hover:text-gold transition-colors cursor-pointer">
                <PhoneIcon className="w-3 h-3 mr-2 text-gold" /> +1 (800) 555-GOLD
              </span>
              <span className="flex items-center hover:text-gold transition-colors cursor-pointer">
                <MailIcon className="w-3 h-3 mr-2 text-gold" /> VIP@PURETRUSTGOLD.COM
              </span>
              <span className="flex items-center">
                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse"></span> Open Now: NY, TOR, SJU
              </span>
           </div>
           <div className="flex space-x-4 items-center">
              <Link href="/admin" className="hover:text-gold transition-colors flex items-center">
                 <UserIcon className="w-3 h-3 mr-1" /> Partner Login
              </Link>
              <div className="w-px h-3 bg-gray-800"></div>
              <div className="flex space-x-3">
                 <FacebookIcon className="w-3 h-3 hover:text-white cursor-pointer transition-colors" />
                 <InstagramIcon className="w-3 h-3 hover:text-white cursor-pointer transition-colors" />
                 <TwitterIcon className="w-3 h-3 hover:text-white cursor-pointer transition-colors" />
              </div>
           </div>
        </div>
      </div>

      {/* SECTION 2: MIDDLE BAR (Brand) */}
      <div className="bg-black py-8 relative border-b border-gray-900">
         <div className="max-w-7xl mx-auto px-4 flex justify-between items-center relative">
            
            {/* Mobile Toggle */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white hover:text-gold">
               <MenuIcon size={28} />
            </button>

            {/* Logo Centered */}
            <Link href="/" className="flex flex-col items-center mx-auto group">
               <div className="flex items-center justify-center w-12 h-12 border border-gold/30 rounded-sm mb-2 group-hover:bg-gold/10 transition-colors duration-500">
                  <DiamondIcon className="w-6 h-6 text-gold" />
               </div>
               <span className="font-serif text-3xl font-bold tracking-[0.15em] text-white">PURETRUST</span>
               <span className="text-[0.55rem] uppercase tracking-[0.6em] text-gold mt-1">Gold & Diamond Exchange</span>
            </Link>

             {/* Right Side Callout (Desktop) */}
             <div className="hidden md:flex flex-col items-end absolute right-4 top-1/2 -translate-y-1/2">
                <Link href="/book">
                   <button className="px-6 py-3 border border-gold/50 text-gold text-xs font-bold uppercase tracking-widest hover:bg-gold hover:text-black transition-all duration-300">
                      Book Appraisal
                   </button>
                </Link>
             </div>
         </div>
      </div>

      {/* SECTION 3: MAIN BAR (Navigation) */}
      <div 
        className="bg-black border-b border-gold/20 sticky top-0 z-50 shadow-2xl"
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="max-w-7xl mx-auto px-4 hidden md:flex justify-center items-center h-14 space-x-12">
            <Link href="/" className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors py-5 border-b-2 ${pathname === '/' ? 'text-gold border-gold' : 'text-gray-300 border-transparent hover:text-white'}`}>
              Home
            </Link>
            <Link href="/about" className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors py-5 border-b-2 ${pathname === '/about' ? 'text-gold border-gold' : 'text-gray-300 border-transparent hover:text-white'}`}>
              About
            </Link>
            
            <div className="relative h-full flex items-center" onMouseEnter={() => setActiveMenu('services')}>
              <Link href="/services" className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors py-5 border-b-2 ${activeMenu === 'services' ? 'text-gold border-gold' : 'text-gray-300 border-transparent hover:text-white'}`}>
                Services
              </Link>
            </div>

            <div className="relative h-full flex items-center" onMouseEnter={() => setActiveMenu('locations')}>
              <Link href="/locations" className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors py-5 border-b-2 ${activeMenu === 'locations' ? 'text-gold border-gold' : 'text-gray-300 border-transparent hover:text-white'}`}>
                Locations
              </Link>
            </div>

            <Link href="/process" className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors py-5 border-b-2 ${pathname === '/process' ? 'text-gold border-gold' : 'text-gray-300 border-transparent hover:text-white'}`}>
              Process
            </Link>
            
            <Link href="/contact" className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors py-5 border-b-2 ${pathname === '/contact' ? 'text-gold border-gold' : 'text-gray-300 border-transparent hover:text-white'}`}>
              Contact
            </Link>
        </div>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="absolute top-14 left-0 w-full bg-deep-charcoal border-b border-gold/20 shadow-2xl overflow-hidden hidden md:block pb-8"
              onMouseEnter={() => setActiveMenu(activeMenu)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div className="max-w-7xl mx-auto px-8 py-10 flex">
                 {activeMenu === 'services' && (
                   <>
                     <div className="w-1/4 pr-8 border-r border-gray-800">
                        <h3 className="font-serif text-2xl text-white mb-2">Our Services</h3>
                        <div className="w-12 h-1 bg-gold mb-4"></div>
                        <p className="text-gray-400 text-xs leading-relaxed mb-6">
                          We provide a secure, private environment for the valuation and purchase of your most precious assets.
                        </p>
                        <Link href="/services" className="text-gold text-[10px] uppercase tracking-widest hover:text-white transition-colors border-b border-gold pb-1">View All Services</Link>
                     </div>
                     <div className="w-3/4 pl-12 grid grid-cols-2 gap-x-12 gap-y-8">
                        {servicesLinks.map((link) => (
                          <Link key={link.name} href={link.path} className="group block flex items-start space-x-4">
                            <div className="w-10 h-10 border border-gray-700 flex items-center justify-center group-hover:border-gold transition-colors">
                                <GoldBarIcon className="text-gray-500 group-hover:text-gold w-5 h-5 transition-colors" />
                            </div>
                            <div>
                                <h4 className="font-serif text-lg text-white group-hover:text-gold transition-colors flex items-center">
                                {link.name}
                                </h4>
                                <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors mt-1">{link.desc}</p>
                            </div>
                          </Link>
                        ))}
                     </div>
                   </>
                 )}
                 {activeMenu === 'locations' && (
                   <>
                     <div className="w-1/4 pr-8 border-r border-gray-800">
                        <h3 className="font-serif text-2xl text-white mb-2">Global Network</h3>
                         <div className="w-12 h-1 bg-gold mb-4"></div>
                        <p className="text-gray-400 text-xs leading-relaxed mb-6">
                          Visit our secure facilities in major financial hubs. Appointments recommended for privacy.
                        </p>
                        <Link href="/locations" className="text-gold text-[10px] uppercase tracking-widest hover:text-white transition-colors border-b border-gold pb-1">Find Nearest Office</Link>
                     </div>
                     <div className="w-3/4 pl-12 grid grid-cols-2 gap-8">
                        {locationsLinks.map((link) => (
                          <Link key={link.name} href={link.path} className="group block">
                             <div className="flex items-start space-x-3 p-4 border border-transparent hover:border-gray-800 hover:bg-gray-900 transition-all">
                                <MapPinIcon className="w-5 h-5 text-gold shrink-0 mt-1" />
                                <div>
                                  <h4 className="font-serif text-lg text-white group-hover:text-gold transition-colors">{link.name}</h4>
                                  <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors mt-1">{link.desc}</p>
                                </div>
                             </div>
                          </Link>
                        ))}
                     </div>
                   </>
                 )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="md:hidden fixed top-0 left-0 w-full h-screen bg-deep-black z-50 flex flex-col overflow-y-auto"
          >
            <div className="flex justify-end p-6">
               <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                 <XIcon size={32} />
               </button>
            </div>
            <div className="flex flex-col items-center space-y-8 mt-10">
              <Link href="/" onClick={() => setIsOpen(false)} className="text-2xl font-serif text-white hover:text-gold">Home</Link>
              <Link href="/about" onClick={() => setIsOpen(false)} className="text-2xl font-serif text-white hover:text-gold">About</Link>
              <Link href="/services" onClick={() => setIsOpen(false)} className="text-2xl font-serif text-white hover:text-gold">Services</Link>
              <Link href="/locations" onClick={() => setIsOpen(false)} className="text-2xl font-serif text-white hover:text-gold">Locations</Link>
              <Link href="/process" onClick={() => setIsOpen(false)} className="text-2xl font-serif text-white hover:text-gold">Process</Link>
              <Link href="/book" onClick={() => setIsOpen(false)} className="px-8 py-3 bg-gold text-black uppercase font-bold tracking-widest">Book Now</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-deep-black border-t border-gray-800 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
             <div className="flex items-center space-x-2">
                <DiamondIcon className="w-6 h-6 text-gold" />
                <span className="font-serif text-xl font-bold text-white tracking-widest">PURETRUST GOLD</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed pr-4">
              The premier destination for selling high-value precious metals and diamonds. We provide an unmatched level of security, privacy, and immediate liquidity.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-10 h-10 border border-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-all"><InstagramIcon className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 border border-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-all"><FacebookIcon className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 border border-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold transition-all"><TwitterIcon className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-serif text-lg mb-6">Discovery</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-gray-400 hover:text-gold transition-colors text-xs uppercase tracking-wider">The Brand</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-gold transition-colors text-xs uppercase tracking-wider">Items We Buy</Link></li>
              <li><Link href="/process" className="text-gray-400 hover:text-gold transition-colors text-xs uppercase tracking-wider">Assay Process</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-gold transition-colors text-xs uppercase tracking-wider">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-serif text-lg mb-6">Concierge</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400 text-xs">
                <MapPinIcon className="w-5 h-5 text-gold shrink-0" />
                <span>100 Gold St, Suite 500<br/>New York, NY 10038</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 text-xs">
                <PhoneIcon className="w-5 h-5 text-gold shrink-0" />
                <span>+1 (800) 555-GOLD</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 text-xs">
                <MailIcon className="w-5 h-5 text-gold shrink-0" />
                <span>vip@puretrustgold.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-serif text-lg mb-6">Market Insights</h3>
            <p className="text-gray-400 text-xs mb-4">Receive daily spot prices and exclusive offers.</p>
            <form className="flex flex-col space-y-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent border-b border-gray-700 text-white px-2 py-3 text-sm focus:outline-none focus:border-gold transition-colors w-full"
              />
              <button className="text-gold hover:text-white text-[10px] font-bold uppercase tracking-widest text-left pt-2 transition-colors">
                Subscribe →
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-900 my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-[10px] tracking-wider">© {new Date().getFullYear()} PURETRUST GOLD. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center space-x-8 mt-4 md:mt-0">
             <Link href="/privacy-policy" className="text-gray-600 hover:text-gold text-[10px] uppercase tracking-wider">Privacy Policy</Link>
             <Link href="/terms-of-service" className="text-gray-600 hover:text-gold text-[10px] uppercase tracking-wider">Terms of Service</Link>
             <Link href="/admin" className="text-gray-600 hover:text-gold text-[10px] uppercase tracking-wider">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const GoldTicker: React.FC = () => {
    // Dynamic Price Simulation
    const [prices, setPrices] = useState({
        gold: 2345.50,
        silver: 28.12,
        platinum: 980.00,
        palladium: 1050.25
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setPrices(prev => ({
                gold: prev.gold + (Math.random() - 0.5) * 2,
                silver: prev.silver + (Math.random() - 0.5) * 0.1,
                platinum: prev.platinum + (Math.random() - 0.5) * 5,
                palladium: prev.palladium + (Math.random() - 0.5) * 3
            }));
        }, 5000); // Updated to be slower
        return () => clearInterval(interval);
    }, []);

    const formatPrice = (p: number) => p.toFixed(2);

    const TickerItem = ({ label, price }: { label: string, price: number }) => (
        <span className="mx-12 text-xs font-bold uppercase tracking-[0.2em] text-gray-300 flex items-center">
            {label} <span className="text-gold ml-2 font-mono">${formatPrice(price)}</span> 
            <span className="ml-2 text-[0.6rem] text-accent-green">▲</span>
        </span>
    );

    return (
        <div className="bg-black border-b border-gray-900 h-10 flex items-center overflow-hidden relative z-40">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10"></div>
            
            <div className="whitespace-nowrap flex animate-marquee hover-pause w-full">
                <div className="flex items-center min-w-full justify-around">
                    <TickerItem label="Gold Spot" price={prices.gold} />
                    <TickerItem label="Silver Spot" price={prices.silver} />
                    <TickerItem label="Platinum" price={prices.platinum} />
                    <TickerItem label="Palladium" price={prices.palladium} />
                    <span className="text-gray-800 mx-4">|</span>
                    <TickerItem label="Gold Spot" price={prices.gold} />
                    <TickerItem label="Silver Spot" price={prices.silver} />
                    <TickerItem label="Platinum" price={prices.platinum} />
                    <TickerItem label="Palladium" price={prices.palladium} />
                    <span className="text-gray-800 mx-4">|</span>
                     <TickerItem label="Gold Spot" price={prices.gold} />
                    <TickerItem label="Silver Spot" price={prices.silver} />
                    <TickerItem label="Platinum" price={prices.platinum} />
                    <TickerItem label="Palladium" price={prices.palladium} />
                </div>
            </div>
        </div>
    );
};