import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import gameCardClassNames from "./gameCardClassNames";

interface GameCardProps {
  gameName: string;
  imageUrl: string;
  slug: string;
  price: number;
}

const GameCard: FC<GameCardProps> = (props) => {
  const { containerClass, imageClass, priceClass, gameNameClass } =
    gameCardClassNames;
  const { gameName, imageUrl, slug, price } = props;
  return (
    <Link href={`/games/${slug}`} className={containerClass}>
      <h3 className={priceClass}>$ {price}</h3>
      <Image
        className={imageClass}
        src={imageUrl}
        alt={gameName}
        width={200}
        height={200}
      />
      <div className={gameNameClass}>{gameName}</div>
    </Link>
  );
};

export default GameCard;
