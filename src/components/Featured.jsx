import React from "react";
import Title from "./Title";
import { Button } from "./ui/button";

const Featured = () => {
  return (
    <div>
      <Title title="Featured" heading="New Arrival" />
      <div className="grid grid-cols-1  lg:grid-cols-2 h-96 gap-2 lg:gap-5 mt-4">
        <div
          className="  bg-black p-4 bg-no-repeat bg-contain bg-center rounded-md flex flex-col justify-end gap-2 text-white "
          style={{ backgroundImage: `url(/arrival_1.png)` }}
        >
          <h2 className=" font-bold text-lg ">Play Station 5 </h2>
          <p className="  text-xs w-70 ">
            Black and White of the PS5 coming out on sale
          </p>
          <Button className="w-20 bg-transparent">Shop Now</Button>
        </div>
        {/* second div start */}
        <div className="grid grid-rows-2 gap-2 lg:gap-5">
          <div
            className="  bg-black p-4 bg-no-repeat bg-contain bg-center rounded-md flex flex-col justify-end gap-2 text-white "
            style={{ backgroundImage: `url(/arrival_3.png)` }}
          >
            <h2 className=" font-bold text-lg ">Speakers</h2>
            <p className="  text-xs w-70 ">
              Featured women collections that give you another vibe.
            </p>
            <Button className="w-20 bg-transparent">Shop Now</Button>
          </div>
          <div
            className="  bg-black p-4 bg-no-repeat bg-contain bg-center rounded-md flex flex-col justify-end gap-2 text-white "
            style={{ backgroundImage: `url(/arrival_4.png)` }}
          >
            <h2 className=" font-bold text-lg ">Perfume</h2>
            <p className="  text-xs w-70 ">GUCCI INTENSE OUD EDP</p>
            <Button className="w-20 bg-transparent">Shop Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
