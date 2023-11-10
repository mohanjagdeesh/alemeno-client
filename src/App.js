import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import PrivateRoutes from "./utils/PrivateRoutes";
import Courses from "./components/courses/Courses";
import Profile from "./components/home/Profile";
import SignUp from "./components/login/SignUp";
import CourseDetails from "./components/courses/CourseDetails";
function App() {
  return (
    <div className=" font-mono">
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/courses" element={<Courses />} exact />
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/courses/:id" element={<CourseDetails />} exact />
        </Route>
        <Route path="/login" element={<Login />} exact />
        <Route path="/signup" element={<SignUp />} exact />
        <Route path="/" element={<Home />} exact />
      </Routes>
    </div>
  );
}

export default App;
