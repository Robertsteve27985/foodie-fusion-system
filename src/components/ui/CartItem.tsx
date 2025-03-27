
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/context/CartContext";
import QuantitySelector from "./QuantitySelector";
import { cn } from "@/lib/utils";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  className?: string;
}

const CartItem = ({
  item,
  onUpdateQuantity,
  onRemove,
  className,
}: CartItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0, y: 20 }}
      animate={{ opacity: 1, height: "auto", y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "rounded-lg border border-border/60 bg-card p-4 shadow-sm",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-md flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-card-foreground">{item.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {item.orderType === "takeaway" ? "Takeaway" : "Dine-in"}
              </p>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-full -mt-1 -mr-1 text-muted-foreground hover:text-destructive"
              onClick={() => onRemove(item.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-2 flex items-center justify-between">
            <QuantitySelector
              value={item.quantity}
              onChange={(value) => onUpdateQuantity(item.id, value)}
              className="scale-90 origin-left"
            />
            
            <div className="text-right">
              <p className="font-medium text-card-foreground">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground">
                ${item.price.toFixed(2)} each
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;
