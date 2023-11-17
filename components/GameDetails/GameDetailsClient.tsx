"use client";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Game } from "@/types/game";
import CarouselSlider from "@/components/CarouselSlider";
import { getGame } from "@/libs/api";
import { gameDetailsClientClassNames } from "./gameDetailsClassNames";

const {
  container,
  carousel,
  previousButton,
  nextButton,
  productInfo,
  cartPrice,
  addToCardButton,
  cartContainer,
  quantityInput,
  button,
  disabledButton,
} = gameDetailsClientClassNames;

const GameDetailsClient = (props: {
  slug: string;
  children: React.ReactNode;
}) => {
  const { slug, children } = props;

  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [gameDetails, setGameDetails] = useState<Game>();

  useEffect(() => {
    const fetchGameDetails = async () => {
      const game = await getGame(slug);
      setGameDetails(game);
    };

    fetchGameDetails();
  }, [slug]);

  const handleDecrease = () => {
    if (!gameDetails) return;
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setPrice(Number(((quantity - 1) * gameDetails.price).toFixed(2)));
    }
  };

  const handleIncrease = () => {
    if (!gameDetails) return;
    if (quantity < gameDetails.quantity) {
      setQuantity(quantity + 1);
      setPrice(Number(((quantity + 1) * gameDetails.price).toFixed(2)));
    }
  };

  return (
    <div>
      {gameDetails && <CarouselSlider images={gameDetails.images} />}
      <div className={container}>
        <div className={productInfo}>
          <div className={cartContainer}>
            <button
              onClick={handleDecrease}
              className={`${button} ${quantity === 0 && disabledButton}`}
              disabled={quantity === 0}
            >
              -
            </button>
            <input
              type="text"
              className={quantityInput}
              value={quantity}
              readOnly
            />
            {gameDetails && (
              <button
                onClick={handleIncrease}
                className={`${button} ${
                  quantity === gameDetails.quantity && disabledButton
                }`}
                disabled={quantity === gameDetails.quantity}
              >
                +
              </button>
            )}
            <div className={cartPrice}>$ {price}</div>
            <button
              className={`${button} ${quantity === 0 && disabledButton}`}
              disabled={quantity === 0}
            >
              <FaShoppingCart />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default GameDetailsClient;
