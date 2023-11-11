import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const jwtToken = Cookies.get("jwtToken");
  const navigate = useNavigate();

  const signOut = () => {
    Cookies.remove("jwtToken");
    Cookies.remove("userDetails");
    navigate("/");
  };
  return (
    <div>
      <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-[10vh] flex justify-center items-center gap-5">
        {!jwtToken && (
          <Link to="/">
            <h1 className="text-white text-[12px] md:text-[20px] lg:text-[20px] font-semibold underline cursor-pointer ">
              Home
            </h1>
          </Link>
        )}

        <Link to="/courses">
          <h1 className="text-white text-[12px] md:text-[20px] lg:text-[20px] font-semibold underline cursor-pointer ">
            Courses
          </h1>
        </Link>
        <Link to="/profile">
          <h1 className="text-white text-[12px] md:text-[20px] lg:text-[20px] font-semibold underline cursor-pointer ">
            Profile
          </h1>
        </Link>
        {!jwtToken && (
          <Link to="/login">
            <h1 className="text-white text-[12px] md:text-[20px] lg:text-[20px] font-semibold underline cursor-pointer ">
              Sing In
            </h1>
          </Link>
        )}
        {!jwtToken && (
          <Link to="/signup">
            <h1 className="text-white text-[12px] md:text-[20px] lg:text-[20px] font-semibold underline cursor-pointer ">
              Sign Up
            </h1>
          </Link>
        )}
        {jwtToken && (
          <h1
            onClick={signOut}
            className="text-white text-[15px] md:text-[20px] lg:text-[20px] font-semibold underline cursor-pointer "
          >
            Sign Out
          </h1>
        )}
      </div>
    </div>
  );
};

export default Header;
