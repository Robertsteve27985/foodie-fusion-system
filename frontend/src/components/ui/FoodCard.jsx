
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const FoodCard = ({ food, className, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ y: -5 }}
      className={cn(
        "group overflow-hidden rounded-lg border border-border/50 bg-card shadow-sm transition-all duration-300 hover:shadow-md",
        className
      )}
    >
      <Link to={`/food/${food.id}`} className="block h-full">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={food.image}
            alt={food.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <div className="p-4">
          <div className="mb-1 flex items-center justify-between">
            <h3 className="font-medium text-card-foreground">{food.name}</h3>
            <span className="font-medium text-accent">${food.price.toFixed(2)}</span>
          </div>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {food.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default FoodCard;
