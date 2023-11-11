import Cookies from "js-cookie";
import { getFilteredCourses } from "../../api/coursesAPI";
import { getLoggedUser, updateUserDetails } from "../../api/userAPI";
import Header from "../home/Header";
import { useQuery, useMutation } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { searchQuery } from "../../features/courses/coursesSlice";
import { Link } from "react-router-dom";

const Courses = () => {
  const { searchValue } = useSelector((store) => store.course);
  const dispatch = useDispatch();
  const parsedObject = Cookies.get("userDetails");
  const userId = JSON.parse(parsedObject);
  //   Querying For List Of Courses
  const { data: listOfCourses, refetch } = useQuery({
    queryKey: ["searchCourse"],
    queryFn: async () => {
      const result = await getFilteredCourses(searchValue);
      return result;
    },
  });

  const loggedUserQuery = useQuery({
    queryKey: ["loggedUser"],
    queryFn: async () => {
      const result = await getLoggedUser(userId);
      return result;
    },
  });

  const { data } = loggedUserQuery || {};
  const { enrolledCourses } = data || [];

  // Mutation For Course Enrollment
  const { mutateAsync: courseEnrollMutation } = useMutation({
    mutationKey: ["courseEnrollment"],
    mutationFn: updateUserDetails,
  });

  const enrollSelectedCourse = async (selectedCourse) => {
    const selectedCourseId = selectedCourse.id;
    const isAlreadyEnrolled = enrolledCourses?.some(
      (eachOne) => eachOne.id === selectedCourseId
    );
    if (isAlreadyEnrolled) {
      alert("You Already Enrolled This Course");
    } else {
      const finalObj = { ...selectedCourse, userId };
      const response = await courseEnrollMutation(finalObj);
      if (response) {
        alert(`You Enrolled ${selectedCourse.name} Successfully`);
      }
    }
  };

  const searchCourses = (e) => {
    dispatch(searchQuery(e.target.value));
    refetch();
  };

  return (
    <div>
      <Header />
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-[90vh] flex flex-col  items-center">
        <div className=" flex flex-col  md:flex md:flex-row items-center gap-5 my-5">
          <h1 className="text-black text-[20px] md:text-[35px] font-bold">
            List Of Available Courses
          </h1>
          <div className=" flex flex-col md:flex gap-2 items-center">
            <label
              className="text-[20px] font-bold text-[#fff]"
              htmlFor="search"
            >
              Search Course
            </label>
            <input
              className=" outline-none p-2 rounded-lg"
              id="search"
              type="search"
              onChange={searchCourses}
            />
          </div>
        </div>
        <div className=" w-full md:w-4/5 flex flex-col items-center  md:flex md:flex-row md:flex-wrap md:justify-center gap-5 overflow-y-auto">
          {listOfCourses?.map((eachCourse) => {
            const enrollCourse = () => {
              enrollSelectedCourse(eachCourse);
            };
            return (
              <div
                key={eachCourse.id}
                className=" w-11/12  md:w-2/5 border-2 border-red-600 bg-white rounded-xl p-5 flex flex-col items-center gap-2"
              >
                <img
                  className="h-[100px] w-[100px] rounded-full border-2 border-black"
                  src={eachCourse?.thumbnail}
                  alt="courseLogo"
                />
                <h1 className=" text-[18px] md:text-[25px] font-bold text-red-600">
                  {eachCourse?.name}
                </h1>
                <button
                  onClick={enrollCourse}
                  className="border-2 h-[50px] border-white bg-black text-gray-300 font-bold text-[15px] rounded-md p-2"
                >
                  Enroll Now -{">"}
                </button>
                <Link to={`/courses/${eachCourse?.id}`}>
                  <button className="border-2 h-[50px] border-white bg-black text-gray-300 font-bold text-[15px] rounded-md p-2">
                    Course Details -{">"}
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Courses;
