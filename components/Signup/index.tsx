"use client";
import { FC, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import signupClassNames from "./signupClassNames";
import { SignupProps } from "@/types/signupProps";

const SignUp: FC<SignupProps> = (props) => {
  const { isSignupFormOpen, toggleForm } = props;

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleCloseForm = () => {
    toggleForm();
  };

  const signupHandler = async () => {
    if (!emailRef.current || !passwordRef.current) return;
    setIsFormSubmitting(true);
    try {
      const response = await axios.post("/api/sign-up", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      setIsFormSubmitting(false);

      if (response.data)
        toast.success(`${response.statusText}. Please sign in.`);
    } catch (error) {
      setIsFormSubmitting(false);
      toast.error("Something went wrong");
      console.log("error", error);
    }
    handleCloseForm();
  };

  const {
    container,
    card,
    heading,
    formControl,
    label,
    input,
    btnContainer,
    cancel,
    confirm,
  } = signupClassNames;
  return isSignupFormOpen ? (
    <div className={container}>
      <div className={card}>
        <h2 className={heading}>Sign up</h2>
        <form>
          <div className={formControl}>
            <label htmlFor="email" className={label}>
              Email
            </label>
            <input
              ref={emailRef}
              type="email"
              className={input}
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className={formControl}>
            <label htmlFor="password" className={label}>
              Password
            </label>
            <input
              ref={passwordRef}
              type="password"
              className={input}
              id="password"
              placeholder="Enter your password"
            />
          </div>
          <div className={btnContainer}>
            <span onClick={handleCloseForm} className={cancel}>
              Cancel
            </span>
            <button
              disabled={isFormSubmitting}
              onClick={signupHandler}
              className={confirm}
              type="button"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default SignUp;
