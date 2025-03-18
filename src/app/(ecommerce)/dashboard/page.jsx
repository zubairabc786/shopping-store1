import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import prisma from "../../../utils/connection";
import { Button } from "../../../components/ui/button";
import OrderList from "../../../components/OrderList";
import { getSession } from "../../../utils/action";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getSession();
  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }
  console.log("Session=", session?.user?.role);
  const [users, userCount, orders, totalRevenue, orderDesc] =
    await prisma?.$transaction([
      prisma?.user?.findMany(),
      prisma?.user?.count(),
      prisma?.order?.findMany({
        include: {
          OrderItem: { include: { product: true } },
          addressInfo: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma?.order?.findMany(),
      prisma.order.findMany({
        // where: { isPaid: false },
        take: 6,
        skip: 0,
        include: {
          OrderItem: { include: { product: true } },
          addressInfo: true,
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

  //Total Price
  // console.log("orders=", totalRevenue[1].total);

  const overallTotalPrice = totalRevenue?.reduce((pval, cval) => {
    return pval + cval.total;
  }, 0);

  console.log("orders=", overallTotalPrice);
  //  const totalPriceByProduct =
  // const totalPriceByProduct = orders?.reduce((acc, order) => {
  //   order.OrderItem?.forEach(({ product, quantity }) => {
  //     const totalPrice = product.price * quantity;
  //     if (acc[product.id]) {
  //       acc[product.id].totalPrice += totalPrice;
  //     } else {
  //       acc[product.id] = {
  //         productName: product?.name,
  //         totalPrice,
  //       };
  //     }
  //   });
  //   return acc;
  // }, {});

  // const overallTotalPrice = Object.values(totalPriceByProduct)?.reduce(
  //   (total, product) => {
  //     return total + product.totalPrice;
  //   },
  //   0
  // );
  // Total Price End

  // revenue
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `0${d.getMonth() + 1}`?.slice(-2);
    return `${year}-${month}`;
  };
  let dataForGraph;
  if (orders?.length) {
    const monthlyRevenue = orders?.reduce((acc, order) => {
      const month = formatDate(order.createdAt);

      const orderTotal = order.OrderItem?.reduce(
        (sum, item) => sum + item?.product?.price * item.quantity,
        0
      );

      if (!acc[month]) acc[month] = 0;
      acc[month] += orderTotal;
      return acc;
    });
    dataForGraph = Object?.entries(monthlyRevenue).map(([month, revenue]) => ({
      x: month,
      y: revenue,
    }));
  }

  const usersByMonth = users?.reduce((acc, user) => {
    const month = user.createdAt.getMonth();
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="w-full p-8 bg-white">
      <div className="grid grid-cols-3 gap-6 w-full">
        <Card className="col-span-1 bg-[#eff3fe]">
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>
              {" "}
              {userCount} | Total Visited Users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/users">
              <Button className="text-blue-600 border-blue-600 bg-slate-300">
                View Details
              </Button>
            </Link>
          </CardContent>
        </Card>
        {/* Second Card Start */}
        <Card className="col-span-1 bg-[#eff3fe]">
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>{orders?.length} | Total Orders</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/orders">
              <Button className="text-blue-600 border-blue-600 bg-slate-300">
                View Details
              </Button>
            </Link>
          </CardContent>
        </Card>
        {/* Third Card Start */}
        <Card className="col-span-1 bg-[#eff3fe]">
          <CardHeader>
            <CardTitle>Sales</CardTitle>
            <CardDescription>
              Rs-{overallTotalPrice} | Total Revenue{" "}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/orders">
              <Button className="text-blue-600 border-blue-600 bg-slate-300">
                View Details
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      <h1 className="text-3xl mt-6  text-center text-gray-900 font-bold">
        Latest Transaction
      </h1>
      <OrderList orders={orderDesc} />;{/* 4th Card No. */}
    </div>
  );
};

export default Dashboard;
