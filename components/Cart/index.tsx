"use client";
import { FC } from "react";
import { cartClassNames, cartItemClassNames } from "./cartClassNames";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleCart } from "@/redux/features/cartSlice";

const Cart: FC = () => {
  const { showCart, cartItems } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(toggleCart());
  };

  const {
    cartContainer,
    header,
    title,
    closeBtn,
    itemContainer,
    subtotalContainer,
    subtotalText,
    subtotalPrice,
    checkoutBtn,
  } = cartClassNames;

  const {
    container,
    image,
    details,
    name,
    price,
    quantityContainer,
    quantity,
    removeButton,
  } = cartItemClassNames;
  return (
    <div
      className={`${cartContainer} ${
        showCart ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className={header}>
        <h2 className={title}>Shopping Cart</h2>
        <button className={closeBtn} onClick={handleClose}>
          X
        </button>
      </div>
      <div className={itemContainer}>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className={container}></div>
          ))
        ) : (
          <p>Your Cart is Empty</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
