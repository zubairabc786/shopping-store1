"use client";

import React from "react";
import Navbar from "../components/AnnouncementBar/topNavbar";
import Link from "next/link";
import CartSidebar from "../components/CartSidebar";

import { cn } from "../lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../components/ui/navigation-menu";
import { logout } from "../utils/action";
import SearchInput from "./SearchInput";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";

import { Heart, LayoutDashboard } from "lucide-react";
import { useSelector } from "react-redux";
import CategoryForMobile from "../components/CategoryForMobile";
import dynamic from "next/dynamic";

const Header = ({ categories, session }) => {
  const { cart } = useSelector((state) => state.auth);
  // console.log(session);

  return (
    <div>
      <Navbar />

      <div className=" flex flex-row justify-between items-center h-24 px-[5%]">
        <Link href="/" className="order-2 md:-order-1 flex-shrink-0">
          <img
            src="/logo9.png"
            alt="Home Page"
            className="h-16 sm:h-20 md:order-1 md:h-24"
          />
        </Link>
        <div className=" order-3 flex font-bold   items-center gap-5">
          <Link href="/" className=" hidden md:flex hover:text-redLight ">
            Home
          </Link>
          <Link href="/aboutus" className="hidden md:flex hover:text-redLight">
            About
          </Link>
          <Link
            href="/contactus"
            className="hidden md:flex hover:text-redLight"
          >
            Contact
          </Link>
          <div className="">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="hidden md:flex font-bold hover:text-redLight">
                    Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className=" grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {categories?.map((component) => (
                        <ListItem
                          key={component.id}
                          title={component.name}
                          href={`/products?cat=${component.id}`}
                          image={component.image}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <SearchInput />
        </div>
        <div className=" order-4 flex items-center gap-6 ">
          {/* <div className="flex items-center justify-center md:w-14 md:h-14 md:rounded-full md:border-2 md:border-redLight"> */}
          <Link href="/wishlist" className="hidden md:block ">
            <Heart size={20} className="" />
          </Link>
          {/* </div> */}
          {/* <Link href="/addtocart" className="relative"> */}
          {/* <div className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-redLight"> */}
          <div className="relative ">
            <CartSidebar />
            {cart?.length >= 1 ? (
              <span className="absolute -top-1 -right-3 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cart?.length}
              </span>
            ) : null}
            {/* </div> */}
          </div>
          {/* </Link> */}
          {session?.isLoggedIn ? (
            <Popover className="">
              <PopoverTrigger asChild>
                <Avatar className="hidden md:block cursor-pointer w-14 h-14 aspect-square object-cover">
                  <AvatarImage
                    src={session?.user?.image}
                    alt={session?.user?.name}
                  />
                  <AvatarFallback>
                    {session?.user?.name?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-60 bg-white">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">
                      {session?.user?.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {session?.user?.email}
                    </p>
                    <Separator className="my-4" />
                    {session?.user?.role === "ADMIN" ? (
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2"
                      >
                        <LayoutDashboard size={20} /> <span>Dashboard</span>
                      </Link>
                    ) : null}
                    <Separator className="my-4" />
                    <form action={logout}>
                      <button className="cursor-pointer border-none outline-none flex items-center gap-2">
                        Logout
                      </button>
                    </form>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <Link href="/login">Login</Link>
          )}
          {/* User Detail End */}
        </div>
        <div>
          <CategoryForMobile categories={categories} />
          {/* <Menu className="order-1 md:hidden" /> */}
        </div>
      </div>
    </div>
  );
};

// export default Header;
export default dynamic(() => Promise.resolve(Header), { ssr: false });

export const ListItem = React.forwardRef(
  ({ className, title, children, image, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none flex items-center gap-4">
              <img
                src={image}
                alt=""
                className="h-12 w-12 object-cover aspect-square"
              />
              <h2>{title} </h2>
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
