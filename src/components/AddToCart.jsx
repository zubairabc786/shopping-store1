"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../redux/slice/cartSlice";
import { toast } from "./ui/use-toast";

const AddToCart = ({ children, product }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.auth);

  // console.log("cart=", cart);

  const submit = () => {
    const existingItemIndex = cart.findIndex(
      (item) => item.product.id === product.id
    );
    // console.log("existingItemIndex=", existingItemIndex);
    if (existingItemIndex !== -1) {
      const updatedCart = cart.map((item, index) => {
        if (index === existingItemIndex) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      dispatch(setCart(updatedCart));
      toast({ variant: "default", title: "item already exist" });
    } else {
      dispatch(setCart([...cart, { product, quantity: 1 }]));
      toast({ variant: "default", title: "Add to cart successfully" });
    }
  };
  return (
    <div className="w-full " onClick={submit}>
      {children}
    </div>
  );
};

export default AddToCart;
