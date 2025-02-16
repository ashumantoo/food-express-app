'use client'
import { API_ENDPOINTS } from "@/utils/api-endpoints";
import { restaurantInitialValue } from "@/utils/const";
import { IRestaurant } from "@/utils/types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ICartItem {
  foodItem: string;
  quantity: number;
}

export interface IAddItemToCart {
  restaurant: string;
  foodItem: string,
  quantity: number,
  price: number,
  isRemoving: boolean
}

interface ICartContextType {
  cartItems: ICartItem[],
  cartCount: number;
  totalPrice: number;
  restauratnInCart: IRestaurant,
  addToCart: (args: IAddItemToCart) => Promise<void>;
  removeFromCart: (foodItem: string, price: number, deleteCart: boolean) => Promise<void>;
  fetchCart: () => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<ICartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [restauratnInCart, setRestaurantInCart] = useState(restaurantInitialValue);

  // Fetch cart from API
  const fetchCart = async () => {
    const user = localStorage.getItem('user');
    const { id: userId } = user ? JSON.parse(user) : "";
    if (userId) {
      try {
        const res = await fetch(`${API_ENDPOINTS.cart}?user=${userId}`);
        const jsonResponse = await res.json();
        if (jsonResponse.data && jsonResponse.data.items) {
          setCartItems(jsonResponse.data.items);
          setCartCount(jsonResponse.data.items?.reduce((sum: number, item: ICartItem) => sum + item.quantity, 0) || 0);
          setTotalPrice(jsonResponse.data.totalPrice);
          setRestaurantInCart(jsonResponse.data.restaurant);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    } else {
      console.error('User not found while fetch cart')
    }
  };

  // Add item to cart
  const addToCart = async (args: IAddItemToCart) => {
    try {
      const { restaurant, foodItem, quantity, price, isRemoving } = args;
      const user = localStorage.getItem('user');
      const { id: userId } = user ? JSON.parse(user) : "";
      if (!userId) {
        throw new Error("User not found while add item to cart");
      }
      const res = await fetch(`${API_ENDPOINTS.cart}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: userId, restaurant, foodItem, quantity, price, isRemoving }),
      });
      const jsonResposne = await res.json();
      if (jsonResposne.success) {
        await fetchCart();
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Remove item from cart
  const removeFromCart = async (foodItem: string, price: number, deleteCart: boolean) => {
    try {
      const user = localStorage.getItem('user');
      const { id: userId } = user ? JSON.parse(user) : "";
      if (!userId) {
        throw new Error("User not found while add item to cart");
      }
      const res = await fetch(`${API_ENDPOINTS.cart}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: userId, foodItem, price, deleteCart }),
      });

      const jsonResposne = await res.json();
      if (jsonResposne.success) {
        await fetchCart();
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };


  const clearCart = async () => {
    try {
      const user = localStorage.getItem('user');
      const { id: userId } = user ? JSON.parse(user) : "";
      if (!userId) {
        throw new Error("User not found while add item to cart");
      }
      const res = await fetch(`${API_ENDPOINTS.cart}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: userId, deleteCart: true }),
      });

      const jsonResposne = await res.json();
      if (jsonResposne.success) {
        await fetchCart();
      }
    } catch (error) {
      console.error("Error on clear cart:", error);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);


  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      totalPrice,
      addToCart,
      removeFromCart,
      fetchCart,
      restauratnInCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook for using cart context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}