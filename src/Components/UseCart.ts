import { useContext } from "react";
import { CartContext } from "./CartContext";

export function UseCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("UseCart must be used within a <CartProvider>");
  }
  return ctx;
}