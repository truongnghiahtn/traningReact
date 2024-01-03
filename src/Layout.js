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
const Layout = (props) => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="user" element={<User />} />
          </Route>
          <Route path="/admin" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="manager-user" element={<ManagerUser />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
