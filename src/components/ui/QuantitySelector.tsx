
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

const QuantitySelector = ({
  value,
  onChange,
  min = 1,
  max = 10,
  className,
}: QuantitySelectorProps) => {
  const [quantity, setQuantity] = useState(value);

  // Update internal state when the prop changes
  useEffect(() => {
    setQuantity(value);
  }, [value]);

  const increment = () => {
    const newValue = Math.min(quantity + 1, max);
    setQuantity(newValue);
    onChange(newValue);
  };

  const decrement = () => {
    const newValue = Math.max(quantity - 1, min);
    setQuantity(newValue);
    onChange(newValue);
  };

  return (
    <div
      className={cn(
        "flex items-center space-x-3 rounded-lg border border-border p-1",
        className
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={decrement}
        disabled={quantity <= min}
        className="h-8 w-8 rounded-md transition-colors"
      >
        <Minus className="h-4 w-4" />
      </Button>
      
      <motion.div
        key={quantity}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex h-8 w-8 items-center justify-center font-medium"
      >
        {quantity}
      </motion.div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={increment}
        disabled={quantity >= max}
        className="h-8 w-8 rounded-md transition-colors"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default QuantitySelector;
