import { Header } from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer/Footer";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { cartProducts } from "../features/cart/cartSlice";

export const Root = () => {
  useAuth();

  const { user, loading } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    console.log(user?.mobile);
    const handleUnload = () => {
      if (!user || !user.mobile || cart?.products?.length === 0) return;

      navigator.sendBeacon(
        `${import.meta.env.VITE_API_URL}/schedule/whatsapp`,
        JSON.stringify({
          phone: user?.mobile,
          cart: cart,
        }),
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
