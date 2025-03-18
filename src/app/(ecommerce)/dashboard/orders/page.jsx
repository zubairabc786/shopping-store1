import OrderList from "../../../../components/OrderList";
import { getSession } from "../../../../utils/action";
import { redirect } from "next/navigation";

const Orders = async ({ searchParams }) => {
  const session = await getSession();
  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }
  let page = searchParams?.page || 1;
  let ITEM_PER_PAGE = 10;
  const orders = await prisma?.order?.findMany({
    // where: { isPaid: true },
    include: { OrderItem: { include: { product: true } }, addressInfo: true },
    take: ITEM_PER_PAGE,
    skip: ITEM_PER_PAGE * (page - 1),
    // orderBy: { createdAt: "desc" },
  });
  const count = await prisma?.order?.count();
  // console.log(orders, "orders");
  return <OrderList orders={orders} count={count} />;
};

export default Orders;
