import Cookies from "js-cookie";
import Header from "./Header";
import { useQuery } from "react-query";
import { getLoggedUser } from "../../api/userAPI";

const Profile = () => {
  const parsedObject = Cookies.get("userDetails");
  const userId = JSON.parse(parsedObject);

  const { data: userDetails } = useQuery({
    queryKey: ["userProfileDetails"],
    queryFn: async () => {
      const result = await getLoggedUser(userId);
      return result;
    },
  });

  return (
    <div>
      <Header />
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col items-center h-[90vh] py-5">
        <div className="  flex flex-col justify-center items-center">
          <h1 className=" text-[2xl] md:text-[30px] font-bold">
            Welcome {userDetails?.name}
          </h1>
          <img
            className="h-[150px] w-[150px] rounded-full"
            src={userDetails?.profilePicUrl}
            alt="profile"
          />
        </div>
        <h1 className="font-bold text-[20px] md:text-[25px] text-black text-center mt-3">
          List Of Enrolled Courses{"["}
          {userDetails?.enrolledCourses.length}
          {"]"}
        </h1>
        <div className="bg-black flex flex-col  md:flex md:flex-row md:flex-wrap md:justify-center rounded-xl w-11/12  px-5 py-5 mt-5 max-h-[80vh] overflow-y-auto gap-10">
          {userDetails?.enrolledCourses?.map((eachOne, index) => (
            <div
              key={eachOne?.id}
              className="bg-white flex flex-col items-center rounded-xl md:w-1/5"
            >
              <img
                className="h-[50px] w-[50px] md:h-[100px] md:w-[100px] rounded-full border-2 border-red-600 my-3"
                src={eachOne?.thumbnail}
                alt="course"
              />
              <h1 className="md:text-[20px] md:font-bold md:text-center">
                {eachOne?.name}
              </h1>
              <h1 className="md:text-[20px] md:font-bold md:text-center">
                Instructor:- {eachOne?.instructor}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
