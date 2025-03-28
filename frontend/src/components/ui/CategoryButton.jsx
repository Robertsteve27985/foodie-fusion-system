
import React from "react";
import { motion } from "framer-motion";
import { Button } from "./button";
import { cn } from "../../lib/utils";

const CategoryButton = ({ category, isActive, onClick, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        variant={isActive ? "default" : "outline"}
        className={cn(
          "transition-all duration-300",
          isActive && "bg-accent text-accent-foreground"
        )}
        onClick={onClick}
      >
        {category}
      </Button>
    </motion.div>
  );
};

export default CategoryButton;
