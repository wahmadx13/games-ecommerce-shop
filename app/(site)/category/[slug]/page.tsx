import { NextPage } from "next";
import { getCategoriesGames } from "@/libs/api";
import { GameCategoryProps } from "@/types/categoriesPage";
import categoryPageClassNames from "./categoriesClassNames";
import NewsLetter from "@/components/NewsLetter";
import GameCard from "@/components/GameCard";

const GameCategory: NextPage<GameCategoryProps> = async (props: {
  params: { slug: string };
}) => {
  const {
    params: { slug },
  } = props;

  const games = await getCategoriesGames(slug);

  const {
    hero,
    heroContent,
    title,
    subtitle,
    author,
    authorAvatar,
    authorName,
    blogContentWrapper,
    blogImageWrapper,
    blogImage,
    blogMainContent,
    blogTitle,
    blogDate,
    blogText,
    section,
    heading,
    subHeading,
    latestButton,
  } = categoryPageClassNames;

  return (
    <>
      <section className={hero}>
        <div className={heroContent}>
          <div className="lg:w-3/4">
            <h1 className={title}>{slug.toLocaleUpperCase()}</h1>
            <p className={subtitle}>
              A short subtitle that provides more content about the game.
            </p>
          </div>
        </div>
      </section>
      <section className={section}>
        <h2 className={heading}>{slug.toUpperCase()}</h2>
        <p className={subHeading}>
          Checkout our latest collection of{" "}
          <span className="text-primary">{slug}</span> games
        </p>
        <div className="flex rounded gap-8 flex-wrap py-10">
          {games.map((game) => (
            <GameCard
              key={game._id}
              gameName={game.name}
              imageUrl={game.images[0].url}
              price={game.price}
              slug={game.slug.current}
            />
          ))}
        </div>
      </section>
      <NewsLetter />
    </>
  );
};

export default GameCategory;
