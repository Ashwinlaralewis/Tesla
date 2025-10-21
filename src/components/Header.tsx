import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, ShoppingCart, User, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Cart from "./Cart";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItems, setCartItems] = useState(1); // Updated to show items
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Model S", href: "#models", highlight: false },
    { name: "Model 3", href: "#models", highlight: false },
    { name: "Model Y", href: "#models", highlight: false },
    { name: "Cybertruck", href: "#models", highlight: true },
    { name: "Energy", href: "#energy", highlight: false },
    { name: "Charging", href: "#charging", highlight: false },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 tesla-transition ${
        isScrolled
          ? "bg-background/95 backdrop-blur-xl tesla-shadow border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <h1 className="text-2xl font-bold text-foreground tracking-wide">TESLA</h1>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a
                  href={item.href}
                  className={`relative text-foreground hover:text-accent tesla-transition-fast font-medium ${
                    item.highlight ? "text-accent font-semibold" : ""
                  }`}
                >
                  {item.name}
                  {item.highlight && (
                    <Badge className="absolute -top-2 -right-8 text-xs tesla-premium-gradient">
                      New
                    </Badge>
                  )}
                </a>
              </motion.div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-foreground hover:text-accent">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-accent">
              <User className="w-5 h-5 mr-2" />
              Account
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems > 0 && (
                <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs tesla-accent-gradient">
                  {cartItems}
                </Badge>
              )}
            </Button>
            <Button className="tesla-accent-gradient text-accent-foreground font-medium px-6 hover-lift">
              Order Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 pb-4 border-t border-border/50 overflow-hidden"
            >
              <nav className="flex flex-col space-y-4 mt-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="text-foreground hover:text-accent tesla-transition-fast font-medium flex items-center justify-between"
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.name}
                    {item.highlight && (
                      <Badge className="text-xs tesla-premium-gradient">New</Badge>
                    )}
                  </motion.a>
                ))}
                <div className="flex flex-col space-y-2 pt-4">
                  <Button variant="ghost" className="justify-start">
                    <User className="w-4 h-4 mr-2" />
                    Account
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Cart ({cartItems})
                  </Button>
                  <Button className="tesla-accent-gradient">Order Now</Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Cart Component */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </motion.header>
  );
};

export default Header;