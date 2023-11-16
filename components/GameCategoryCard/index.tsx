import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import gameCategoryCardClassNames from "./GameCategoryClassNames";

interface GameCategoryCardProps {
  categoryImage: string;
  categoryName: string;
  slug: string;
}

const GameCategoryCard: FC<GameCategoryCardProps> = (props) => {
  const { categoryImage, categoryName, slug } = props;
  const { container, image, name, arrow } = gameCategoryCardClassNames;
  return (
    <Link href={`/category/${slug}`} className={container}>
      <Image
        className={image}
        src={categoryImage}
        alt={name}
        width={200}
        height={200}
      />
      <h3 className={name}>{categoryName}</h3>
      <Image
        className={arrow}
        src="/images/arrow.svg"
        alt={name}
        width={20}
        height={20}
      />
    </Link>
  );
};

export default GameCategoryCard;
