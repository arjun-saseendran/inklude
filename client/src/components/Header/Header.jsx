import { IoMenu } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { saveProducts } from "../../features/products/productSlice";
import { saveUserData, removeUserData } from "../../features/user/userSlice";
import { IoCartOutline } from "react-icons/io5";
import { cartProducts } from "../../features/cart/cartSlice";
import logo from "../../assets/favicon.ico";

export const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/cart`,
          {
            withCredentials: true,
          }
        );

        dispatch(cartProducts(response?.data?.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
  }, [cart]);

  useEffect(() => {
    try {
      const fetchProducts = async () => {
        const response = await axios.get(
          "https://store-ecommerce-web-application-server.vercel.app/api/v1/product/products"
        );
        dispatch(saveProducts(response?.data?.data));
      };
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const logoutHandler = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserData());
    } catch (error) {
      console.log(error);
    }
  };

  const [open, setOpen] = useState(false);
  return (
    <nav className="w-full fixed bg-[#FFB22C] top-0">
      <div className="md:flex mx-auto py-4 px-5 md:py-8  justify-between items-center bg-[#FFB22C] text-white font-bold md:px-10 ">
        <div className="flex justify-between w-full md:w-1/2">
          <div className="text-xl">
            <span className="flex items-center md:gap-6">
              <Link to={"/"}>
                <img className="me-4 rounded" src={logo} alt="logo" />
              </Link>

              <span>Hello, {user?.name}</span>
            </span>
          </div>

          <div className="md:hidden my-auto">
            <IoMenu size={20} onClick={() => setOpen(!open)} />
          </div>
        </div>
        <div
          className={`flex w-full md:w-auto md:block mt-14 md:mt-0 justify-end ${
            open ? "block" : "hidden"
          }`}
        >
          <ul className="md:flex items-center  gap-10 bg-[#FFB22C] p-5 md:p-0 w-full text-center">
            <li className="border hover:text-yellow-100 rounded-md py-2 md:py-0   mb-2 md:border-none">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="border hover:text-yellow-100 rounded-md py-2 md:py-0   mb-2 md:border-none">
              {user ? (
                <Link to={"/cart"}>
                  <span className="flex justify-center">
                    <p className="border rounded-full w-6 h-6 bg-green-600">
                      {cart?.products?.length}
                    </p>
                    <IoCartOutline className="text-3xl text-white" />
                  </span>
                </Link>
              ) : (
                <Link to={"/signup"}> Signup </Link>
              )}
            </li>
            <li className="border hover:text-yellow-100 rounded-md py-2 md:py-0   mb-2 md:border-none">
              {user ? (
                <span className="cursor-pointer" onClick={logoutHandler}>
                  Logout
                </span>
              ) : (
                <Link to={"/login"}> Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
