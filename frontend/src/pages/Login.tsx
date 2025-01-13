import axios from "axios";
import { LucideLoaderCircle } from "lucide-react";
import React, { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ onLogin }: any) => {
  const [userDetails, setUserDetails] = React.useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const form = new FormData();
    try {
      form.append("email", userDetails.email);
      form.append("password", userDetails.password);

      const res = await axios.post(`${BASE_URL}/auth/login`, form, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data.success) {
        console.log("user logged in");
        toast.success("user logged in");
        setIsLoading(false);
        onLogin();
        navigate("/");
      }
    } catch (error) {
      console.log("error in login", error);
      toast.error("error in login");
      setIsLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen w-screen  bg-slate-400 ">
      {/* <div className="flex flex-col gap-5 p-8 bg-slate-100 rounded-sm"> */}
      {/* <h3 className="text-lg font-meduim mb-2"> email</h3> */}
      {isLoading ? (
        <LucideLoaderCircle size={48} className="text-white" />
      ) : (
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-5 p-8 bg-slate-100 rounded-sm"
        >
          <input
            type="text"
            placeholder="ur email"
            className=" rounded-lg px-4 py-2 w-full text-lg"
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
            value={userDetails.email}
          />
          <input
            type="password"
            className="py-2 px-2 rounded-lg w-full text-lg"
            placeholder="ur password"
            onChange={(e) => {
              setUserDetails({ ...userDetails, password: e.target.value });
            }}
          />

          <button
            type="submit"
            onClick={submitHandler}
            className="text-white font-semibold rounded-lg px-4 py-2"
          >
            Login
          </button>

          <p className="text-center">
            {" "}
            New here?
            <Link to="/" className="text-blue-600">
              Create new Account
            </Link>
          </p>
        </form>
      )}
      {/* </div> */}
    </div>
  );
};

export default Login;
