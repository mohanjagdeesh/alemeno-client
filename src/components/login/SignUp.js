import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useMutation } from "react-query";
import { CreateUser } from "../../api/userAPI";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  signupVisibility,
  setProfilePic,
  setProfilePicName,
} from "../../features/courses/coursesSlice";

const SignUp = () => {
  const { signupPasswordVisibility, profilePic, profilePicName } = useSelector(
    (store) => store.course
  );
  const dispatch = useDispatch();
  const { register, reset, handleSubmit } = useForm();

  const { mutateAsync: createUserMutation } = useMutation({
    mutationKey: ["userCreation"],
    mutationFn: CreateUser,
  });

  const navigate = useNavigate();

  const userSignUp = async (data) => {
    const finalObj = { ...data, profilePic };
    const response = await createUserMutation(finalObj);
    if (response?._id) {
      alert("User Created Successfully");
      reset();

      navigate("/login");
    } else {
      const errorMessage = response?.response?.data?.message;
      alert(errorMessage);
    }
  };

  const previewFile = (img) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onloadend = () => {
      dispatch(setProfilePic(reader.result));
    };
  };

  const uploadImage = (e) => {
    const image = e.target.files[0];
    const maxSize = 1024 * 1024;
    if (image.size > maxSize) {
      alert("Image Size Should be Lessthan 1MB");
    } else {
      previewFile(image);
      dispatch(setProfilePicName(image?.name));
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
        onSubmit={handleSubmit(userSignUp)}
        className="border-2 border-black rounded-lg bg-white flex flex-col w-11/12 md:w-2/5 items-center gap-5 py-3"
      >
        <h1 className="text-black font-bold text-[30px]">Sign Up</h1>
        <div className="w-3/4 flex flex-col  md:flex md:flex-row justify-between items-center">
          <label className="text-[22px]" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            className="border-2 border-black outline-none text-black text-[15px] md:text-[20px] font-semibold p-3 rounded-lg w-11/12 md:w-3/4"
            type="text"
            placeholder="Enter Name"
            {...register("name")}
            required
          />
        </div>
        <div className="w-3/4 flex flex-col  md:flex md:flex-row justify-between items-center">
          <label className="text-[22px]" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="border-2 border-black outline-none text-black text-[15px] md:text-[20px] font-semibold p-3 rounded-lg w-11/12 md:w-3/4"
            type="email"
            placeholder="Enter Email"
            {...register("email")}
            required
          />
        </div>
        <div className="w-3/4 flex flex-col  md:flex md:flex-row justify-between items-center">
          <label className="text-[22px]" htmlFor="password">
            Password
          </label>
          <div className="flex border-2 border-black rounded-lg w-11/12   md:w-3/4 items-center">
            <input
              id="password"
              className=" outline-none text-black text-[15px] md:text-[20px] font-semibold p-3 w-full md:w-11/12"
              type={signupPasswordVisibility ? "text" : "password"}
              placeholder="Enter Password"
              {...register("password")}
              required
            />
            {signupPasswordVisibility ? (
              <AiFillEyeInvisible
                onClick={() => dispatch(signupVisibility())}
                className="h-[25px] w-[25px]"
              />
            ) : (
              <AiFillEye
                onClick={() => dispatch(signupVisibility())}
                className="h-[25px] w-[25px]"
              />
            )}
          </div>
        </div>

        <div className=" md:w-3/4 w-11/12  flex flex-col justify-between items-center">
          <label
            className="text-[22px] w-1/2  bg-red-500 text-white text-center rounded-2xl p-1"
            htmlFor="profilePic"
          >
            Upload Pic <br />{" "}
          </label>

          <input
            hidden
            id="profilePic"
            type="file"
            accept="image/jpeg, image/jpg, image/png"
            {...register("profilePic")}
            required
            onChange={uploadImage}
          />
          {profilePic ? (
            <img
              className="h-[100px] w-[100px] rounded-full mt-2"
              src={profilePic}
              alt="profilePic"
            />
          ) : (
            ""
          )}
          {profilePic ? <h1 className="text-center">{profilePicName}</h1> : ""}
        </div>
        <div className="flex gap-5">
          <button
            className=" text-white text-[15px] font-semibold bg-black rounded-md p-2 hover:scale-105 transition-transform duration-100 ease-in-out"
            type="submit"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/")}
            className=" text-white text-[15px] font-semibold bg-black rounded-md p-2 hover:scale-105 transition-transform duration-100 ease-in-out"
          >
            Home
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
