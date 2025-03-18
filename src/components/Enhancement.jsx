import React from "react";
import { staticTime } from "../utils/data";
import { Button } from "./ui/button";

const Enhancement = () => {
  return (
    <div className=" mt-10 bg-black grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-0 p-10">
      <div className=" flex flex-col justify-center gap-5">
        <h2 className="text-green-500 font-bold text-md ">Enhancement</h2>
        <h1 className="text-3xl text-white ">Enhance Your Music Experience</h1>
        <div className="flex gap-5">
          {staticTime.map((item, index) => (
            <div
              key={index}
              className="flex  justify-center items-center flex-col bg-white h-16 w-16 rounded-full text-sm"
            >
              <p>{item.count}</p>
              <p>{item.time}</p>
            </div>
          ))}
        </div>
        <Button className="bg-green-500 w-28 ">Buy Now</Button>
      </div>
      <div>
        <img src="/speaker.png" alt="" />
      </div>
    </div>
  );
};

export default Enhancement;
