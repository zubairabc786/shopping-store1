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
import { useForm } from "react-hook-form";
import { Form } from "../components/ui/form";
import FormInput from "../components/FormInput";
import SelectForm from "../components/SelectForm";
import { useEffect, useReducer, useRef, useState } from "react";
import { getCategories } from "../services/categories";
import { UploadDropzone } from "../lib/uploadthing";
import { toast } from "./ui/use-toast";
import { addUpdatePost } from "../services/posts";
import Link from "next/link";

const CreateUpdateProduct = ({ children, product }) => {
  const ref = useRef();
  const [category, setCategory] = useState([]);
  const [images, setImages] = useState([]);
  const form = useForm();

  console.log(product?.id);
  useEffect(() => {
    if (product?.images) setImages(product.images);
    categories();
  }, []);

  const categories = async () => {
    const res = await getCategories();
    setCategory(res.result);
  };

  const handleSubmit = async (formData) => {
    const categoryId = form.getValues().categoryId || product.categoryId;
    const res = await addUpdatePost(formData, images, categoryId, product?.id);
    console.log(res);
    if (res.result) {
      ref.current?.reset();

      toast({
        title: "Product successfully Added",
      });
    } else {
      toast({
        title: "Product Not Created",
      });
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

        <Form {...form}>
          <form action={handleSubmit} ref={ref}>
            <div className="grid grid-cols-2 gap-4 py-4 bg-white">
              <FormInput
                id="name"
                label="Name"
                placeholder="full name"
                type="text"
                defaultValue={product?.name || ""}
                className="h-10"
              />
              <FormInput
                id="description"
                label="Description"
                placeholder="Enter Description"
                type="text"
                defaultValue={product?.description || ""}
                className="h-10"
              />
              <FormInput
                id="price"
                label="Price"
                placeholder="Enter Price"
                type="number"
                defaultValue={product?.price || ""}
                className="h-10"
              />
              <FormInput
                id="sku"
                label="SKU"
                placeholder="Enter Sku"
                type="text"
                defaultValue={product?.sku || ""}
                className="h-10"
              />
              <FormInput
                id="stock"
                label="Stock"
                placeholder="Enter Stock value"
                type="number"
                defaultValue={product?.stock || ""}
                className="h-10"
              />
              <FormInput
                id="weight"
                label="Weight"
                placeholder="Enter Weight"
                type="number"
                defaultValue={product?.weight || ""}
                className="h-10"
              />
              <SelectForm
                id="categoryId"
                label="Select Category"
                placeholder="Select Category"
                list={category}
                control={form.control}
              />
              {!images?.length ? (
                <UploadDropzone
                  endpoint="imageUploader"
                  appearance={{
                    button:
                      // " bg-slate-700",
                      "ut-uploading:cursor-not-allowed  bg-slate-600 w-full text-xl after:bg-orange-400 max-w-[700px]",
                    allowedContent: "hidden",
                  }}
                  onClientUploadComplete={(res) => {
                    setImages(res);
                    // alert("upload complete");
                  }}
                  onUploadError={(error) => {
                    alert(`ERROR ${error.message}`);
                  }}
                />
              ) : (
                <div className="flex items-center gap-2">
                  {images?.map((img, index) => (
                    <div key={index}>
                      <img src={img?.url || img} alt="" className="h-16 w-16" />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Save Changes</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUpdateProduct;
