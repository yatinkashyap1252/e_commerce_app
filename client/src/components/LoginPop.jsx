import React, { useContext, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPop = ({ setShowLogin }) => {
  const { url,setToken } = useContext(StoreContext);

  const [currentState, setCurrentState] = useState("Register");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
  };

  const onLoginSubmit = async (event) => {
    event.preventDefault();
    let newUrl = url+"/user";
    if (currentState === "Login") {
      newUrl += "/login";
    }else{
      newUrl += "/register";
    }
    const response=await axios.post(newUrl,data)
    // console.log(response);
    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      setShowLogin(false);
      toast.success(response.data.message);
    }else{
      toast.error(response.data.message);
    }
  };

  // useEffect(()=>{
  //   console.log(data);
  // },[data])

  return (
    <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50">
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {currentState === "Login" ? "Sign In" : "Sign Up"}
          </h2>
          <IoMdClose
            className="text-gray-500 text-2xl cursor-pointer hover:text-red-500 transition"
            onClick={() => setShowLogin(false)}
          />
        </div>

        {/* Form Fields */}
        <form onSubmit={onLoginSubmit}>
          <div className="space-y-4">
            {currentState === "Register" && (
              <div>
                <input
                  name="name"
                  onChange={onChangeHandler}
                  value={data.name}
                  type="text"
                  placeholder="Enter Name"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}
            <div>
              <input
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                type="email"
                placeholder="Enter Email"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <input
                name="password"
                onChange={onChangeHandler}
                value={data.password}
                type="password"
                placeholder="Enter Password"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Terms & Conditions */}
          {currentState === "Register" && (
            <div className="flex items-center mt-4 space-x-2">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                required
              />
              <p className="text-sm text-gray-600">
                I agree to the{" "}
                <span className="text-blue-500 underline cursor-pointer">
                  terms and conditions
                </span>
                .
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition font-medium"
          >
            {currentState === "Register" ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {/* Switch Between Login/Signup */}
        <div className="mt-6 text-center">
          {currentState === "Login" ? (
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer font-medium hover:underline"
                onClick={() => setCurrentState("Register")}
              >
                Sign up here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer font-medium hover:underline"
                onClick={() => setCurrentState("Login")}
              >
                Log in here
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPop;
