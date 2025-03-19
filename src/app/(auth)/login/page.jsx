// import React from "react";
// import LoginComponent from "../../../components/LoginComponent";

// const LoginPage = () => {
//   return (
//     <div>
//       <LoginComponent />
//     </div>
//   );
// };

// export default LoginPage;

// export function generateMetadata() {
//   return {
//     title: "Login Page for User",
//     description: "Description for login page",
//   };
// }
// app/login/page.js
// import React from "react";
// // import LoginComponent from "../../../components/LoginComponent";
// import LoginComponent from "../../../components/LoginComponent";

// const Login = () => {
//   return (
//     <div>
//       <LoginComponent />
//     </div>
//   );
// };

// export default Login;

// export function generateMetadata() {
//   return {
//     title: "Login Page for User",
//     description: "Description for login page",
//   };
// }

"use client";

import FormInput from "../../../components/FormInput";

import FormSubmit from "../../../components/FormSubmit";
import { login } from "../../../utils/action";
// import { toast } from "../../../components/ui/use-toast";
import { toast } from "../../../components/ui/use-toast";
import Link from "next/link";

const Login = () => {
  const onSubmit = async (formData) => {
    const res = await login(formData);
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
        <h1 className="text-2xl font-medium">Login to you account</h1>
        <form action={onSubmit}>
          <FormInput
            id="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
            className="h-10"
          />
          <FormInput
            id="password"
            label="Password"
            placeholder="Enter the password"
            type="password"
            className="h-10 mb-10"
          />

          <FormSubmit className="w-full bg-red-500 text-white h-12 hover:bg-red-400 mt-10">
            Login
          </FormSubmit>
          <Link
            href="/signup"
            className="cursor-pointer flex items-center justify-center text-blue-400"
          >
            signup
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
