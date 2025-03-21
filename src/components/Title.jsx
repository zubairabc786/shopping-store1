import React from "react";

const Title = ({ title, heading }) => {
  return (
    <>
      <div>
        <div className="h-9 w-5 bg-red-500 rounded-md"></div>
        <p className="text-red-600 font-medium">{title}</p>
      </div>
      <h1 className="text-2xl  font-semibold">{heading}</h1>
    </>
  );
};

export default Title;
