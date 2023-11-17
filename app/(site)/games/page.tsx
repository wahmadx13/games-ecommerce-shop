import { NextPage } from "next";
import { getGames } from "@/libs/api";
import HeroSection from "@/components/HeroSection";
import gamesClassNames from "./gamesClassNames";
import GameCard from "@/components/GameCard";

const Games: NextPage = async (props) => {
  const games = await getGames();
  const { sectionClass, heading, subHeading } = gamesClassNames;
  return (
    <div>
      <HeroSection />
      <section className={sectionClass}>
        <h2 className={heading}>Games</h2>
        <p className={subHeading}>Checkout our latest collection of games</p>
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
    </div>
  );
};

export default Games;
