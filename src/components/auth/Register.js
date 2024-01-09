import { useState } from "react";
import "./auth.scss";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../services/apiService";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import Languages from "../header/Languages";
const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [hiddenPass, setHiddenPass] = useState(true);
  const [loading,setLoading]=useState(false);

  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = null;
    setLoading(true);
    try {
      data = await postRegister(email, userName, password);
      if (data && !data.EC) {
        toast.success(data.EM);
        setLoading(false);
        navigate("/login");
      } else {
        setLoading(false);
        toast.error(data.EM);
      }
    } catch (error) {
      toast.error("Lỗi sever không xóa được user");
    }
  };

  return (
    <div className="login-container">
      <div className="login-header col-md-11 d-flex justify-content-end">
        <span>Already have an account?</span>
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="btn btn-register"
        >
          Login
        </button>
        <Languages/>
      </div>
      <div className="login-title col-md-3 mx-auto">
        <h3>My app</h3>
        <p>
          Get better data with conversational forms, surveys, quizzes & more.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="login-form"
      >
        <div className="col-md-3 mx-auto">
          <label className="form-label">Email</label>
          <input
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            className="form-control"
          />
        </div>
        <div className="col-md-3 mx-auto input">
          <label className="form-label">password</label>
          <input
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type={hiddenPass ? "password" : "text"}
            className="form-control"
          />
          {hiddenPass ? (
            <span
              className="icon"
              onClick={() => {
                setHiddenPass(false);
              }}
            >
              <FaRegEyeSlash />
            </span>
          ) : (
            <span
              className="icon"
              onClick={() => {
                setHiddenPass(true);
              }}
            >
              <FaRegEye />
            </span>
          )}
        </div>
        <div className="col-md-3 mx-auto">
          <label className="form-label">userName</label>
          <input
            name="userName"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            type="text"
            className="form-control"
          />
        </div>
        <div className="login-submit">
          <button className="col-md-3 btn btn-primary" disabled={loading}>
            {loading?<ImSpinner9 className="loading icon-loading" />:""}
            Register
          </button>
        </div>
        <div
          style={{ textAlign: "center" }}
          onClick={() => {
            handleGoHome();
          }}
          className="col-md-3 mx-auto forgot-password"
        >
          Go to Homepage
        </div>
      </form>
    </div>
  );
};
export default Register;
