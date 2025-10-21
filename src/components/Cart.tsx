import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, 
  CreditCard, 
  Shield, 
  Truck, 
  CheckCircle, 
  X, 
  Plus, 
  Minus,
  Star,
  Gift,
  Clock,
  MapPin
} from "lucide-react";

const Cart = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: "model3-config",
      name: "Tesla Model 3",
      configuration: "Pearl White, 19\" Sport Wheels, Black Interior, Enhanced Autopilot",
      price: 46490,
      monthlyPayment: 774,
      quantity: 1,
      image: "/api/placeholder/300/200",
      delivery: "4-6 weeks"
    }
  ]);

  const [currentStep, setCurrentStep] = useState("cart"); // cart, checkout, confirmation
  const [checkoutForm, setCheckoutForm] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    
    // Address
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    
    // Payment
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    
    // Options
    financing: false,
    insurance: false,
    warranty: false,
    tradeIn: false
  });

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return Math.round(calculateSubtotal() * 0.0875); // 8.75% tax
  };

  const calculateTotal = () => {
    let total = calculateSubtotal() + calculateTax();
    if (checkoutForm.insurance) total += 2500;
    if (checkoutForm.warranty) total += 1500;
    return total;
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    // Process payment here
    console.log("Processing payment...", checkoutForm);
    setCurrentStep("confirmation");
  };

  const steps = [
    { id: "cart", title: "Cart", description: "Review your order" },
    { id: "checkout", title: "Checkout", description: "Payment & delivery" },
    { id: "confirmation", title: "Confirmation", description: "Order confirmed" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl flex items-center">
              <ShoppingCart className="w-6 h-6 mr-2" />
              {currentStep === "cart" && "Shopping Cart"}
              {currentStep === "checkout" && "Checkout"}
              {currentStep === "confirmation" && "Order Confirmation"}
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-8 mt-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center space-x-2 ${
                  steps.findIndex(s => s.id === currentStep) >= index 
                    ? 'text-accent' : 'text-muted-foreground'
                }`}>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                    steps.findIndex(s => s.id === currentStep) >= index 
                      ? 'border-accent bg-accent text-accent-foreground' 
                      : 'border-muted-foreground'
                  }`}>
                    {steps.findIndex(s => s.id === currentStep) > index ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{step.title}</div>
                    <div className="text-xs text-muted-foreground">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    steps.findIndex(s => s.id === currentStep) > index 
                      ? 'bg-accent' : 'bg-muted-foreground/30'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {currentStep === "cart" && (
            <motion.div
              key="cart"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground">Start configuring your Tesla to begin your order.</p>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <Card key={item.id} className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          <div className="md:col-span-2">
                            <div className="flex items-start space-x-4">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                              <div>
                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {item.configuration}
                                </p>
                                <div className="flex items-center space-x-4">
                                  <Badge variant="outline" className="text-xs">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {item.delivery}
                                  </Badge>
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    ))}
                                    <span className="text-xs text-muted-foreground ml-1">5.0</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-center">
                            <div className="flex items-center space-x-3">
                              <Button
                                variant="outline"
                                size="icon"
                                className="w-8 h-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="w-8 h-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-2xl font-semibold">
                              ${(item.price * item.quantity).toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              ${item.monthlyPayment}/mo financing*
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <Card className="p-6 tesla-card-gradient">
                    <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${calculateSubtotal().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax & Fees</span>
                        <span>${calculateTax().toLocaleString()}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>${calculateTotal().toLocaleString()}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Or ${Math.round(calculateTotal() / 60)}/mo with approved financing*
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-6 tesla-accent-gradient text-lg py-3"
                      onClick={() => setCurrentStep("checkout")}
                    >
                      Proceed to Checkout
                    </Button>
                  </Card>
                </>
              )}
            </motion.div>
          )}

          {currentStep === "checkout" && (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Checkout Form */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Personal Information */}
                  <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>First Name</Label>
                        <Input 
                          required 
                          value={checkoutForm.firstName}
                          onChange={(e) => setCheckoutForm({...checkoutForm, firstName: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Last Name</Label>
                        <Input 
                          required 
                          value={checkoutForm.lastName}
                          onChange={(e) => setCheckoutForm({...checkoutForm, lastName: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input 
                          type="email" 
                          required 
                          value={checkoutForm.email}
                          onChange={(e) => setCheckoutForm({...checkoutForm, email: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <Input 
                          type="tel" 
                          required 
                          value={checkoutForm.phone}
                          onChange={(e) => setCheckoutForm({...checkoutForm, phone: e.target.value})}
                        />
                      </div>
                    </div>
                  </Card>

                  {/* Delivery Address */}
                  <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Delivery Address
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label>Street Address</Label>
                        <Input 
                          required 
                          value={checkoutForm.address}
                          onChange={(e) => setCheckoutForm({...checkoutForm, address: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>City</Label>
                          <Input 
                            required 
                            value={checkoutForm.city}
                            onChange={(e) => setCheckoutForm({...checkoutForm, city: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label>State</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ca">California</SelectItem>
                              <SelectItem value="ny">New York</SelectItem>
                              <SelectItem value="tx">Texas</SelectItem>
                              <SelectItem value="fl">Florida</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>ZIP Code</Label>
                          <Input 
                            required 
                            value={checkoutForm.zipCode}
                            onChange={(e) => setCheckoutForm({...checkoutForm, zipCode: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Payment Information */}
                  <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Payment Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label>Card Number</Label>
                        <Input 
                          placeholder="1234 5678 9012 3456"
                          required 
                          value={checkoutForm.cardNumber}
                          onChange={(e) => setCheckoutForm({...checkoutForm, cardNumber: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Expiry Date</Label>
                          <Input 
                            placeholder="MM/YY"
                            required 
                            value={checkoutForm.expiryDate}
                            onChange={(e) => setCheckoutForm({...checkoutForm, expiryDate: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label>CVV</Label>
                          <Input 
                            placeholder="123"
                            required 
                            value={checkoutForm.cvv}
                            onChange={(e) => setCheckoutForm({...checkoutForm, cvv: e.target.value})}
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Cardholder Name</Label>
                        <Input 
                          required 
                          value={checkoutForm.cardName}
                          onChange={(e) => setCheckoutForm({...checkoutForm, cardName: e.target.value})}
                        />
                      </div>
                    </div>
                  </Card>

                  {/* Additional Options */}
                  <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Additional Options</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="financing"
                          checked={checkoutForm.financing}
                          onCheckedChange={(checked) => setCheckoutForm({...checkoutForm, financing: !!checked})}
                        />
                        <label htmlFor="financing" className="text-sm">
                          Apply for Tesla financing (2.49% APR)*
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="insurance"
                          checked={checkoutForm.insurance}
                          onCheckedChange={(checked) => setCheckoutForm({...checkoutForm, insurance: !!checked})}
                        />
                        <label htmlFor="insurance" className="text-sm">
                          Add Tesla Insurance (+$2,500)
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="warranty"
                          checked={checkoutForm.warranty}
                          onCheckedChange={(checked) => setCheckoutForm({...checkoutForm, warranty: !!checked})}
                        />
                        <label htmlFor="warranty" className="text-sm">
                          Extended Warranty (+$1,500)
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="tradein"
                          checked={checkoutForm.tradeIn}
                          onCheckedChange={(checked) => setCheckoutForm({...checkoutForm, tradeIn: !!checked})}
                        />
                        <label htmlFor="tradein" className="text-sm">
                          I have a trade-in vehicle
                        </label>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Order Summary Sidebar */}
                <div className="space-y-6">
                  <Card className="p-6 tesla-card-gradient sticky top-4">
                    <h3 className="font-semibold text-lg mb-4">Final Order Summary</h3>
                    <div className="space-y-3 mb-6">
                      {cartItems.map((item) => (
                        <div key={item.id} className="pb-3 border-b border-border/50 last:border-0">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.configuration}</div>
                          <div className="text-right font-semibold">${item.price.toLocaleString()}</div>
                        </div>
                      ))}
                      
                      {checkoutForm.insurance && (
                        <div className="flex justify-between text-sm">
                          <span>Tesla Insurance</span>
                          <span>+$2,500</span>
                        </div>
                      )}
                      
                      {checkoutForm.warranty && (
                        <div className="flex justify-between text-sm">
                          <span>Extended Warranty</span>
                          <span>+$1,500</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span>Tax & Fees</span>
                        <span>${calculateTax().toLocaleString()}</span>
                      </div>
                      
                      <Separator />
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>${calculateTotal().toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button type="submit" className="w-full tesla-accent-gradient text-lg py-3">
                        <Shield className="w-4 h-4 mr-2" />
                        Complete Order
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setCurrentStep("cart")}
                      >
                        Back to Cart
                      </Button>
                    </div>

                    <div className="mt-4 p-3 bg-accent/10 rounded-lg">
                      <div className="flex items-center text-sm text-accent">
                        <Shield className="w-4 h-4 mr-2" />
                        Secure 256-bit SSL encryption
                      </div>
                    </div>
                  </Card>
                </div>
              </form>
            </motion.div>
          )}

          {currentStep === "confirmation" && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-green-600" />
              </motion.div>
              
              <h2 className="text-3xl font-semibold mb-4">Order Confirmed!</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Thank you for your Tesla order. Your journey to sustainable transportation begins now.
              </p>
              
              <Card className="max-w-md mx-auto p-6 tesla-card-gradient mb-8">
                <h3 className="font-semibold mb-4">Order Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Order Number</span>
                    <span className="font-mono">#TSL-{Date.now().toString().slice(-6)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Delivery</span>
                    <span>4-6 weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Amount</span>
                    <span className="font-semibold">${calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
              </Card>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <Button className="tesla-accent-gradient">
                  <Gift className="w-4 h-4 mr-2" />
                  Track Your Order
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Continue Shopping
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default Cart;