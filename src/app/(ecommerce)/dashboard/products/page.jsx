import React from "react";
import ProductList from "../../../../components/ProductList";
import prisma from "../../../../utils/connection";
import { getSession } from "../../../../utils/action";
import { redirect } from "next/navigation";

const Products = async ({ searchParams }) => {
  const session = await getSession();
  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }
  let page = searchParams?.page || 1;
  let ITEM_PER_PAGE = 10;

  const productList = await prisma?.product?.findMany({
    take: ITEM_PER_PAGE,
    skip: ITEM_PER_PAGE * (page - 1),
  });
  const count = await prisma?.product?.count();
  // console.log("count=", count);
  return (
    <div className="w-full flex flex-col min-h-screen mx-2 ">
      <ProductList productList={productList} count={count} />
    </div>
  );
};

export default Products;
