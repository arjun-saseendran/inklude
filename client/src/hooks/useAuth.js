import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { saveUserData } from "../features/user/userSlice";

export const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/check/user`,
          {
            withCredentials: true,
          },
        );
        dispatch(saveUserData(res?.data?.data));
      } catch (error) {
        console.log(error.message || "User not authenticated");
      }
    };

    fetchUser();
  }, []);
};
