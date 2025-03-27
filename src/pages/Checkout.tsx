
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, CreditCard, ShoppingBag, Utensils } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });
  
  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !isComplete) {
      navigate("/");
    }
  }, [items, navigate, isComplete]);
  
  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Simulate payment processing
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setIsComplete(true);
      clearCart();
      
      // Scroll to top
      window.scrollTo(0, 0);
    }, 1500);
  };
  
  // Tax calculation (for display purposes)
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;
  
  // Group order items by type
  const groupedItems = items.reduce((acc, item) => {
    const type = item.orderType;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(item);
    return acc;
  }, { "takeaway": [], "dine-in": [] } as Record<string, typeof items>);

  if (isComplete) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        
        <main className="flex-1 pt-16">
          <div className="container mx-auto px-4 md:px-6 py-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto text-center"
            >
              <CheckCircle className="h-16 w-16 mx-auto text-accent mb-6" />
              
              <h1 className="text-3xl font-semibold tracking-tight">
                Order Complete
              </h1>
              
              <p className="mt-4 text-muted-foreground">
                Thank you for your order! Your order has been received and is now being processed.
              </p>
              
              <Button
                className="mt-8 w-full"
                size="lg"
                onClick={() => navigate("/")}
              >
                Return to Menu
              </Button>
            </motion.div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 md:px-6 py-8">
          {/* Back button */}
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 mb-6"
            onClick={() => navigate("/cart")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-semibold tracking-tight">
              Checkout
            </h1>
            <p className="mt-2 text-muted-foreground">
              Complete your order by providing your details below.
            </p>
          </motion.div>
          
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="rounded-lg border border-border bg-card shadow-sm p-6">
                <form onSubmit={handleSubmit}>
                  <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="(123) 456-7890"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Delivery Address</Label>
                      <Input
                        id="address"
                        name="address"
                        placeholder="123 Main St, City"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Details
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardExpiry">Expiry Date</Label>
                      <Input
                        id="cardExpiry"
                        name="cardExpiry"
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardCvc">CVC</Label>
                      <Input
                        id="cardCvc"
                        name="cardCvc"
                        placeholder="123"
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full mt-8"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : `Pay $${total.toFixed(2)}`}
                  </Button>
                </form>
              </div>
            </motion.div>
            
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="rounded-lg border border-border bg-card shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                {/* Order type sections */}
                {groupedItems["takeaway"].length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm font-medium mb-2">
                      <ShoppingBag className="h-4 w-4" />
                      <span>Takeaway Items</span>
                    </div>
                    
                    <ul className="space-y-2">
                      {groupedItems["takeaway"].map((item) => (
                        <li key={item.id} className="flex justify-between text-sm">
                          <span>
                            {item.quantity} × {item.name}
                          </span>
                          <span className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {groupedItems["dine-in"].length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm font-medium mb-2">
                      <Utensils className="h-4 w-4" />
                      <span>Dine-in Items</span>
                    </div>
                    
                    <ul className="space-y-2">
                      {groupedItems["dine-in"].map((item) => (
                        <li key={item.id} className="flex justify-between text-sm">
                          <span>
                            {item.quantity} × {item.name}
                          </span>
                          <span className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <Separator className="my-4" />
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <div className="flex justify-between text-base font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
