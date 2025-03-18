"use client";
import { UploadButton } from "../lib/uploadthing";
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

import FormInput from "../components/FormInput";
import { useEffect, useState } from "react";
import { CreateCategory } from "../services/categories";
import { toast } from "./ui/use-toast";

const CreateUpdateCategory = ({ children, category }) => {
  const [image, setImage] = useState("");
  //   const form = useForm();

  useEffect(() => {
    if (category?.image) setImage(category?.image);
  }, []);

  const handleSubmit = async (formData) => {
    const result = await CreateCategory(formData, image, category?.id);
    if (result?.result) {
      toast({ title: "Category Created Successfully" });
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
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        {/* <Form {...form}> */}
        <form action={handleSubmit}>
          <div className="grid gap-4 py-4">
            <FormInput
              id="name"
              label="Name"
              placeholder="full name"
              type="text"
              defaultValue={category?.name || ""}
              className="h-10"
            />
            {!image ? (
              <UploadButton
                endpoint="imageUploader"
                appearance={{
                  button:
                    // " bg-slate-700",
                    "ut-uploading:cursor-not-allowed  bg-slate-600 w-full text-xl after:bg-orange-400 max-w-[700px]",
                  allowedContent: "hidden",
                }}
                onClientUploadComplete={(res) => {
                  setImage(res[0].url);
                  // alert("upload complete");
                }}
                onUploadError={(error) => {
                  alert(`ERROR ${error.message}`);
                }}
              />
            ) : (
              <div className="flex items-center gap-2">
                <img src={image} alt="" className="h-16 w-16" />
              </div>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
        {/* </Form> */}
      </DialogContent>
    </Dialog>
  );
};

export default CreateUpdateCategory;
