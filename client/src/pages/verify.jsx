import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import "../verify.css"; 

const Verify = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}/order/verify`, {
        orderId,
        success,
      });
      if (response.data.success) {
        navigate("/order");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      navigate("/"); // Handle error by navigating to home
    }
  };

  useEffect(() => {
    verifyPayment(); // Call the function
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <div className="verify-container">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
