import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:3000/api/v1";

  const [cartItem, setCartItem] = useState({});
  const [token, setToken] = useState("");
  const [category, setCategory] = useState("All");
  const [FoodList, setFoodList] = useState([]); // Initialize as an empty array

  const addtoCart = async(itemId) => {
    setCartItem((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1, // Increment or initialize to 1
    }));
    if(token){
      await axios.post(url+"/cart/add",{itemId},{headers:{token}})
    }
  };

  const removeFromCart =async (itemId) => {
    setCartItem((prev) => {
      if (prev[itemId] > 1) {
        return { ...prev, [itemId]: prev[itemId] - 1 };
      } else {
        const { [itemId]: _, ...rest } = prev; // Remove item if count reaches 0
        return rest;
      }
    });
    if(token){
      await axios.post(url+"/cart/remove",{itemId},{headers:{token}})
    }
  };

  // Safeguard in case FoodList or cartItem is not ready
  const subTotal = Array.isArray(FoodList)
    ? FoodList.reduce((total, item) => {
        return (
          total + (cartItem[item._id] > 0 ? item.price * cartItem[item._id] : 0)
        );
      }, 0)
    : 0;


    // http://localhost:3000/api/v1/item/getlist


  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/item/getlist");

      // console.log(response.data);
      
      setFoodList(response.data.item || []); // Ensure the data is an array
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  const loadCartData=async(token)=>{
    const response=await axios.post(url+"/cart/getcart",{},{headers:{token}})
    setCartItem(response.data.cartData)
  }

  useEffect(() => {
    async function LoadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    // console.log(FoodList);
    LoadData();
  }, []);

  const ContextValue = {
    FoodList,
    cartItem,
    addtoCart,
    removeFromCart,
    category,
    setCategory,
    subTotal,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={ContextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;