import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MapPin, Instagram, Facebook, Send, Menu, X } from 'lucide-react';
import { TikTokIcon } from '../Icons';
import { CONTACT_INFO, SOCIAL_LINKS } from '../../constants';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  scrollToBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen, scrollToBooking }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div className="bg-[#5A5A40] text-white/90 py-1 md:py-2.5 px-4 md:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[9px] md:text-[10px] uppercase tracking-widest font-bold">
          <div className="flex gap-4 md:gap-8">
            <div className="flex items-center gap-1 md:gap-2">
              <Phone className="w-2.5 h-2.5 md:w-3 md:h-3" />
              <span>{CONTACT_INFO.phone}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1 md:gap-2">
              <MapPin className="w-2.5 h-2.5 md:w-3 md:h-3" />
              <span>{CONTACT_INFO.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1 md:gap-1.5 group">
              <Instagram className="w-2.5 h-2.5 md:w-3 md:h-3 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Instagram</span>
            </a>
            <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1 md:gap-1.5 group">
              <TikTokIcon className="w-2.5 h-2.5 md:w-3 md:h-3 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">TikTok</span>
            </a>
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1 md:gap-1.5 group">
              <Facebook className="w-2.5 h-2.5 md:w-3 md:h-3 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Facebook</span>
            </a>
            <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1 md:gap-1.5 group">
              <Send className="w-2.5 h-2.5 md:w-3 md:h-3 group-hover:scale-110 transition-transform -rotate-45" />
              <span className="hidden sm:inline">Telegram</span>
            </a>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="bg-white/80 backdrop-blur-md border-b border-black/5 px-4  flex items-center justify-between"
      >
      
             <img 
    src="./logo.png"  // Update this path to match your file location
    alt="My Logo"
    width="100"
    height="100"
    style={{ objectFit: 'contain' }}  // Ensures it scales nicely without distortion
  /> 
  

        <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-widest font-semibold text-black/60">
          <a href="#about" className="hover:text-[#5A5A40] transition-colors">Our Story</a>
          <a href="#services" className="hover:text-[#5A5A40] transition-colors">Services</a>
          <a href="#gallery" className="hover:text-[#5A5A40] transition-colors">Gallery</a>
          <a href="#testimonials" className="hover:text-[#5A5A40] transition-colors">Reviews</a>
          <button 
            onClick={scrollToBooking}
            className="bg-[#5A5A40] text-white px-8 py-3 rounded-full hover:bg-[#4A4A30] transition-all shadow-lg shadow-[#5A5A40]/10"
          >
            Book Now
          </button>
        </div>

        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="md:hidden w-6 h-6" /> : <Menu className="md:hidden w-6 h-6" />}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-black/5 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-6 gap-6 text-[12px] uppercase tracking-widest font-bold text-black/60">
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#5A5A40] transition-colors">Our Story</a>
              <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#5A5A40] transition-colors">Services</a>
              <a href="#gallery" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#5A5A40] transition-colors">Gallery</a>
              <a href="#testimonials" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#5A5A40] transition-colors">Reviews</a>
              <button 
                onClick={() => { setIsMobileMenuOpen(false); scrollToBooking(); }}
                className="bg-[#5A5A40] text-white px-8 py-4 rounded-full hover:bg-[#4A4A30] transition-all w-full shadow-lg shadow-[#5A5A40]/20"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
