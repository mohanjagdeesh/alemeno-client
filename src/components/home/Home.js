import { useEffect } from "react";
import Header from "./Header";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    if (jwtToken) {
      navigate("/courses");
    }
  });
  return (
    <>
      <Header />
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col gap-5 py-2  items-center min-h-[90vh] md:h-[90vh]">
        <h1 className="text-1xl font-bold md:text-5xl lg:text-5xl">
          Welcome To E-Learning Portal
        </h1>
        <div className="w-4/5 flex flex-col items-center md:flex md:flex-row md:flex-wrap md:justify-center gap-5">
          <img
            className="bg-white w-full md:w-2/5"
            src="https://res.cloudinary.com/duapyyftc/image/upload/v1699624540/homeHtml_n1nvyr.png"
            alt="html&css"
          />
          <img
            className="bg-white w-full md:w-2/5"
            src="https://res.cloudinary.com/duapyyftc/image/upload/v1699624540/homeReact_ikogxt.webp"
            alt="html&css"
          />
          <img
            className="bg-white w-full md:w-2/5"
            src="https://res.cloudinary.com/duapyyftc/image/upload/v1699624540/homeJavascript_pchr90.png"
            alt="html&css"
          />
          <img
            className="bg-white w-full md:w-2/5"
            src="https://res.cloudinary.com/duapyyftc/image/upload/v1699624540/homePython_batydk.png"
            alt="html&css"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
