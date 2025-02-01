import React from "react";
import heroImage from "../assets/hero.jpg";

const HeroSection = () => {
  return (
    <div className="w-full h-[550px] flex justify-center items-center">
      <div className="h-5/6 w-5/6 rounded-[15px] flex items-end m-auto shadow-[0_25px_40px_-10px_rgba(0,0,0,0.6)] p-4 pb-8 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        {/* Content */}
        <div className="relative flex items-center w-full flex-row justify-between text-white z-10">
          <div className=" w-full h-full">
            <h1 className="text-3xl font-bold">Welcome to the Hero Section</h1>
            <p className="mt-2 text-lg">
              This is an overlay example with gradient
            </p>
          </div>
          <div className="w-fit h-fit flex ">
            <button className="flex items-center px-2 py-3 rounded-full justify-center bg-[#747474] border-white border-2" >Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
