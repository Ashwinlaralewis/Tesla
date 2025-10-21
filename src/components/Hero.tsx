import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Play, Star } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/tesla-hero.jpg";

const Hero = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const stats = [
    { value: "1.99s", label: "0-60 mph", prefix: "" },
    { value: "200", label: "Top Speed", prefix: "", suffix: "mph" },
    { value: "405", label: "Range (EPA est.)", prefix: "", suffix: "mi" },
    { value: "1,020", label: "Peak Power", prefix: "", suffix: "hp" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img
          src={heroImage}
          alt="Tesla Model S Plaid - The future of electric luxury"
          className="w-full h-full object-cover parallax"
        />
        <div className="absolute inset-0 tesla-hero-overlay" />
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-3 h-3 bg-accent rounded-full opacity-60"></div>
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: "2s" }}>
        <div className="w-2 h-2 bg-accent rounded-full opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-light mb-4 leading-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Model S
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="relative inline-block"
          >
            <h2 className="text-2xl md:text-4xl mb-2 font-light text-gradient">
              Plaid
            </h2>
            <div className="flex items-center justify-center mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
              ))}
              <span className="text-sm ml-2 opacity-80">5.0 Customer Rating</span>
            </div>
          </motion.div>
          
          <motion.p 
            className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Beyond ludicrous. The quickest accelerating production car ever made.
            Experience the future of automotive performance.
          </motion.p>
        </motion.div>

        {/* Enhanced Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-effect rounded-xl p-4 hover-lift"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl md:text-3xl font-semibold text-accent mb-1">
                {stat.prefix}{stat.value}{stat.suffix}
              </div>
              <div className="text-xs md:text-sm opacity-80">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Action Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <Button 
            size="lg" 
            className="tesla-accent-gradient px-8 py-4 text-lg font-medium hover-lift tesla-shadow-premium"
          >
            Order Now - $89,990
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-4 text-lg font-medium border-white/30 text-white hover:bg-white/10 glass-effect"
          >
            <Play className="w-5 h-5 mr-2" />
            Watch Demo
          </Button>
        </motion.div>

        {/* Financing Info */}
        <motion.div
          className="mt-8 text-sm opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <p>Starting at $1,250/month with financing*</p>
          <p className="text-xs mt-1">*With approved credit and $10,000 down payment</p>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <div className="text-white/60 text-xs mb-2">Scroll to explore</div>
          <ChevronDown className="w-6 h-6 text-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;