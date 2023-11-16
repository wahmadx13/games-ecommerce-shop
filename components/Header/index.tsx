import headerClassNames from "./headerClassNames";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

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
  return (
    <header className={header}>
      <div className={container}>
        <Link href="/" className={logoContainer}>
          <h1 className={logo}>Logo</h1>
        </Link>
        <nav className={nav}>
          <ul className={ul}>
            <li className={li}>
              <button className={link}>
                <span>
                  Cart
                  <AiOutlineShoppingCart className="inline-block text-3xl" />
                </span>
                <div className={cart}>10</div>
              </button>
            </li>
            <li className="flex items-center justify-center h-7">
              <Link href="/orders" className={orders}>
                Orders
              </Link>
              <button className={logoutBtn}>Logout</button>
              <button className={signupBtn}>Sign Up</button>
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
  );
};

export default Header;
