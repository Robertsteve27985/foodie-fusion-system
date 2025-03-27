
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShoppingCart, Trash2 } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartItem from "@/components/ui/CartItem";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Separator } from "@/components/ui/separator";

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart();
  const navigate = useNavigate();
  
  // Handle empty cart redirect
  useEffect(() => {
    if (items.length === 0) {
      // Stay on the page for a moment to show empty state
      const timer = setTimeout(() => {
        // navigate("/");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [items.length, navigate]);
  
  // Tax calculation (for display purposes)
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;
  
  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

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
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-semibold tracking-tight">
              Your Cart
            </h1>
            <p className="mt-2 text-muted-foreground">
              {items.length > 0
                ? `You have ${items.length} item${items.length > 1 ? "s" : ""} in your cart.`
                : "Your cart is empty."}
            </p>
          </motion.div>
          
          {items.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="lg:col-span-2 space-y-4"
              >
                <AnimatePresence>
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </AnimatePresence>
                
                <div className="flex justify-end mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 text-muted-foreground"
                    onClick={clearCart}
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear Cart
                  </Button>
                </div>
              </motion.div>
              
              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-lg border border-border bg-card shadow-sm p-6"
              >
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
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
                
                <Button
                  className="w-full mt-6"
                  size="lg"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full mt-3"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </Button>
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <ShoppingCart className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <h2 className="text-xl font-medium">Your cart is empty</h2>
              <p className="mt-2 text-muted-foreground">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Button
                className="mt-6"
                size="lg"
                onClick={() => navigate("/")}
              >
                Explore Menu
              </Button>
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
