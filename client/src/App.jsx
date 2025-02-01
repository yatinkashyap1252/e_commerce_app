import React, { useContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Header from "./components/Header";
import PlaceOrder from "./pages/PlaceOrder";
import Footer from "./components/Footer";
import Title from "../src/shared/Title";
import ExploreMenu from "./components/ExploreMenu";
import { StoreContext } from "./context/StoreContext";
import LoginPop from "./components/LoginPop";
import Verify from "./pages/verify";
import Order from "./pages/Order";

const App = () => {
  const {category,setCategory}=useContext(StoreContext)
  const [showlogin,setShowLogin]=useState(false)
  return (
    <BrowserRouter>
      <div>
        {showlogin?<LoginPop setShowLogin={setShowLogin} />:<></>}
        <Title title="E_commerce_app" description="one of the best" />
        <Header setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/category" element={<ExploreMenu category={category} setCategory={setCategory} />} />
          <Route path="/about" element={<About />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/order" element={<Order />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
