"use clent";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import FormInput from "./FormInput";
import FormSubmit from "./FormSubmit";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { createOrder } from "../services/orders";
import { toast } from "./ui/use-toast";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/slice/cartSlice";
import { updateStock } from "../utils/action";

const AddAddress = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cart } = useSelector((state) => state.auth);

  const submit = async (formData) => {
    const response = await createOrder(formData, cart);
    if (response.error) {
      toast({ title: response.error });
    } else {
      router.push(response.result);
    }
    dispatch(clearCart());
    await updateStock(cart);
  };

  return (
    <Sheet>
      <SheetTrigger className="pl-10">Checkout</SheetTrigger>
      <SheetContent className="bg-white">
        <SheetHeader>
          <SheetTitle>Address</SheetTitle>
          <SheetDescription>
            <form action={submit} className="bg-white flex flex-col gap-4">
              <FormInput
                id="address"
                label="Address"
                placeholder="Enter address"
                type="text"
                className="h-10"
              />
              <FormInput
                id="state"
                label="State"
                placeholder="Enter state"
                type="text"
                className="h-10"
              />
              <FormInput
                id="city"
                label="City"
                placeholder="Enter the city"
                type="text"
                className="h-10"
              />
              <FormInput
                id="country"
                label="Country"
                placeholder="Enter country"
                type="text"
                className="h-10"
              />
              <FormInput
                id="pinCode"
                label="Pin code"
                placeholder="Enter the pin code"
                type="number"
                className="h-10"
              />
              <FormInput
                id="phoneNo"
                label="Phone number"
                placeholder="Enter Phone number"
                type="number"
                className="h-10"
              />
              <FormSubmit className="mt-3 w-full bg-red-500  text-white h-12 hover:bg-red-400">
                Create
              </FormSubmit>
            </form>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default AddAddress;
