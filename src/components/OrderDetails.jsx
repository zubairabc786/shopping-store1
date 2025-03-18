import React from "react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
import ImageList from "./ImageList";

const OrderDetails = ({ children, orderItems }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{children}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px] h-screen w-auto bg-white">
        <DialogHeader>
          <DialogTitle>{children}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-96  rounded-md border-2">
          {orderItems?.length
            ? orderItems?.map((item) => (
                <div className="grid grid-cols-[1fr_2fr]">
                  <ImageList images={item?.product?.images} />
                  <div className="p-2 flex flex-col justify-center">
                    <div className="flex justify-between items-center">
                      <p className="font-bold capitalize">
                        {item?.product?.name}
                      </p>
                      <p className="text-red-600">
                        <span className="text-black">Rs-</span>
                        {item?.product?.price}
                      </p>
                    </div>
                    <p>{item?.product?.description}</p>
                  </div>
                </div>
              ))
            : null}
          <ScrollBar className="bg-gray-900 scroll-m-1 w-4" />
        </ScrollArea>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4"></div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetails;
