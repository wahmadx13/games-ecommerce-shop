import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";
import { Providers } from "@/redux/Providers";
import Cart from "@/components/Cart";

// const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["italic", "normal"],
  variable: "--font-poppins",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["italic", "normal"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Games Ecommerce Shop",
  description: "This is a shop where we sell and deliver games online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${montserrat.variable}`}>
      <body>
        <Providers>
          <Cart />
          <Header />
          <main className="bg-primary-gradient min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
