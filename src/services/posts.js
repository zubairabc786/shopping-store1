"use server";
import { revalidatePath } from "next/cache";
import { getSession } from "../utils/action";
import prisma from "../utils/connection";
import { redirect } from "next/navigation";

export const addUpdatePost = async (formData, images, categoryId, id) => {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return { error: "user not logged in" };
  }
  const name = formData.get("name");
  const description = formData.get("description");
  const price = parseInt(formData.get("price"));
  const sku = formData.get("sku");
  const stock = parseInt(formData.get("stock"));
  const weight = parseInt(formData.get("weight"));

  if (
    !name ||
    !description ||
    !price ||
    !images ||
    !sku ||
    !stock ||
    !weight ||
    !categoryId
  ) {
    return { error: "Fill all fields" };
  }

  const imageList =
    images.length && !id ? images?.map(({ url }) => url) : images;

  let product;

  // console.log(name, price, description, images, categoryId, id);
  console.log(id);

  try {
    if (id) {
      product = await prisma.product.update({
        where: { id },
        data: {
          name,
          description,
          price,
          sku,
          stock,
          weight,
          images: imageList,
          categoryId,
        },
      });
    } else {
      product = await prisma.product.create({
        data: {
          name,
          description,
          price,
          sku,
          stock,
          weight,
          images: imageList,
          categoryId,
        },
      });
    }

    if (!product) {
      return { error: "Product Not Created" };
    }
  } catch (error) {
    return { error: "Product Not Created" };
  }

  revalidatePath("/dashboard/products");
  console.log(product);
  return { result: product };
};

// Update Product Views
export const updateProductViews = async (id) => {
  if (!id) {
    return { error: "Product not found" };
  }
  let product;
  try {
    product = await prisma.product.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
  } catch (error) {
    return { error: "product views not updated" };
  }

  redirect(`/products/${product?.id}`);
};

//Favorite Product
export const addFavorite = async (productId) => {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return { error: "User not found" };
  }

  let fav;
  try {
    const favorite = await prisma.favorite.findMany({
      where: { userId: session.user.id, productId },
    });
    console.log(session.user.id, productId, "fav");

    if (!favorite.length) {
      fav = await prisma.favorite.create({
        data: { userId: session.user.id, productId },
      });
      revalidatePath("/wishlist");
      return { result: fav };
    } else {
      return { error: "already added in favorite" };
    }
  } catch (error) {
    return { error: "already added in favorite" };
  }
};
