import { getGame } from "@/libs/api";
import { gameDetailServerClassNames } from "./gameDetailsClassNames";

const GameDetailsServer = async (props: { slug: string }) => {
  const { slug } = props;
  const gameDetails = await getGame(slug);
  const { nameClass, priceClass, descriptionClass } =
    gameDetailServerClassNames;
  return (
    <>
      <h2 className={nameClass}>{gameDetails.name}</h2>
      <p className={priceClass}>${gameDetails.price}</p>
      <h2 className={descriptionClass}>{gameDetails.description}</h2>
    </>
  );
};

export default GameDetailsServer;
