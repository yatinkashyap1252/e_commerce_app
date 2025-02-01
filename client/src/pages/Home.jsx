import React, { useContext, useState } from "react";
import HeroSection from "../components/HeroSection";
import ExploreMenu from "../components/ExploreMenu";
import ItemDisplay from "../components/itemDisplay";
import About from "./About";
import { StoreContext } from "../context/StoreContext";

const Home = () => {
  // const [category,setCategory]=useState("All")
  const {category,setCategory}=useContext(StoreContext)
  return (
    <>
      <HeroSection />
      <ExploreMenu category={category} setCategory={setCategory} />
      {/* <ItemDisplay category={category} /> */}
      <About/>
    </>
  );
};

export default Home;
