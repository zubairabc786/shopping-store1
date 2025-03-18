import { ShoppingCart } from "lucide-react";
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
import { setCart } from "../redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";

const CartSidebar = () => {
  const { cart } = useSelector((state) => state.auth);
  // console.log("cart=", cart);
  const dispatch = useDispatch();
  const removeItem = (id) => {
    const updateCart = cart.filter((item) => item.product.id !== id);
    dispatch(setCart(updateCart));
  };

  const updateQuantity = (id, qty) => {
    const update = cart.map((item) => {
      if (item.product.id === id) {
        return { ...item, quantity: qty };
      }
      return item;
    });
    dispatch(setCart(update));
  };

  const incrementQuantity = (id) => {
    const update = cart.map((item) => {
      if (item.product.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    dispatch(setCart(update));
  };

  const decrementQuantity = (id) => {
    const update = cart.map((item) => {
      if (item.product.id === id) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    dispatch(setCart(update));
  };

  const totalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  if (cart.length > 0) {
    return (
      <Sheet>
        <SheetTrigger className="mt-2">
          <ShoppingCart size={20} className=" cursor-pointer" />
        </SheetTrigger>
        <SheetContent className="bg-white">
          <SheetHeader>
            <SheetTitle className="font-bold text-center text-redDark">
              Shopping Cart
            </SheetTitle>
            <SheetDescription>
              <ScrollArea className="h-96  rounded-md border-2">
                <div className="flex flex-col gap-4">
                  {cart?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center hover:bg-gray-100 px-1 py-1 gap-1 "
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-1 ">
                          <div className="w-[25%] ">
                            <img
                              className=" aspect-square object-cover"
                              src={item?.product?.images?.[0]}
                              alt="product image"
                            />
                          </div>
                          <div className="flex flex-col gap-3">
                            <span className="font-bold  text-sm text-gray-900 ">
                              {item?.product.name}
                            </span>
                            <span className=" font-semibold text-sm text-gray-900">
                              ${item.product.price * item.quantity}
                            </span>
                            <span
                              className="cursor-pointer font-semibold hover:text-redLight text-gray-900 text-xs"
                              onClick={() => removeItem(item.product.id)}
                            >
                              Remove
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-center items-center   ">
                          <button
                            onClick={(e) => incrementQuantity(item.product.id)}
                            className="cursor-pointer text-white text-2xl font-bold w-8 h-8 bg-redLight rounded-full"
                          >
                            +
                          </button>
                          <input
                            type="text"
                            className="mx-2 border text-center h-10 w-16"
                            value={item.quantity}
                            disabled={1}
                            onChange={(e) =>
                              updateQuantity(
                                item.product.id,
                                parseInt(e.target.value)
                              )
                            }
                          />

                          <button
                            disabled={item.quantity <= 0}
                            onClick={(e) => decrementQuantity(item.product.id)}
                            className=" text-center cursor-pointer text-2xl text-white font-bold w-8 h-8 bg-redLight rounded-full"
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <ScrollBar className="bg-gray-900 scroll-m-1 w-4" />
              </ScrollArea>
            </SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <div className="w-full flex flex-col items-center justify-center gap-3 ">
              <div className="mt-4 text-lg text-[#000000] font-semibold static">
                Subtotal:-<span className="text-redLight">{totalPrice()} </span>
              </div>
              <SheetClose asChild>
                <Link
                  href="/addtocart"
                  className=" text-white bg-blueLight hover:bg-blueDark focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Go To CheckOut
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/"
                  className="focus:outline-none text-white bg-redLight hover:bg-redDark focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Return To Shoping
                </Link>
              </SheetClose>
            </div>
            <div className="flex flex-col gap-3"></div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  } else {
    return (
      <Sheet>
        <SheetTrigger className="mt-2">
          <ShoppingCart size={20} className="" />
        </SheetTrigger>
        <SheetContent className="bg-white">
          <SheetHeader>
            <SheetTitle className="font-bold font-roboto">
              Shoping Cart
            </SheetTitle>
            <SheetDescription>
              <div className="flex items-center justify-center h-96 bg-gray-100">
                <div className="p-6 max-w-lg text-center">
                  <div className="flex items-center justify-center">
                    <ShoppingCart size={120} />
                  </div>
                  <p className="text-xl text-gray-600 mb-6">
                    No Product in the cart
                  </p>
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <div className="w-full flex flex-col items-center justify-center gap-3 mt-4">
              <SheetClose asChild>
                <Link
                  href="/"
                  className="bg-red-600 px-7 py-3 text-white text-xl rounded-md"
                >
                  Return To Shoping
                </Link>
              </SheetClose>
            </div>
            <div className="flex flex-col gap-3"></div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }
};

export default CartSidebar;
