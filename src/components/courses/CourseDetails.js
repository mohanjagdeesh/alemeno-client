import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getSpecificCourse } from "../../api/coursesAPI";
import Header from "../home/Header";
import { useNavigate } from "react-router-dom";

const CourseDetails = () => {
  const { id } = useParams();
  const { data: specificCourseDetails } = useQuery({
    queryKey: ["specificCourse"],
    queryFn: async () => {
      const result = await getSpecificCourse(id);
      return result;
    },
  });

  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-[90vh] flex flex-col  items-center">
        <div className="bg-white rounded-xl flex flex-col w-1/2 gap-2 p-3 mt-5">
          <img
            className="h-[100px] w-[100px] rounded-full border-2 border-black self-center"
            src={specificCourseDetails?.[0]?.thumbnail}
            alt="logo"
          />
          <div className="flex w-full gap-1">
            <h1 className="text-[25px] font-bold w-2/5">Course Name :-</h1>
            <h1 className="text-[20px] w-1/2">
              {specificCourseDetails?.[0]?.name}
            </h1>
          </div>
          <div className="flex w-full gap-1">
            <h1 className="text-[25px] font-bold w-2/5">Instructor Name :-</h1>
            <h1 className="text-[20px] w-1/2">
              {specificCourseDetails?.[0]?.instructor}
            </h1>
          </div>
          <div className="flex w-full gap-1">
            <h1 className="text-[25px] font-bold w-2/5">
              Course Description :-
            </h1>
            <h1 className="text-[20px] w-1/2">
              {specificCourseDetails?.[0]?.description}
            </h1>
          </div>
          <div className="flex w-full gap-1">
            <h1 className="text-[25px] font-bold w-2/5">
              Enrollment Status :-
            </h1>
            <h1 className="text-[20px] w-1/2">
              {specificCourseDetails?.[0]?.enrollmentStatus}
            </h1>
          </div>
          <div className="flex w-full gap-1">
            <h1 className="text-[25px] font-bold w-2/5">Course Duration :-</h1>
            <h1 className="text-[20px] w-1/2">
              {specificCourseDetails?.[0]?.duration}
            </h1>
          </div>
          <div className="flex w-full gap-1">
            <h1 className="text-[25px] font-bold w-2/5">Course Timings :-</h1>
            <h1 className="text-[20px] w-1/2">
              {specificCourseDetails?.[0]?.schedule}
            </h1>
          </div>
          <div className="flex w-full gap-1">
            <h1 className="text-[25px] font-bold w-2/5">Location :-</h1>
            <h1 className="text-[20px] w-1/2">
              {specificCourseDetails?.[0]?.location}
            </h1>
          </div>
          <div className="flex w-full gap-1">
            <h1 className="text-[25px] font-bold w-2/5">Course Syllabus :-</h1>
            <div className="w-1/2 flex flex-col">
              {specificCourseDetails?.[0]?.syllabus.map((eachOne, index) => (
                <h1 key={index} className="text-[20px]">
                  {index + 1}.{eachOne?.topic}
                </h1>
              ))}
            </div>
          </div>
          <button
            onClick={() => navigate("/courses")}
            className="border-2 h-[50px] border-white bg-black text-gray-300 font-bold text-[15px] rounded-md p-2"
          >
            {"<"}-- Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
