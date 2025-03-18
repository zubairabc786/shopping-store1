"use server";

import { getSession } from "../utils/action";
import prisma from "../utils/connection";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const createOrder = async (formData, cart, provinceValue, cityValue) => {
  // console.log("carts=", cart);
  const session = await getSession();
  if (!session.isLoggedIn) {
    return { error: "User not found" };
  }

  const address = formData.get("address");
  // const state = formData.get("state");
  const state = provinceValue;
  const city = cityValue;
  const country = formData.get("country");
  const pinCode = parseInt(formData.get("pinCode"));
  const PhoneNo = parseInt(formData.get("phoneNo"));
  console.log("state=", state);
  console.log("Address=", address);
  if (!address || !state || !city || !country || !pinCode || !PhoneNo) {
    return { error: "please fill all fields" };
  }

  let shipppingPrice = cart[0].shipPrice || 0;
  // console.log("shippingPrice=", shipppingPrice);
  // console.log("shippingPrice=", typeof shipppingPrice);

  const totalPrice = cart?.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  let total;
  if (shipppingPrice) {
    total = totalPrice + shipppingPrice;
  } else {
    total = totalPrice;
  }
  // console.log("total=", total);

  try {
    const cartDetails = cart?.map((item) => {
      return {
        productId: item.product.id,
        quantity: item.quantity,
      };
    });

    const order = await prisma.order.create({
      data: {
        shipppingPrice,
        total,
        addressInfo: {
          create: { address, state, city, country, pinCode, PhoneNo },
        },
        OrderItem: {
          create: cartDetails,
        },
      },
    });

    if (!order) {
      return { error: "order not created" };
    }

    const transformedItem = [
      ...cart.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.name,
          },
          unit_amount: item.product.price * 100,
        },
        quantity: item.quantity,
      })),
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Shipping",
          },
          unit_amount: shipppingPrice * 100,
        },
        quantity: 1,
      },
    ];

    // console.log("TransformedItem=", transformedItem);

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: transformedItem,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/success/${order.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/cancel`,
    });

    return { result: stripeSession.url };
  } catch (error) {
    return { error: "order not created" };
  }
};
//create order end

//update order start
export const updateOrder = async (orderItemId, id, shipPrice) => {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return { error: "User not found" };
  }
  let shipppingPrice = shipPrice || 0;
  try {
    const transformedItem = [
      ...orderItemId.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.name,
          },
          unit_amount: item.product.price * 100,
        },
        quantity: item.quantity,
      })),
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Shipping",
          },
          unit_amount: shipppingPrice * 100,
        },
        quantity: 1,
      },
    ];

    // console.log("TransformedItem=", transformedItem);

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: transformedItem,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/success/${id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/cancel`,
    });

    return { result: stripeSession.url };
  } catch (error) {
    return { error: "order not created" };
  }
};

//update order end
export const confirmOrder = async (id) => {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return { error: "User not found" };
  }

  let order;
  try {
    order = await prisma.order.update({
      where: { id },
      data: { isPaid: true, status: "complete" },
    });
    if (!order) {
      return { error: "order not updated" };
    }
  } catch (error) {
    return { error: "order not updated" };
  }
  return { result: order };
};
