import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Battery, Zap, Shield, Cpu, MapPin, Clock, Users, Phone, Mail, Calendar } from "lucide-react";

const Features = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    service: "test-drive"
  });

  const features = [
    {
      id: "acceleration",
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Acceleration",
      description: "Electric motors deliver instant torque for unparalleled acceleration from standstill",
      stats: "0-60 mph in as little as 1.99s",
      details: "Tesla's electric powertrain provides instant torque, delivering breathtaking acceleration that outperforms most supercars. No gear shifts, no delay - just pure, instant power.",
      benefits: ["No lag time", "Consistent performance", "Superior to gas engines", "Whisper quiet operation"]
    },
    {
      id: "range",
      icon: <Battery className="w-8 h-8" />,
      title: "Extended Range",
      description: "Advanced battery technology engineered for maximum efficiency and range",
      stats: "Up to 405 miles on a single charge",
      details: "Our cutting-edge battery technology and energy management systems ensure you can travel further with confidence. Intelligent range prediction helps you plan every journey.",
      benefits: ["Less charging stops", "Advanced battery management", "Real-time range updates", "Cold weather optimization"]
    },
    {
      id: "safety",
      icon: <Shield className="w-8 h-8" />,
      title: "Uncompromising Safety",
      description: "Built with safety as the top priority in every design decision and feature",
      stats: "5-Star Overall Safety Rating",
      details: "Tesla vehicles are engineered to be the safest cars on the road. Every component is designed with safety in mind, from the reinforced battery pack to advanced airbag systems.",
      benefits: ["Rigid body structure", "Advanced airbag system", "Automatic emergency braking", "Blind spot monitoring"]
    },
    {
      id: "autopilot",
      icon: <Cpu className="w-8 h-8" />,
      title: "Autopilot Technology",
      description: "Advanced driver assistance for enhanced safety and convenience on every journey",
      stats: "Full Self-Driving Capability Available",
      details: "Tesla's Autopilot uses advanced neural networks and real-world data to provide sophisticated driver assistance features that enhance safety and convenience.",
      benefits: ["Traffic-aware cruise control", "Auto lane changing", "Smart summon", "Navigate on autopilot"]
    }
  ];

  const superchargerStats = [
    { number: "45,000+", label: "Superchargers Worldwide", icon: <MapPin className="w-6 h-6" /> },
    { number: "15 min", label: "200 miles of range", icon: <Clock className="w-6 h-6" /> },
    { number: "99.9%", label: "Uptime Reliability", icon: <Shield className="w-6 h-6" /> },
    { number: "150kW", label: "Peak Charging Speed", icon: <Battery className="w-6 h-6" /> }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Contact form submitted:", contactForm);
    setIsContactOpen(false);
    // Show success message
  };

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-light mb-4">
            Innovation at Every Level
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tesla vehicles are engineered to be the safest, most capable cars on the road. Experience the future of transportation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="text-center group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              onClick={() => setSelectedFeature(feature)}
            >
              <motion.div 
                className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground tesla-transition group-hover:scale-110"
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-accent tesla-transition">
                {feature.title}
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {feature.description}
              </p>
              <div className="text-sm font-medium text-accent group-hover:underline">
                {feature.stats}
              </div>
              <Badge className="mt-2 opacity-0 group-hover:opacity-100 tesla-transition">
                Learn More
              </Badge>
            </motion.div>
          ))}
        </div>

        {/* Supercharger Network Section */}
        <motion.div
          className="relative overflow-hidden rounded-3xl tesla-shadow-premium mb-20"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="tesla-gradient p-12 md:p-20 text-center text-white relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-24 h-24 border border-white/20 rounded-full"></div>
              <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-5xl font-light mb-6">
                Supercharger Network
              </h3>
              <p className="text-lg md:text-xl mb-12 opacity-90 max-w-3xl mx-auto">
                Charge anywhere with confidence. The world's largest fast-charging network with over 45,000 Superchargers worldwide.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
              {superchargerStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="glass-effect rounded-xl p-6 hover-lift"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex justify-center mb-3 text-accent">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-semibold mb-2">{stat.number}</div>
                  <div className="text-xs md:text-sm opacity-80">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <Button 
                size="lg" 
                className="tesla-premium-gradient px-8 py-3 text-lg font-medium hover-lift"
                onClick={() => setIsContactOpen(true)}
              >
                <MapPin className="w-5 h-5 mr-2" />
                Find Superchargers
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-3 text-lg font-medium border-white/30 text-white hover:bg-white/10 glass-effect"
                onClick={() => setIsContactOpen(true)}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Plan Your Trip
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-light mb-6">
            Ready to Experience Tesla?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Schedule a test drive or speak with our specialists to learn more about Tesla ownership.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              size="lg" 
              className="tesla-accent-gradient px-8 py-3 hover-lift"
              onClick={() => setIsContactOpen(true)}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Test Drive
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => setIsContactOpen(true)}
            >
              <Users className="w-5 h-5 mr-2" />
              Speak with Specialist
            </Button>
          </div>
        </motion.div>

        {/* Feature Details Dialog */}
        <Dialog open={!!selectedFeature} onOpenChange={() => setSelectedFeature(null)}>
          <DialogContent className="max-w-2xl">
            {selectedFeature && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center text-2xl">
                    <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mr-4">
                      {selectedFeature.icon}
                    </div>
                    {selectedFeature.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <p className="text-lg text-muted-foreground">
                    {selectedFeature.details}
                  </p>
                  <div className="bg-accent/10 rounded-lg p-4">
                    <h4 className="font-semibold mb-3">Key Benefits:</h4>
                    <ul className="space-y-2">
                      {selectedFeature.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-accent mb-2">
                      {selectedFeature.stats}
                    </div>
                    <Button 
                      className="tesla-accent-gradient"
                      onClick={() => {
                        setSelectedFeature(null);
                        setIsContactOpen(true);
                      }}
                    >
                      Learn More & Test Drive
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Contact Dialog */}
        <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Get in Touch</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="service">I'm interested in:</Label>
                <select
                  id="service"
                  className="w-full p-2 border rounded-md"
                  value={contactForm.service}
                  onChange={(e) => setContactForm({...contactForm, service: e.target.value})}
                >
                  <option value="test-drive">Test Drive</option>
                  <option value="purchase">Purchase Information</option>
                  <option value="financing">Financing Options</option>
                  <option value="supercharger">Supercharger Network</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea
                  id="message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  rows={3}
                />
              </div>
              <div className="flex space-x-3">
                <Button type="submit" className="flex-1 tesla-accent-gradient">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button type="button" variant="outline" className="flex-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Features;