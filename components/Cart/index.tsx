"use client";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { RiCloseLine } from "react-icons/ri";
import { cartClassNames, cartItemClassNames } from "./cartClassNames";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeItemFromCart, toggleCart } from "@/redux/features/cartSlice";
import useCartTotals from "@/hooks/useCartTotals";

const Cart: FC = () => {
  const { showCart, cartItems } = useAppSelector((state) => state.cart);

  const [renderComponent, setRenderComponent] = useState(false);

  const { totalPrice, totalQuantity } = useCartTotals();

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(toggleCart());
  };

  const handleRemoveItem = (id: string) =>
    dispatch(removeItemFromCart({ _id: id }));

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

  useEffect(() => {
    setRenderComponent(true);
  }, []);

  if (!renderComponent) return <></>;

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
            <div key={item._id} className={container}>
              <Image
                className={image}
                src={item.images[0].url}
                alt={item.name}
                width={100}
                height={100}
              />
              <div className={details}>
                <h3 className={name}>{item.name}</h3>
                <p className={price}>${item.price.toFixed(2)}</p>
              </div>
              <div className={quantityContainer}>
                <span className={quantity}>{item.quantity}</span>
                <button
                  className={removeButton}
                  onClick={() => handleRemoveItem(item._id)}
                >
                  <RiCloseLine />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Your Cart is Empty</p>
        )}
      </div>
      <div className={subtotalContainer}>
        <span className={subtotalText}>Subtotal</span>
        <span className={subtotalPrice}>${totalPrice}</span>
      </div>
      <button className={checkoutBtn}>Checkout</button>
    </div>
  );
};

export default Cart;
