import React from "react";
import UserList from "../../../../components/UserList";
import prisma from "../../../../utils/connection";
import { getSession } from "../../../../utils/action";
import { redirect } from "next/navigation";
const Users = async () => {
  const session = await getSession();
  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }
  const users = await prisma.user.findMany();
  // console.log(users);
  return (
    <div className="w-full">
      <UserList users={users} />
    </div>
  );
};

export default Users;
