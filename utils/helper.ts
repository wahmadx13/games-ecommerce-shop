import { NextResponse } from "next/server";
import sanityClient from "@/libs/sanity";
import { Game, GameSubset } from "@/types/game";
import { updateGameQuantity } from "@/libs/api";

export async function fetchAndCalculateItemPriceAndQuantity(cartItems: Game[]) {
  const query = `*[_type == "game" && _id in $itemIds] {
        _id,
        name,
        price,
        quantity,
        images,
    }`;

  try {
    const itemIds = cartItems.map((item) => item._id);
    const sanityItems: GameSubset[] = await sanityClient.fetch({
      query,
      params: { itemIds },
    });

    const updatedItems: GameSubset[] = sanityItems.map((item) => ({
      ...item,
      maxQuantity: item.quantity,
    }));

    if (checkQuantity(cartItems, updatedItems)) {
      return new NextResponse(
        "Quantity has been updated, please update your cart",
        { status: 500 },
      );
    }

    const itemPrice: GameSubset[] = updatedItems.map((item) => {
      const cartItem = cartItems.find((cartItem) => cartItem._id === item._id);
      return {
        _id: item._id,
        name: item.name,
        price: item.price,
        images: item.images,
        maxQuantity: item.quantity,
        quantity: cartItem?.quantity as number,
      };
    });

    return itemPrice;
  } catch (error) {
    return new NextResponse(
      "Quantity has been updated, please update your cart",
      { status: 500 },
    );
  }
}

export function checkQuantity(cartItems: Game[], sanityItems: GameSubset[]) {
  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const sanityItem = sanityItems[i];

    if (cartItem.quantity <= sanityItem.quantity) return false;
  }
  return true;
}
