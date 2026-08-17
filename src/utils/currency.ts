// src/utils/currency.ts
 
// Turns "R8,250" or "8250" into a plain number for calculations
export function parsePrice(price: string | number): number {
  if (typeof price === "number") return price;
  const numeric = price.replace(/[^0-9.]/g, "");
  return parseFloat(numeric) || 0;
}
 
export function formatCurrency(amount: number): string {
  return `R${amount.toLocaleString("en-ZA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}