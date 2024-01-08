import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./components/home/Home";
import User from "./components/user/User";
import Admin from "./components/admin/Admin";
import ManagerUser from "./components/admin/contents/ManagerUser";
import Dashboard from "./components/admin/contents/Dashboard";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListQuiz from "./components/user/ListQuiz";
import DetailQuiz from "./components/user/DetailQuiz";
import ManagerQuiz from "./components/admin/contents/ManagerQuiz";
import ManagerQuestion from "./components/admin/contents/ManagerQuestions";
import PrivateRoute from "./PrivateRoute";

const PageNotFound = () => {
  return (
    <div className="alert alert-danger" role="alert">
      Page not found 404
    </div>
  );
};
const Layout = (props) => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="user" element={<PrivateRoute><ListQuiz /></PrivateRoute>} />
          </Route>
          <Route path="quiz/:id" element={<DetailQuiz />} />
          <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="manager-user" element={<ManagerUser />} />
            <Route path="manager-quiz" element={<ManagerQuiz />} />
            <Route path="manager-questions" element={<ManagerQuestion />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
};
export default Layout;
