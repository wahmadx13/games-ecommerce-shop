"use client";

import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { toggleCart } from "@/redux/features/cartSlice";
import headerClassNames from "./headerClassNames";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import useCartTotals from "@/hooks/useCartTotals";
import SignUp from "../Signup";

const Header = () => {
  const {
    header,
    container,
    li,
    logoContainer,
    link,
    logo,
    nav,
    ul,
    orders,
    contactUs,
    signupBtn,
    signinBtn,
    logoutBtn,
    cart,
  } = headerClassNames;

  const [isSignupFormOpen, setIsSignupFormOpen] = useState(false);

  const { totalQuantity } = useCartTotals();

  const dispatch = useAppDispatch();

  const handleToggleCart = () => {
    dispatch(toggleCart());
  };

  const toggleForm = () => {
    setIsSignupFormOpen(!isSignupFormOpen);
  };

  return (
    <>
      <SignUp isSignupFormOpen={isSignupFormOpen} toggleForm={toggleForm} />
      <header className={header}>
        <div className={container}>
          <Link href="/" className={logoContainer}>
            <h1 className={logo}>Logo</h1>
          </Link>
          <nav className={nav}>
            <ul className={ul}>
              <li className={li}>
                <button onClick={handleToggleCart} className={link}>
                  <span>
                    Cart
                    <AiOutlineShoppingCart className="inline-block text-3xl" />
                  </span>
                  <div className={cart}>{totalQuantity}</div>
                </button>
              </li>
              <li className="flex items-center justify-center h-7">
                <Link href="/orders" className={orders}>
                  Orders
                </Link>
                <button className={logoutBtn}>Logout</button>
                <button onClick={toggleForm} className={signupBtn}>
                  Sign Up
                </button>
                <button className={signinBtn}>
                  Sign In
                  <FcGoogle
                    style={{
                      fontSize: "25px",
                      cursor: "pointer",
                      marginLeft: "12px",
                    }}
                    className={link}
                  />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
