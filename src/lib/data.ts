
import { FoodItem } from "../context/CartContext";

// Categories for food items
export const categories = [
  "All",
  "Popular",
  "Pizza",
  "Burgers",
  "Pasta",
  "Salads",
  "Drinks",
  "Desserts",
];

// Sample food items data
export const foodItems: FoodItem[] = [
  {
    id: "1",
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella, and fresh basil",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "Pizza",
  },
  {
    id: "2",
    name: "Pepperoni Pizza",
    description: "Traditional pizza topped with pepperoni slices and mozzarella",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "Pizza",
  },
  {
    id: "3",
    name: "Classic Cheeseburger",
    description: "Beef patty with cheddar cheese, lettuce, tomato, and special sauce",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "Burgers",
  },
  {
    id: "4",
    name: "Bacon Burger",
    description: "Beef patty with crispy bacon, cheese, lettuce, and BBQ sauce",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "Burgers",
  },
  {
    id: "5",
    name: "Spaghetti Carbonara",
    description: "Pasta with creamy egg sauce, pancetta, and parmesan cheese",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "Pasta",
  },
  {
    id: "6",
    name: "Fettuccine Alfredo",
    description: "Pasta ribbons in a rich, creamy parmesan sauce",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023882a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "Pasta",
  },
  {
    id: "7",
    name: "Caesar Salad",
    description: "Romaine lettuce with Caesar dressing, croutons, and parmesan",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "Salads",
  },
  {
    id: "8",
    name: "Greek Salad",
    description: "Fresh salad with tomatoes, cucumbers, olives, and feta cheese",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "Salads",
  },
  {
    id: "9",
    name: "Chocolate Brownie",
    description: "Rich chocolate brownie with vanilla ice cream",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "Desserts",
  },
  {
    id: "10",
    name: "Tiramisu",
    description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "Desserts",
  },
  {
    id: "11",
    name: "Coca-Cola",
    description: "Classic refreshing cola drink",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "Drinks",
  },
  {
    id: "12",
    name: "Fresh Orange Juice",
    description: "Freshly squeezed orange juice",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "Drinks",
  },
];

// Helper function to get food item by ID
export const getFoodItemById = (id: string): FoodItem | undefined => {
  return foodItems.find(item => item.id === id);
};

// Helper function to get recommended food items
export const getRecommendedItems = (currentId: string, category: string, count: number = 4): FoodItem[] => {
  // First try to get items from the same category
  const sameCategoryItems = foodItems
    .filter(item => item.category === category && item.id !== currentId)
    .slice(0, count);
  
  // If we don't have enough items from the same category, add random items
  if (sameCategoryItems.length < count) {
    const otherItems = foodItems
      .filter(item => item.category !== category && item.id !== currentId)
      .slice(0, count - sameCategoryItems.length);
    
    return [...sameCategoryItems, ...otherItems];
  }
  
  return sameCategoryItems;
};
