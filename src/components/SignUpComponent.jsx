"use client";

// import { UploadButton } from "../../../lib/uploadthing";
import { UploadButton } from "../lib/uploadthing";
// import FormInput from "../../../components/FormInput";
import FormInput from "./FormInput";
// import FormSubmit from "../../../components/FormSubmit";
import FormSubmit from "../components/FormSubmit";
import { useState } from "react";
// import { register } from "../../../utils/action";
import { register } from "../utils/action";
import { toast } from "../components/ui/use-toast";

const SignUp = () => {
  const [image, setImage] = useState("");
  console.log(image);
  const onSubmit = async (formData) => {
    const res = await register(formData, image);
    console.log(res);
    if (res?.error) {
      toast({ title: res.error });
    } else toast({ title: res.message });
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="h-screen bg-[#cbe3e9]">
        <img src="./signup.png" alt="" />
      </div>
      <div className="p-[15%] bg-white">
        <h1 className="text-2xl font-medium">Create An Account</h1>
        <form action={onSubmit}>
          <FormInput
            id="name"
            label="Full Name"
            placeholder="Enter your name"
            type="text"
            className="h-10"
          />
          <FormInput
            id="email"
            label="Email"
            placeholder="Enter your email "
            type="text"
            className="h-10"
          />
          <FormInput
            id="password"
            label="Password"
            placeholder="Enter you password"
            type="text"
            className="h-10 mb-10"
          />
          <UploadButton
            endpoint="imageUploader"
            appearance={{
              button:
                "ut-uploading:cursor-not-allowed  bg-slate-600 w-full text-xl after:bg-orange-400 max-w-[700px]",
              allowedContent: "hidden",
            }}
            onClientUploadComplete={(res) => {
              setImage(res[0].url);
              alert("upload complete");
            }}
            onUploadError={(error) => {
              alert(`ERROR ${error.message}`);
            }}
          />
          <FormSubmit className="w-full bg-red-500 text-white h-12 hover:bg-red-400 mt-10">
            Create
          </FormSubmit>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
