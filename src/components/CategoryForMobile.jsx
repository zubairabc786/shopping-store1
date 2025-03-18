import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "../components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

const CategoryForMobile = ({ categories }) => {
  //   console.log("categoriesss=", categories);
  return (
    <div>
      <Sheet>
        <SheetTrigger className="mt-2" asChild>
          <Menu className="order-1 md:hidden cursor-pointer" />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
              <SheetClose asChild>
                <Link
                  href="/signup"
                  className="mt-5 text-white text-center sm:text-center md:text-center bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5  mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  SignUp
                </Link>
              </SheetClose>
              <Link
                href="/login"
                className="mt-5 text-white text-center sm:text-center md:text-center bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5  mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Login
              </Link>
              <SheetClose asChild>
                <Link
                  href="/aboutus"
                  className="mt-5 text-center sm:text-center md:text-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5  mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  About
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/contactus"
                  class="mt-5 text-center sm:text-center md:text-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5  mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Contact
                </Link>
              </SheetClose>
            </div>
            <SheetTitle className="font-bold">Categories</SheetTitle>
            <SheetDescription>
              <ScrollArea className="h-[430px]  rounded-md border-2">
                <div className="flex flex-col gap-4 h-[40px]">
                  {categories.map((item, index) => (
                    <Link
                      href={`/products?cat=${item.id}`}
                      key={index}
                      className="hover:bg-gray-100"
                    >
                      <SheetClose asChild>
                        <div className=" flex items-center gap-4" key={index}>
                          <img
                            src={item.image}
                            alt="Category Image"
                            className="aspect-square object-cover w-[25%] "
                          />
                          <p className="text-gray-900 font-bold">{item.name}</p>
                        </div>
                      </SheetClose>
                    </Link>
                  ))}
                </div>
                <ScrollBar className="bg-gray-900  w-4" />
              </ScrollArea>
            </SheetDescription>
          </SheetHeader>
          <SheetFooter>
            {/* <div className="w-full flex flex-col items-center justify-center gap-3 mt-4">
              <SheetClose asChild>
                <Link
                  href="/"
                  className="bg-red-600 px-5 py-3 text-white text-sm rounded-md"
                >
                  Return To Shoping
                </Link>
              </SheetClose>
            </div>
            <div className="flex flex-col gap-3"></div> */}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CategoryForMobile;
