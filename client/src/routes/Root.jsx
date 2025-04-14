import axios from "axios";
import { Header } from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { saveUserData } from "../features/user/userSlice";

export const Root = () => {
  const user = useSelector((store) => store.user);
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUser = async () => {
    if (user) return;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/check/user`,
        {
          withCredentials: true,
        }
      );
      dispatch(saveUserData(response.data.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const handleUnload = () => {
      if (!user || !user.mobile || cart?.products?.length === 0) return;

      navigator.sendBeacon(
        `${import.meta.env.VITE_API_URL}/schedule/whatsapp`,
        JSON.stringify({
          phone: user?.mobile,
          cart: cart,
        })
      );
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [user, cart?.products?.length]);

  return (
    <>
      <header>
        <Header />
      </header>
      <main className="mx-2 my-32">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
