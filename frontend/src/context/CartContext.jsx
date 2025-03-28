
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '../hooks/use-toast';

export const CartContext = createContext();

export const FoodItem = {
  id: '',
  name: '',
  description: '',
  price: 0,
  image: '',
  category: ''
};

export const CartItem = {
  item: FoodItem,
  quantity: 0,
  orderType: 'takeaway' // 'takeaway' or 'dine-in'
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orderType, setOrderType] = useState('takeaway');
  const { toast } = useToast();
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
    
    const savedOrderType = localStorage.getItem('orderType');
    if (savedOrderType) {
      setOrderType(savedOrderType);
    }
  }, []);
  
  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  // Save orderType to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('orderType', orderType);
  }, [orderType]);
  
  const addToCart = (item, quantity, selectedOrderType) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        cartItem => cartItem.item.id === item.id
      );
      
      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity,
          orderType: selectedOrderType || orderType
        };
        
        toast({
          title: "Updated cart",
          description: `${item.name} quantity updated to ${updatedCart[existingItemIndex].quantity}`,
        });
        
        return updatedCart;
      } else {
        // Add new item
        const newCartItem = {
          item,
          quantity,
          orderType: selectedOrderType || orderType
        };
        
        toast({
          title: "Added to cart",
          description: `${quantity} x ${item.name} added to your cart`,
        });
        
        return [...prevCart, newCartItem];
      }
    });
  };
  
  const updateCartItemQuantity = (itemId, quantity) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(cartItem => {
        if (cartItem.item.id === itemId) {
          return {
            ...cartItem,
            quantity
          };
        }
        return cartItem;
      });
      
      return updatedCart;
    });
  };
  
  const removeFromCart = (itemId) => {
    setCart(prevCart => {
      const item = prevCart.find(cartItem => cartItem.item.id === itemId);
      
      if (item) {
        toast({
          title: "Removed from cart",
          description: `${item.item.name} has been removed from your cart`,
        });
      }
      
      return prevCart.filter(cartItem => cartItem.item.id !== itemId);
    });
  };
  
  const clearCart = () => {
    setCart([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };
  
  const calculateTotal = () => {
    return cart.reduce((total, cartItem) => {
      return total + cartItem.item.price * cartItem.quantity;
    }, 0);
  };
  
  return (
    <CartContext.Provider
      value={{
        cart,
        orderType,
        setOrderType,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        calculateTotal,
        itemCount: cart.reduce((count, cartItem) => count + cartItem.quantity, 0)
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
