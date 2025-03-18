import React from "react";
import Header from "../../components/Header";
import { Toaster } from "../../components/ui/toaster";
import { getSession } from "../../utils/action";
import HomeFooter from "../../components/HomeFooter/HomeFooter";

const EcommerceLayout = async ({ children }) => {
  const categories = await prisma?.category?.findMany();
  const session = await getSession();
  // console.log(session);
  return (
    <div>
      <Toaster />
      <Header categories={categories} session={session} />
      {children}
    </div>
  );
};

export default EcommerceLayout;
