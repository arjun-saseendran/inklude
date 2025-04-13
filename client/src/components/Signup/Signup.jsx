import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const saveData = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`,
        {
          name,
          email,
          mobile,
          password,
        },
        { withCredentials: true },
      );
      toast.success("Signup successful!");
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message)
      toast.error(error.response.data.message  || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center h-full w-full   my-10">
      <div className="flex flex-col text-[#FFB22C] px-4 gap-3 justify-center items-center bg-[#FFB22C] w-96 h-96 rounded-lg ">
        <h1 className="text-3xl font-bold mb-5 text-white">Signup</h1>
        <input
          className="w-full px-4 py-2 rounded-lg outline-[#FFB22C]"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 rounded-lg outline-[#FFB22C]"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 rounded-lg outline-[#FFB22C]"
          type="text"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 rounded-lg outline-[#FFB22C]"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-white text-gray-400 hover:bg-yellow-100 px-4 py-2 rounded-lg"
          onClick={saveData}
        >
          Submit
        </button>
        {error ? <p className="text-red-700">{error }</p> : ''}
      </div>
    </div>
  );
};
