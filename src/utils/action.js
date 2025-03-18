"use server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { defaultSession, sessionOptions } from "./lib";
import bcrypt from "bcryptjs";
import sendEmail from "../services/sendEmail";
import prisma from "./connection";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

function generateToken(length) {
  let result = "";
  const charactorLength = process.env.NEXT_PUBLIC_CHARACTERS.length;

  for (let i = 0; i < length; i++) {
    result += process.env.NEXT_PUBLIC_CHARACTERS.charAt(
      Math.floor(Math.random() * charactorLength)
    );
  }
  return result;
}

let token = generateToken(32);

export const getSession = async () => {
  const session = await getIronSession(cookies(), sessionOptions);
  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }
  return session;
};

let hashedPassword;

////////////////Register Function

export const register = async (formData, image) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (password.length > 25) {
    return { error: "password must be min 8 char long" };
  }

  hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma?.user?.findUnique({
    where: { email },
  });

  if (user && user.emailVerified) {
    return { error: "user already exist!" };
  }
  console.log(name, email, token);

  const newUser = await prisma?.user.upsert({
    where: { email },
    update: { token },
    create: { name, email, password: hashedPassword, token, image },
  });

  if (newUser) {
    await sendEmail(
      newUser.email,
      "Email Verification",
      `<p>Welcome to Perfect Developer, This is your email verificaiton token. Click here to verify your email! http://localhost:3000/verify/${token}</p>`
    );
    return { message: "Verify Your Email" };
  } else {
    return { error: "Something went wrong" };
  }
};

///////// end register function

// verification email
export const emailVerify = async (getToken) => {
  if (getToken) {
    const getUser = await prisma?.user?.findUnique({
      where: {
        token: getToken,
      },
    });
    console.log(getUser);
    if (getUser) {
      const user = await prisma?.user?.update({
        where: { id: getUser.id },
        data: { emailVerified: true },
      });
      if (user) {
        redirect("/login");
      }
    } else {
      return {
        error: "Token expired",
      };
    }
  }
};

/////////////////Login Function
export const login = async (formData) => {
  const session = await getSession();
  const email = formData.get("email");
  const password = formData.get("password");

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { error: "Sorry this user not exist" };
  }

  const isMatch = await bcrypt.compare(password, user?.password);
  if (!isMatch) {
    return { error: "Password not matched" };
  }

  session.user = user;
  session.isLoggedIn = true;
  await session.save();
  redirect("/");
};

////////////////Logout Function

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/login");
};
/////////////////////// DeleteFunction
export const deleteFunction = async ({ id, table }) => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return { error: "user not found" };
  }

  let item;
  try {
    item = await prisma[table].delete({
      where: { id },
    });
    if (!item) {
      return { error: `${table} not deleted` };
    }
  } catch (error) {
    if (!item) {
      return { error: `${table} not deleted` };
    }
  }

  revalidatePath(
    `/dashboard/${table == "category" ? "categories" : `${table}s`}`
  );
  return { result: item };
};

/////////////// Sort Categories by order

export const SortCategories = async (sort) => {
  console.log("sortf=", sort);
  return { sort: "hightolow", orderBy: { price: "asc" } };
};

////////////////// Update Stock of Product
export const updateStock = async (cart) => {
  // console.log("Id=", cart[0].product.id);
  // console.log("Cart=", cart[0].quantity);

  for (const item of cart) {
    const product = await prisma?.product?.findUnique({
      where: { id: item?.product?.id },
    });
    console.log("Product=", product);

    if (product && product.stock >= item.quantity) {
      await prisma?.product?.update({
        where: { id: item?.product?.id },
        data: { stock: product.stock - item.quantity },
      });
    } else {
      return {
        message: `Insufficient stock for product ID ${item?.product?.id}`,
      };
    }
  }
};
