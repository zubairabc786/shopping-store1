import React from "react";
import Title from "../components/Title";
import Favorite from "../components/Favorite";
import EyeItems from "../components/EyeItem";
import AddToCart from "../components/AddToCart";
import { Star } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const Fashsales = ({ title, heading, products }) => {
  // console.log("product=", products);
  return (
    <div className="  mt-10 bg-white">
      <Title title={title} heading={heading} />
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 px-[2%]  items-center justify-center flex-wrap py-[1%] gap-x-10 gap-y-20">
        {products.map((item, index) => (
          <div className=" relative bordr-[1px] border-gray-600" key={index}>
            <Link href={`/products/${item?.product?.id || item?.id}`}>
              <img
                src={item?.product?.images?.[0] || item?.images?.[0]}
                alt="Fash Sales"
                className="w-full  aspect-square object-cover"
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
              <EyeItems id={item?.product?.id || item?.id} />
            </div>
            <p className="text-base ">{item?.product?.name || item?.name}</p>
            <div className="flex gap-4">
              <span className="text-red-500">
                ${item?.product?.price - 100 || item?.price - 100}
              </span>
              <span className="line-through">
                ${item?.product?.price || item?.price}
              </span>
              <span className="">
                Stock:-
                <span className="text-red-600">
                  {item?.product?.stock || item?.stock}
                </span>
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
      <Link href="/products-sort" className="flex justify-center my-10 ">
        <Button className="bg-redDark text-white p-6 hover:bg-redLight">
          View All Products
        </Button>
      </Link>
    </div>
  );
};

export default Fashsales;
