
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FoodCard from "@/components/ui/FoodCard";
import CategoryButton from "@/components/ui/CategoryButton";
import { Input } from "@/components/ui/input";
import { categories, foodItems } from "@/lib/data";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(foodItems);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Simulate loading and filter items
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Filter items based on category and search query
  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    
    let filtered = foodItems;
    
    // Apply category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(item => 
        selectedCategory === "Popular" 
          ? ["1", "3", "5", "9"].includes(item.id) // Simulating popular items
          : item.category === selectedCategory
      );
    }
    
    // Apply search filter
    if (query) {
      filtered = filtered.filter(
        item => 
          item.name.toLowerCase().includes(query) || 
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredItems(filtered);
  }, [selectedCategory, searchQuery]);

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
      
      <main className="flex-1">
        {/* Hero Section */}
        <motion.section 
          className="pt-28 pb-16 px-4 md:px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-balance">
              Discover Culinary Excellence
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our menu of thoughtfully crafted dishes made with the finest ingredients.
            </p>
            
            {/* Search Input */}
            <div className="relative max-w-md mx-auto mt-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for dishes..."
                className="pl-10 bg-background border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </motion.section>
        
        {/* Category filter */}
        <section className="py-4 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="flex flex-wrap gap-2 md:gap-3">
              {categories.map((category, index) => (
                <CategoryButton
                  key={category}
                  category={category}
                  isActive={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Food Grid */}
        <section className="py-8 px-4 md:px-6">
          <div className="container mx-auto">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div 
                    key={index}
                    className="aspect-[4/3] rounded-lg bg-secondary/40 animate-pulse"
                  />
                ))}
              </div>
            ) : filteredItems.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {filteredItems.map((item, index) => (
                  <FoodCard 
                    key={item.id} 
                    food={item} 
                    index={index}
                  />
                ))}
              </motion.div>
            ) : (
              <div className="py-16 text-center">
                <h3 className="text-xl font-medium">No items found</h3>
                <p className="mt-2 text-muted-foreground">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
