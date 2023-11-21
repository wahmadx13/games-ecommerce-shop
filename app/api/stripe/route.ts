import Stripe from "stripe";
import { NextResponse } from "next/server";
import { Game, GameSubset } from "@/types/game";
import { fetchAndCalculateItemPriceAndQuantity } from "@/utils/helper";
import { createOrder, updateGameQuantity } from "@/libs/api";

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request, res: Response) {
  const { cartItems, userEmail } = await req.json();
  const origin = req.headers.get("origin");

  const updatedItems: GameSubset[] =
    (await fetchAndCalculateItemPriceAndQuantity(cartItems)) as GameSubset[];

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: updatedItems.map((item) => ({
        quantity: item.quantity,
        adjustable_quantity: {
          enabled: true,
          maximum: item.maxQuantity,
          minimum: 1,
        },
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.images[0].url],
          },
          unit_amount: parseInt((item.price * 100).toString()),
        },
      })),
      payment_method_types: ["card"],
      billing_address_collection: "required",
      mode: "payment",
      success_url: `${origin}/?paid=true`,
      cancel_url: `${origin}/?paid=false`,
      phone_number_collection: { enabled: true },
    });

    await updateGameQuantity(updatedItems);

    await createOrder(updatedItems, userEmail);

    return NextResponse.json(session, {
      status: 200,
      statusText: "Payment Successful",
    });
  } catch (error: any) {
    console.log("Error", error);
    return new NextResponse(error, { status: 500 });
  }
}
