import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { cartProducts } from "../../features/cart/cartSlice";

export const ProductCard = ({ image, title, description, price, id }) => {
  const dispatch = useDispatch();
  const addToCart = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/add/product`,
        { product: { id, image, title, price } },
        { withCredentials: true }
      );
      dispatch(cartProducts(response?.data?.data));
      toast.success("Product added to cart!");
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };

  return (
    <div className="flex flex-col justify-between items-center rounded-md w-72 h-[500px] border p-5 mb-4 border-black mt-10 mx-auto">
      <img className="object-contain w-32" src={image} alt={title} />
      <h3 className="font-bold h-5 overflow-hidden">{title}</h3>
      <p className="h-[78px] overflow-hidden">{description}</p>
      <p className="font-bold">₹{price}</p>
      <button
        className="px-4 py-2 rounded-lg text-white bg-[#FFB22C]"
        onClick={addToCart}
      >
        Add to cart
      </button>
    </div>
  );
};
