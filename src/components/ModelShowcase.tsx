import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Calendar, Calculator, Star, ArrowRight, Zap, Battery, Shield } from "lucide-react";
import model3Image from "@/assets/model-3.jpg";
import modelYImage from "@/assets/model-y.jpg";
import cybertruckImage from "@/assets/cybertruck.jpg";

const ModelShowcase = () => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [configuration, setConfiguration] = useState({
    color: "pearl-white",
    wheels: "19-tempest",
    interior: "black",
    autopilot: "basic"
  });

  const models = [
    {
      id: "model3",
      name: "Model 3",
      tagline: "The most affordable Tesla",
      basePrice: 38990,
      monthlyPayment: 649,
      range: 358,
      topSpeed: 162,
      acceleration: 3.1,
      image: model3Image,
      badges: ["Best Seller", "Most Efficient"],
      features: ["All-Wheel Drive", "Premium Interior", "Autopilot", "Over-the-air Updates"],
      colors: [
        { id: "pearl-white", name: "Pearl White Multi-Coat", price: 0, hex: "#ffffff" },
        { id: "midnight-silver", name: "Midnight Silver Metallic", price: 1000, hex: "#5c5d61" },
        { id: "deep-blue", name: "Deep Blue Metallic", price: 1000, hex: "#1e3a5f" },
        { id: "solid-black", name: "Solid Black", price: 1500, hex: "#000000" },
        { id: "red-multi-coat", name: "Red Multi-Coat", price: 2000, hex: "#cc0000" }
      ],
      wheels: [
        { id: "18-aero", name: "18\" Aero Wheels", price: 0, range: "+20 mi" },
        { id: "19-sport", name: "19\" Sport Wheels", price: 1500, range: "-10 mi" }
      ],
      interior: [
        { id: "black", name: "All Black", price: 0 },
        { id: "white", name: "Black and White", price: 1000 }
      ],
      autopilot: [
        { id: "basic", name: "Basic Autopilot", price: 0 },
        { id: "enhanced", name: "Enhanced Autopilot", price: 6000 },
        { id: "fsd", name: "Full Self-Driving", price: 12000 }
      ]
    },
    {
      id: "modely",
      name: "Model Y",
      tagline: "The versatile SUV",
      basePrice: 47740,
      monthlyPayment: 795,
      range: 330,
      topSpeed: 155,
      acceleration: 3.5,
      image: modelYImage,
      badges: ["Family Favorite", "7-Seat Available"],
      features: ["Panoramic Glass Roof", "Maximum Storage", "5-Star Safety", "Third Row Seating"],
      colors: [
        { id: "pearl-white", name: "Pearl White Multi-Coat", price: 0, hex: "#ffffff" },
        { id: "midnight-silver", name: "Midnight Silver Metallic", price: 1000, hex: "#5c5d61" },
        { id: "deep-blue", name: "Deep Blue Metallic", price: 1000, hex: "#1e3a5f" },
        { id: "solid-black", name: "Solid Black", price: 1500, hex: "#000000" },
        { id: "red-multi-coat", name: "Red Multi-Coat", price: 2000, hex: "#cc0000" }
      ],
      wheels: [
        { id: "19-gemini", name: "19\" Gemini Wheels", price: 0, range: "+15 mi" },
        { id: "20-induction", name: "20\" Induction Wheels", price: 2000, range: "-5 mi" }
      ],
      interior: [
        { id: "black", name: "All Black", price: 0 },
        { id: "white", name: "Black and White", price: 1000 }
      ],
      autopilot: [
        { id: "basic", name: "Basic Autopilot", price: 0 },
        { id: "enhanced", name: "Enhanced Autopilot", price: 6000 },
        { id: "fsd", name: "Full Self-Driving", price: 12000 }
      ]
    },
    {
      id: "cybertruck",
      name: "Cybertruck",
      tagline: "Built for any adventure",
      basePrice: 60990,
      monthlyPayment: 1016,
      range: 340,
      topSpeed: 130,
      acceleration: 2.6,
      image: cybertruckImage,
      badges: ["Pre-Order", "Revolutionary"],
      features: ["Ultra-Hard Steel", "Bulletproof Glass", "Adaptive Air Suspension", "Cybertruck Vault"],
      colors: [
        { id: "stainless-steel", name: "Stainless Steel", price: 0, hex: "#c0c0c0" }
      ],
      wheels: [
        { id: "20-cybertrunk", name: "20\" Cybertrunk Wheels", price: 0, range: "Standard" }
      ],
      interior: [
        { id: "black", name: "All Black", price: 0 },
        { id: "white", name: "Black and White", price: 1000 }
      ],
      autopilot: [
        { id: "basic", name: "Basic Autopilot", price: 0 },
        { id: "enhanced", name: "Enhanced Autopilot", price: 6000 },
        { id: "fsd", name: "Full Self-Driving", price: 12000 }
      ]
    }
  ];

  const toggleFavorite = (modelId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(modelId)) {
      newFavorites.delete(modelId);
    } else {
      newFavorites.add(modelId);
    }
    setFavorites(newFavorites);
  };

  const calculateTotalPrice = (model) => {
    if (!model) return 0;
    
    const colorPrice = model.colors.find(c => c.id === configuration.color)?.price || 0;
    const wheelPrice = model.wheels.find(w => w.id === configuration.wheels)?.price || 0;
    const interiorPrice = model.interior.find(i => i.id === configuration.interior)?.price || 0;
    const autopilotPrice = model.autopilot.find(a => a.id === configuration.autopilot)?.price || 0;
    
    return model.basePrice + colorPrice + wheelPrice + interiorPrice + autopilotPrice;
  };

  const openConfiguration = (model) => {
    setSelectedModel(model);
    setIsConfiguring(true);
  };

  return (
    <section id="models" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-light mb-4">
            Choose Your Tesla
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the perfect electric vehicle for your lifestyle. Configure and order online.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {models.map((model, index) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden tesla-shadow-card hover:tesla-shadow-premium tesla-transition group cursor-pointer relative">
                {/* Favorite Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(model.id);
                  }}
                >
                  <Heart 
                    className={`w-4 h-4 ${favorites.has(model.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                  />
                </Button>

                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
                  {model.badges.map((badge) => (
                    <Badge 
                      key={badge} 
                      className={`text-xs ${badge === 'Best Seller' ? 'tesla-premium-gradient' : 'tesla-accent-gradient'}`}
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>

                <div className="relative h-64 overflow-hidden">
                  <img
                    src={model.image}
                    alt={`${model.name} - ${model.tagline}`}
                    className="w-full h-full object-cover group-hover:scale-110 tesla-transition"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-semibold">{model.name}</h3>
                    <p className="text-sm opacity-90">{model.tagline}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-2xl font-semibold text-foreground">
                        ${model.basePrice.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ${model.monthlyPayment}/mo with financing*
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">4.9</span>
                    </div>
                  </div>

                  {/* Enhanced Specs */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Battery className="w-4 h-4 text-accent mr-1" />
                        <div className="text-lg font-semibold text-accent">{model.range}</div>
                      </div>
                      <div className="text-xs text-muted-foreground">Range (mi)</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Zap className="w-4 h-4 text-accent mr-1" />
                        <div className="text-lg font-semibold text-accent">{model.acceleration}s</div>
                      </div>
                      <div className="text-xs text-muted-foreground">0-60 mph</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Shield className="w-4 h-4 text-accent mr-1" />
                        <div className="text-lg font-semibold text-accent">{model.topSpeed}</div>
                      </div>
                      <div className="text-xs text-muted-foreground">Top Speed</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Key Features</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {model.features.slice(0, 3).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Enhanced Actions */}
                  <div className="flex flex-col space-y-3">
                    <Button 
                      className="w-full tesla-accent-gradient hover-lift"
                      onClick={() => openConfiguration(model)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Configure & Order
                    </Button>
                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1">
                        <Calendar className="w-4 h-4 mr-2" />
                        Test Drive
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Calculator className="w-4 h-4 mr-2" />
                        Finance
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Configuration Dialog */}
        <Dialog open={isConfiguring} onOpenChange={setIsConfiguring}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Configure Your {selectedModel?.name}
              </DialogTitle>
            </DialogHeader>

            {selectedModel && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Configuration Options */}
                <div className="space-y-6">
                  <Tabs defaultValue="exterior" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="exterior">Exterior</TabsTrigger>
                      <TabsTrigger value="interior">Interior</TabsTrigger>
                      <TabsTrigger value="wheels">Wheels</TabsTrigger>
                      <TabsTrigger value="autopilot">Autopilot</TabsTrigger>
                    </TabsList>

                    <TabsContent value="exterior" className="space-y-4">
                      <div>
                        <Label className="text-base font-semibold">Paint Color</Label>
                        <div className="grid grid-cols-1 gap-3 mt-2">
                          {selectedModel.colors.map((color) => (
                            <div
                              key={color.id}
                              className={`p-3 border rounded-lg cursor-pointer tesla-transition ${
                                configuration.color === color.id ? 'border-accent bg-accent/10' : 'border-border'
                              }`}
                              onClick={() => setConfiguration({...configuration, color: color.id})}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div 
                                    className="w-6 h-6 rounded-full border-2 border-gray-300"
                                    style={{ backgroundColor: color.hex }}
                                  />
                                  <span className="font-medium">{color.name}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {color.price > 0 ? `+$${color.price.toLocaleString()}` : 'Included'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="interior" className="space-y-4">
                      <div>
                        <Label className="text-base font-semibold">Interior</Label>
                        <div className="grid grid-cols-1 gap-3 mt-2">
                          {selectedModel.interior.map((interior) => (
                            <div
                              key={interior.id}
                              className={`p-3 border rounded-lg cursor-pointer tesla-transition ${
                                configuration.interior === interior.id ? 'border-accent bg-accent/10' : 'border-border'
                              }`}
                              onClick={() => setConfiguration({...configuration, interior: interior.id})}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{interior.name}</span>
                                <span className="text-sm text-muted-foreground">
                                  {interior.price > 0 ? `+$${interior.price.toLocaleString()}` : 'Included'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="wheels" className="space-y-4">
                      <div>
                        <Label className="text-base font-semibold">Wheels</Label>
                        <div className="grid grid-cols-1 gap-3 mt-2">
                          {selectedModel.wheels.map((wheel) => (
                            <div
                              key={wheel.id}
                              className={`p-3 border rounded-lg cursor-pointer tesla-transition ${
                                configuration.wheels === wheel.id ? 'border-accent bg-accent/10' : 'border-border'
                              }`}
                              onClick={() => setConfiguration({...configuration, wheels: wheel.id})}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-medium">{wheel.name}</div>
                                  <div className="text-sm text-muted-foreground">{wheel.range}</div>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {wheel.price > 0 ? `+$${wheel.price.toLocaleString()}` : 'Included'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="autopilot" className="space-y-4">
                      <div>
                        <Label className="text-base font-semibold">Autopilot</Label>
                        <div className="grid grid-cols-1 gap-3 mt-2">
                          {selectedModel.autopilot.map((autopilot) => (
                            <div
                              key={autopilot.id}
                              className={`p-3 border rounded-lg cursor-pointer tesla-transition ${
                                configuration.autopilot === autopilot.id ? 'border-accent bg-accent/10' : 'border-border'
                              }`}
                              onClick={() => setConfiguration({...configuration, autopilot: autopilot.id})}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{autopilot.name}</span>
                                <span className="text-sm text-muted-foreground">
                                  {autopilot.price > 0 ? `+$${autopilot.price.toLocaleString()}` : 'Included'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Order Summary */}
                <div className="space-y-6">
                  <Card className="p-6 tesla-card-gradient">
                    <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span>{selectedModel.name} Base Price</span>
                        <span>${selectedModel.basePrice.toLocaleString()}</span>
                      </div>
                      
                      {selectedModel.colors.find(c => c.id === configuration.color)?.price > 0 && (
                        <div className="flex justify-between text-sm">
                          <span>{selectedModel.colors.find(c => c.id === configuration.color)?.name}</span>
                          <span>+${selectedModel.colors.find(c => c.id === configuration.color)?.price.toLocaleString()}</span>
                        </div>
                      )}
                      
                      {selectedModel.wheels.find(w => w.id === configuration.wheels)?.price > 0 && (
                        <div className="flex justify-between text-sm">
                          <span>{selectedModel.wheels.find(w => w.id === configuration.wheels)?.name}</span>
                          <span>+${selectedModel.wheels.find(w => w.id === configuration.wheels)?.price.toLocaleString()}</span>
                        </div>
                      )}
                      
                      {selectedModel.interior.find(i => i.id === configuration.interior)?.price > 0 && (
                        <div className="flex justify-between text-sm">
                          <span>{selectedModel.interior.find(i => i.id === configuration.interior)?.name} Interior</span>
                          <span>+${selectedModel.interior.find(i => i.id === configuration.interior)?.price.toLocaleString()}</span>
                        </div>
                      )}
                      
                      {selectedModel.autopilot.find(a => a.id === configuration.autopilot)?.price > 0 && (
                        <div className="flex justify-between text-sm">
                          <span>{selectedModel.autopilot.find(a => a.id === configuration.autopilot)?.name}</span>
                          <span>+${selectedModel.autopilot.find(a => a.id === configuration.autopilot)?.price.toLocaleString()}</span>
                        </div>
                      )}
                      
                      <hr className="my-3" />
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total Price</span>
                        <span>${calculateTotalPrice(selectedModel).toLocaleString()}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Est. ${Math.round(calculateTotalPrice(selectedModel) / 60)}/mo with financing*
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button className="w-full tesla-accent-gradient text-lg py-3">
                        Order Now - $100 Deposit
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button variant="outline" className="w-full">
                        Save Configuration
                      </Button>
                      <Button variant="ghost" className="w-full">
                        Schedule Test Drive
                      </Button>
                    </div>
                  </Card>

                  {/* Delivery Info */}
                  <Card className="p-4 bg-accent/10 border-accent/20">
                    <h4 className="font-semibold mb-2">Estimated Delivery</h4>
                    <p className="text-sm text-muted-foreground">
                      Your {selectedModel.name} will be ready for delivery in 2-6 weeks depending on configuration.
                    </p>
                  </Card>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ModelShowcase;