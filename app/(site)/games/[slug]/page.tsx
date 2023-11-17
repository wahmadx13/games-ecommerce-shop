import CarouselSlider from "@/components/CarouselSlider";
import { getGame } from "@/libs/api";

const GameItem = async (props: { params: { slug: string } }) => {
  const {
    params: { slug },
  } = props;
  const gameDetails = await getGame(slug);
  return (
    <div>
      <CarouselSlider images={gameDetails.images} />
    </div>
  );
};

export default GameItem;
