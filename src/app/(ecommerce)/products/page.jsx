import { Star } from "lucide-react";
import prisma from "../../../utils/connection";
import AddToCart from "../../../components/AddToCart";
import Pagination from "../../../components/Pagination";
import SearchButtonComponent from "../../../components/SearchButtonComponent";
import { notFound } from "next/navigation";

const Products = async ({ searchParams }) => {
  const p = searchParams?.p || "";
  const obj1 = p ? JSON.parse(p) : {};
  // console.log("p===", p);
  // console.log("obj1===", obj1);
  let page = searchParams?.page || 1;

  const ITEM_PER_PAGE = 10;

  let result;
  if (searchParams.cat.length === 24) {
    result = await prisma?.product?.findMany({
      where: {
        categoryId: searchParams.cat,
        name: {
          contains: searchParams?.q,
        },
      },
      orderBy: obj1,
    });
  } else if (searchParams.cat.length !== 24) {
    return notFound();
  }

  return (
    <>
      <div className="flex items-center gap-8 px-[5%] mt-8 ">
        <SearchButtonComponent />
      </div>

      <div className="px-[10%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-center flex-wrap py-[3%] gap-8">
        {result.map((item, index) => (
          <div key={index}>
            <div>
              <img
                src={item.images[0]}
                alt="Product Name"
                className="w-full aspect-square object-cover h-64"
              />
            </div>
            <AddToCart product={item?.product || item}>
              <div className=" bottom-0 bg-gray-300 hover:bg-black  hover:text-white text-center text-sm  p-2 cursor-pointer">
                Add to Cart
              </div>
            </AddToCart>

            <p className="text-base ">{item.name}</p>
            <div className="flex gap-4">
              <span className="text-red-500">{item.price - 100}</span>
              <span className="line-through">{item.price}</span>
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
      <div className="flex justify-center items-center py-5 ">
        <Pagination count={result.length} />
      </div>
    </>
  );
};

export default Products;
