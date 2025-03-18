"use client";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../components/ui/dialog";

import { toast } from "./ui/use-toast";
import { deleteFunction } from "../utils/action";

const DeleteButton = ({ children, itemId, table }) => {
  const handleSubmit = async () => {
    const result = await deleteFunction({ id: itemId, table });
    if (result?.result) {
      toast({ title: "Product deleted successfully" });
    } else {
      toast({ title: result.error });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{children}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>{children}</DialogTitle>
          <DialogDescription>Do you want to delete this item</DialogDescription>
        </DialogHeader>
        <form action={handleSubmit}>
          <DialogFooter>
            <DialogClose>
              <Button type="submit">Delete</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
