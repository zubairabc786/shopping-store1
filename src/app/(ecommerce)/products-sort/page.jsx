import { Star } from "lucide-react";
import prisma from "../../../utils/connection";
import AddToCart from "../../../components/AddToCart";
import Pagination from "../../../components/Pagination";
import Link from "next/link";
import MinInput from "../../../components/MInInput";
import MaxInput from "../../../components/MaxInput";
import Favorite from "../../../components/Favorite";
import EyeItem from "../../../components/EyeItem";

const Productsort = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const min = parseFloat(searchParams?.min) || 1;
  const max = parseFloat(searchParams?.max) || 1;
  let page = searchParams?.page || 1;
  // console.log("q=", q);
  let count;
  const ITEM_PER_PAGE = 12;

  let result;
  ////////Count Total Products By Name
  count = await prisma?.product?.findMany();
  /////////////Searching Code Start

  if (min !== max) {
    result = await prisma?.product?.findMany({
      where: {
        name: {
          contains: searchParams?.q,
        },
        price: {
          gte: min,
          lte: max,
        },
      },
      orderBy: { price: "asc" },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
    });
  } else if (searchParams.sort === "hightolow") {
    result = await prisma?.product?.findMany({
      where: {
        name: {
          contains: searchParams?.q,
        },
      },
      orderBy: { price: "desc" },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
    });
  } else if (searchParams.sort === "lowtohigh") {
    result = await prisma?.product?.findMany({
      where: {
        name: {
          contains: searchParams?.q,
        },
      },
      orderBy: { price: "asc" },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
    });
  } else if (searchParams.sort === "ascending-order") {
    result = await prisma?.product?.findMany({
      where: {
        name: {
          contains: searchParams?.q,
        },
      },
      orderBy: { name: "asc" },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
    });
  } else if (searchParams.sort === "descending-order") {
    result = await prisma?.product?.findMany({
      where: {
        name: {
          contains: searchParams?.q,
        },
      },
      orderBy: { name: "desc" },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
    });
  } else {
    result = await prisma?.product?.findMany({
      where: {
        name: {
          contains: searchParams?.q,
        },
      },

      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
    });
  }

  ///////Searching code End.

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 items-center gap-6 px-[5%] mt-8 text-center">
        {/* Searching Code Start */}
        {/* <div className="flex gap-2"> */}
        <MinInput />
        <MaxInput />
        {/* </div> */}
        <Link
          href="/products-sort?sort=lowtohigh"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Low To High
        </Link>
        <Link
          href="/products-sort?sort=hightolow"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          High To Low
        </Link>
        <Link
          href="/products-sort?sort=ascending-order"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Ascending
        </Link>
        <Link
          href="/products-sort?sort=descending-order"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Descending
        </Link>
      </div>
      {/* Searching Code Start */}

      <div className="px-[10%]  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-center flex-wrap py-[3%] gap-x-10 gap-y-20">
        {result.map((item, index) => (
          <div className=" relative   " key={index}>
            <Link href={`/products/${item?.product?.id || item?.id}`}>
              <img
                src={item.images[0]}
                alt=" Object image"
                className="aspect-square object-cover w-full"
              />
            </Link>
            <AddToCart product={item?.product || item}>
              <div className=" bottom-0 bg-gray-300 hover:bg-black  hover:text-white text-center text-sm  p-2 cursor-pointer">
                Add to Cart
              </div>
            </AddToCart>
            <div className="absolute top-3 right-6">
              <Favorite id={item?.product?.id || item?.id} />
            </div>
            <div className="absolute top-14 right-6">
              <EyeItem id={item?.product?.id || item?.id} />
            </div>
            <p className="text-base ">{item.name}</p>
            <div className="flex gap-4">
              <span className="text-red-500">${item.price - 100}</span>
              <span className="line-through">${item.price}</span>
              <span className="">
                Stock:-<span className="text-red-600">{item.stock}</span>
              </span>
            </div>
            <div className="flex items-center  gap-2">
              <Star
                size={15}
                className="text-yellow-400"
                fill="rgb(250 204 21)"
              />
              <p className="ms-2 text-sm font-bold text-gray-900">4.59</p>
              <div className="texts font-medium text-gray-900  hover:no-underline ml-8">
                views:-{" "}
                <span className="text-red-600">
                  {item?.views || item?.product?.views}{" "}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center ">
        <Pagination count={count.length} />
      </div>
    </>
  );
};

export default Productsort;

export function generateMetadata() {
  return {
    title: "Products Page for online shopping",
  };
}
