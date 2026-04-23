import React from 'react';
import { motion, MotionValue } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  heroOpacity: MotionValue<number>;
  heroScale: MotionValue<number>;
  scrollToBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ heroOpacity, heroScale, scrollToBooking }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 text-center px-6"
      >
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-[12px] uppercase tracking-[0.3em] text-black/40 mb-6 font-bold"
        >
          A Sanctuary for the Soul
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="text-7xl md:text-9xl font-serif italic leading-tight mb-10"
        >
          Find Your <br /> Inner Calm
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          <button 
            onClick={scrollToBooking}
            className="group flex items-center gap-4 mx-auto bg-white border border-black/10 px-10 py-5 rounded-full text-sm font-semibold hover:bg-[#141414] hover:text-white transition-all duration-500 shadow-xl shadow-black/5"
          >
            Begin Your Journey
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </motion.div>
      
      {/* Atmospheric Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            x: [0, 50, -20, 0],
            y: [0, -30, 40, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5A5A40]/5 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, -60, 30, 0],
            y: [0, 40, -20, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#8E9299]/5 rounded-full blur-[120px]" 
        />
      </div>
    </section>
  );
};
