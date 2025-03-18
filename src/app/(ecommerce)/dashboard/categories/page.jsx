import prisma from "../../../../utils/connection";
import AdminCategories from "../../../../components/AdminCategories";
import { getSession } from "../../../../utils/action";
import { redirect } from "next/navigation";

const Categories = async () => {
  const session = await getSession();
  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }
  const query = {
    take: 10,
    skip: 0,
  };

  const CategoryList = await prisma.category.findMany(query);
  return (
    <div className="w-full flex flex-col min-h-screen mx-2 ">
      <AdminCategories CategoryList={CategoryList} />
    </div>
  );
};

export default Categories;
