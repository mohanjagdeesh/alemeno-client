import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { CheckUser } from "../../api/userAPI";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserDetails,
  loginVisibility,
} from "../../features/courses/coursesSlice";

const Login = () => {
  const { loginPasswordVisibility } = useSelector((store) => store.course);
  const dispatch = useDispatch();
  const { register, reset, handleSubmit } = useForm();

  const { mutateAsync: loginCheckMutation } = useMutation({
    mutationKey: ["loginCheck"],
    mutationFn: CheckUser,
  });

  const navigate = useNavigate();

  const userSignIn = async (data) => {
    const response = await loginCheckMutation({ data });
    if (response?.status) {
      Cookies.set("jwtToken", response?.jwtToken);
      Cookies.set("userDetails", JSON.stringify(response?.userDetails?._id));
      dispatch(addUserDetails(response?.userDetails));
      reset();
      navigate("/courses");
    } else {
      alert(`${response?.statusText}`);
    }
  };

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    if (jwtToken) {
      navigate("/courses");
    }
  });
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit(userSignIn)}
        className="border-2 border-black rounded-lg bg-white flex flex-col w-11/12 md:w-2/5 lg:w-2/5 items-center gap-5"
      >
        <h1 className="text-black font-bold text-[30px]">Sign In</h1>
        <div className="w-3/4 flex flex-col  md:flex md:flex-row md:justify-between  items-center">
          <label className="text-[22px]" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="border-2 border-black outline-none text-black text-[15px] md:text-[20px] font-semibold p-3 rounded-lg w-3/4"
            type="email"
            placeholder="Enter Email"
            {...register("email")}
            required
          />
        </div>
        <div className="w-3/4 flex flex-col  md:flex md:flex-row md:justify-between  items-center">
          <label className="text-[22px]" htmlFor="password">
            Password
          </label>
          <div className="flex border-2 border-black rounded-lg   w-3/4 items-center">
            <input
              id="password"
              className=" outline-none text-black text-[15px] md:text-[20px] font-semibold p-3 w-11/12"
              type={loginPasswordVisibility ? "text" : "password"}
              placeholder="Enter Password"
              {...register("password")}
              required
            />
            {loginPasswordVisibility ? (
              <AiFillEyeInvisible
                onClick={() => dispatch(loginVisibility())}
                className="h-[25px] w-[25px]"
              />
            ) : (
              <AiFillEye
                onClick={() => dispatch(loginVisibility())}
                className="h-[25px] w-[25px]"
              />
            )}
          </div>
        </div>
        <div className="flex gap-5">
          <button
            className=" text-white text-[15px] font-semibold bg-black rounded-md p-2 hover:scale-105 transition-transform duration-100 ease-in-out"
            type="submit"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/")}
            className=" text-white text-[15px] font-semibold bg-black rounded-md p-2 hover:scale-105 transition-transform duration-100 ease-in-out"
          >
            Home
          </button>
        </div>
        <h1 className="text-[20px]">
          Not a Member?{" "}
          <Link to="/signup">
            <span className="underline cursor-pointer text-blue-700 font-bold">
              Signup
            </span>
          </Link>
        </h1>
      </form>
    </div>
  );
};

export default Login;
