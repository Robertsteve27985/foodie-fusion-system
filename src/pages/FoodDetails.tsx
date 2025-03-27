
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FoodCard from "@/components/ui/FoodCard";
import QuantitySelector from "@/components/ui/QuantitySelector";
import OrderTypeSelector from "@/components/ui/OrderTypeSelector";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { getFoodItemById, getRecommendedItems } from "@/lib/data";

const FoodDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const [food, setFood] = useState(id ? getFoodItemById(id) : undefined);
  const [quantity, setQuantity] = useState(1);
  const [orderType, setOrderType] = useState<"takeaway" | "dine-in">("takeaway");
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch food details and recommended items
  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    const item = getFoodItemById(id);
    if (!item) {
      navigate("/");
      return;
    }

    setFood(item);
    setRecommendedItems(getRecommendedItems(id, item.category));
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id, navigate]);

  // Handle order type change
  const handleOrderTypeChange = (type: "takeaway" | "dine-in") => {
    setOrderType(type);
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (!food) return;
    
    addItem(food, quantity, orderType);
    
    toast.success("Added to cart", {
      description: `${quantity} × ${food.name}`,
    });
  };

  // Handle scroll to top on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!food) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 pt-16">
        {/* Back button */}
        <div className="container mx-auto px-4 md:px-6 py-4">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
        
        {/* Food details section */}
        <section className="px-4 md:px-6 py-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Food image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative rounded-xl overflow-hidden aspect-square shadow-md"
              >
                <img
                  src={food.image}
                  alt={food.name}
                  className="h-full w-full object-cover"
                />
              </motion.div>
              
              {/* Food info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col justify-center"
              >
                <div className="inline-flex gap-2">
                  <span className="rounded-full bg-secondary/80 px-2.5 py-0.5 text-xs font-medium">
                    {food.category}
                  </span>
                </div>
                
                <h1 className="mt-3 text-3xl font-semibold tracking-tight">
                  {food.name}
                </h1>
                
                <p className="mt-4 text-lg font-medium text-accent">
                  ${food.price.toFixed(2)}
                </p>
                
                <p className="mt-4 text-muted-foreground">
                  {food.description}
                </p>
                
                <div className="mt-8 space-y-6">
                  {/* Order type selection */}
                  <div>
                    <h3 className="mb-3 text-sm font-medium">Order Type</h3>
                    <OrderTypeSelector
                      value={orderType}
                      onChange={handleOrderTypeChange}
                    />
                  </div>
                  
                  {/* Quantity selection */}
                  <div>
                    <h3 className="mb-3 text-sm font-medium">Quantity</h3>
                    <QuantitySelector
                      value={quantity}
                      onChange={setQuantity}
                      min={1}
                      max={10}
                    />
                  </div>
                  
                  {/* Add to cart button */}
                  <Button
                    size="lg"
                    className="w-full mt-4 gap-2"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart - ${(food.price * quantity).toFixed(2)}
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Recommended items section */}
        <section className="px-4 md:px-6 py-12 mt-6 bg-secondary/30">
          <div className="container mx-auto">
            <h2 className="text-2xl font-semibold tracking-tight mb-6">
              You Might Also Like
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recommendedItems.map((item, index) => (
                <FoodCard key={item.id} food={item} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FoodDetails;
