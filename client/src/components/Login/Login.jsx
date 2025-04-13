import axios from "axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUserData } from "../../features/user/userSlice";
import { cartProducts } from "../../features/cart/cartSlice";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        withCredentials: true,
      });

      dispatch(cartProducts(response?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const loginHandler = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          email,
          password,
        },
        { withCredentials: true },
      );

      toast.success("Login successful!");
      dispatch(saveUserData(response?.data?.data));
      fetchCart();
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong!");
      setError(error.response.data.message)
    }
  };

  return (
    <div className="flex justify-center h-full w-full my-10">
      <div className="flex flex-col text-[#FFB22C] px-4 gap-3 justify-center items-center bg-[#FFB22C] w-96 h-96 rounded-lg ">
        <h1 className="text-3xl font-bold mb-5 text-white">Login</h1>

        <input
          className="w-full px-4 py-2 rounded-lg outline-[#FFB22C]"
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 rounded-lg outline-[#FFB22C]"
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-white text-gray-400 hover:bg-yellow-100 px-4 py-2 rounded-lg"
          onClick={loginHandler}
        >
          Login
        </button>
         {error ? <p className="text-red-700">{error }</p> : ''}
      </div>
    </div>
  );
};
