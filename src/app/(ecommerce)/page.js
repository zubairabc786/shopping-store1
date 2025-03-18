import Carousels from "../../components/Carousels";
import Fashsales from "../../components/Fashsales";
import CategoryList from "../../components/CategoryList";
import Enhancement from "../../components/Enhancement";
import Featured from "../../components/Featured";
import { Separator } from "../../components/ui/separator";
import LeftToRightSlider from "../../components/LeftToRightSlider/LeftToRightSlider";
import HomeFooter from "../../components/HomeFooter/HomeFooter";
import prisma from "../../utils/connection";

const Home = async () => {
  const query = {
    take: 8,
    skip: 0,
  };
  const [products, newProducts, popularProducts, categories] =
    await prisma?.$transaction([
      prisma.product.findMany(query),
      prisma.product.findMany({ ...query, orderBy: { createdAt: "desc" } }),
      prisma.product.findMany({ ...query, orderBy: { views: "desc" } }),
      prisma.category.findMany(query),
    ]);
  return (
    <div className="">
      <Carousels />
      <LeftToRightSlider />
      <div className="px-[10%]">
        <Fashsales title="Today's" heading="Flash Sales" products={products} />
        <Fashsales
          title="Today's"
          heading="New Arrival"
          products={newProducts}
        />
        <Separator className="my-4" />
        <CategoryList categories={categories} />
        <Enhancement />
        <Fashsales
          title="Our Products"
          heading="Our Famous Products"
          products={popularProducts}
        />
        <Featured />
        <HomeFooter />
      </div>
    </div>
  );
};

export default Home;
// export default dynamic(() => Promise.resolve(Home), { ssr: false });

export function generateMetadata({ params }) {
  return {
    title: "Online Shoping Store",
    description: "Home page is",
  };
}
