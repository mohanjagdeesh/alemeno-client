import axios from "../utils/axiosInstance";

export const getSpecificCourse = async (courseId) => {
  try {
    const response = await axios.get(`/courses?courseId=${courseId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getFilteredCourses = async (searchInput) => {
  try {
    const response = await axios.get(`/courses/search?q=${searchInput}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
