"use client";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import CarouselSlider from "@/components/CarouselSlider";
import { getGame } from "@/libs/api";
import gameDetailsClassNames from "./gameDetailsClassNames";

// eslint-disable-next-line @next/next/no-async-client-component
const GameItem = async (props: { params: { slug: string } }) => {
  const {
    params: { slug },
  } = props;

  const {
    container,
    carousel,
    previousButton,
    nextButton,
    productInfo,
    descriptionClass,
    nameClass,
    priceClass,
    cartPrice,
    addToCardButton,
    cartContainer,
    quantityInput,
    button,
    disabledButton,
  } = gameDetailsClassNames;
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const gameDetails = await getGame(slug);

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setPrice(Number(((quantity - 1) * gameDetails.price).toFixed(2)));
    }
  };

  const handleIncrease = () => {
    if (quantity < gameDetails.quantity) {
      setQuantity(quantity + 1);
      setPrice(Number(((quantity + 1) * gameDetails.price).toFixed(2)));
    }
  };

  return (
    <div>
      <CarouselSlider images={gameDetails.images} />
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
            <button
              onClick={handleIncrease}
              className={`${button} ${
                quantity === gameDetails.quantity && disabledButton
              }`}
              disabled={quantity === 0}
            >
              +
            </button>
            <div className={cartPrice}>{price}</div>
            <button
              className={`${button} ${quantity === 0 && disabledButton}`}
              disabled={quantity === 0}
            >
              <FaShoppingCart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameItem;
