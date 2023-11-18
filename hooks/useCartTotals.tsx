"use client";

import { useEffect, useState } from "react";
import { CartTotals } from "@/types/useCart";
import { useAppSelector } from "@/redux/hooks";

const useCartTotals = (): CartTotals => {
  const [totals, setTotals] = useState<CartTotals>({
    totalPrice: 0,
    totalQuantity: 0,
  });

  const { cartItems } = useAppSelector((state) => state.cart);

  useEffect(() => {
    const calculateCartTotal = (): void => {
      let totalPrice = 0;
      let totalQuantity = 0;

      cartItems.forEach((item) => {
        totalPrice += Number((item.price * item.quantity).toFixed(2));
        totalQuantity += item.quantity;
      });
      setTotals({ totalPrice, totalQuantity });
    };
    calculateCartTotal();
  }, [cartItems]);

  return totals;
};

export default useCartTotals;
