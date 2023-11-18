import { FC } from "react";
import signupClassNames from "./signupClassNames";
import { SignupProps } from "@/types/signupProps";

const SignUp: FC<SignupProps> = (props) => {
  const { isSignupFormOpen, toggleForm } = props;
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
              type="password"
              className={input}
              id="password"
              placeholder="Enter your password"
            />
          </div>
          <div className={btnContainer}>
            <span className={cancel}>Cancel</span>
            <button className={confirm} type="button">
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
