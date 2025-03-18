"use server";

import { revalidatePath } from "next/cache";
import prisma from "../utils/connection";

export const CreateCategory = async (formData, image, id) => {
  const name = formData.get("name");
  console.log(name, image);

  if (!name || !image) {
    return { error: "Please Fill All Fields" };
  }

  let category;
  try {
    if (id) {
      category = await prisma.category.update({
        where: { id },
        data: { name, image },
      });
    } else {
      category = await prisma.category.create({
        data: { name, image },
      });
    }

    if (!category) {
      return { error: `Category Not ${id ? "updated" : "created"}` };
    }
  } catch (error) {
    if (!category) {
      return { error: `Category Not ${id ? "updated" : "created"}` };
    }
  }
  revalidatePath("/dashboard/categories");
  return { result: category };
};

// Get All Categories
export const getCategories = async () => {
  let categories;
  try {
    categories = await prisma.category.findMany();
    if (!categories.length) {
      return { error: "Categories not found" };
    }
  } catch (error) {
    return { error: "Categories not found" };
  }
  revalidatePath("/dashboard/products");
  return { result: categories };
};
