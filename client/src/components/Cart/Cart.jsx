import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { cartProducts } from "../../features/cart/cartSlice";


export const Cart = () => {
  const dispatch = useDispatch()
  const [cart, setCart] = useState([]);
  const fetchCart = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        withCredentials: true,
      });
      setCart(response?.data?.data);
      dispatch(cartProducts(response?.data?.data))
    } catch (error) {
      console.log(error);
    }
  };
  const increaseProductQuantity = async (productId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/add/product/quantity`,
        { productId },
        {
          withCredentials: true,
        },
      );
      setCart(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const decreaseProductQuantity = async (productId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/remove/product/quantity`,
        { productId },
        {
          withCredentials: true,
        },
      );
      setCart(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      {cart?.products?.map((product) => (
        <div
          key={product.productId}
          className="flex my-2 items-center  flex-wrap md:flex-nowrap   justify-between bg-[#FFB22C] md:w-[800px] p-10 md:h-24 rounded text-white"
        >
          <img
            className="w-20 h-20 rounded p-1"
            src={product.image}
            alt={product.title}
          />
          <h3 className="overflow-hidden w-[300px] ">{product.title}</h3>
          <p>₹{product.price}</p>
          <span className="flex gap-2 items-center justify-center">
            <button
              onClick={() => decreaseProductQuantity(product.productId)}
              className="border font-bold border-white w-8 h-8 hover:bg-yellow-100 hover:text-black rounded-full"
            >
              -
            </button>
            <p>{product.quantity}</p>
            <button
              onClick={() => increaseProductQuantity(product.productId)}
              className="border font-bold border-white w-8 h-8 hover:bg-yellow-100 hover:text-black rounded-full"
            >
              +
            </button>
          </span>
        </div>
      ))}
      <div className="bg-[#FFB22C] flex justify-between items-center md:w-[800px] font-bold px-10 text-white w-full rounded p-5">
        <span>Total Price:</span>
        <span>₹{cart.totalPrice}</span>
      </div>
    </div>
  );
};
