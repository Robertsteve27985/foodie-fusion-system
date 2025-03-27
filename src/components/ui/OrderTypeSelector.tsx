
import { motion } from "framer-motion";
import { ShoppingBag, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderTypeSelectorProps {
  value: "takeaway" | "dine-in";
  onChange: (value: "takeaway" | "dine-in") => void;
  className?: string;
}

const OrderTypeSelector = ({
  value,
  onChange,
  className,
}: OrderTypeSelectorProps) => {
  return (
    <div className={cn("flex w-full gap-4", className)}>
      <button
        type="button"
        onClick={() => onChange("takeaway")}
        className={cn(
          "flex-1 rounded-lg border border-border p-4 text-center transition-all duration-300",
          value === "takeaway"
            ? "border-accent bg-accent/5 text-accent"
            : "text-muted-foreground hover:bg-secondary/50"
        )}
      >
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center gap-2"
        >
          <ShoppingBag className="h-6 w-6" />
          <span className="text-sm font-medium">Takeaway</span>
        </motion.div>
      </button>
      
      <button
        type="button"
        onClick={() => onChange("dine-in")}
        className={cn(
          "flex-1 rounded-lg border border-border p-4 text-center transition-all duration-300",
          value === "dine-in"
            ? "border-accent bg-accent/5 text-accent"
            : "text-muted-foreground hover:bg-secondary/50"
        )}
      >
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col items-center justify-center gap-2"
        >
          <Utensils className="h-6 w-6" />
          <span className="text-sm font-medium">Dine-in</span>
        </motion.div>
      </button>
    </div>
  );
};

export default OrderTypeSelector;
