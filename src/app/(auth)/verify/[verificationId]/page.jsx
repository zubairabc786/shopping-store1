import React from "react";
import { emailVerify } from "../../../../utils/action";

const VerificationId = async ({ params }) => {
  console.log(params?.verificationId);
  const res = await emailVerify(params?.verificationId);
  //   if (res?.error) {
  //     toast({ title: res.error });
  //     return <div>Error</div>;
  //   }
  //   return <div></div>;
  return (
    <div className="text-white grid place-content-center h-screen">
      {res?.error || "loading"}
    </div>
  );
};

export default VerificationId;
