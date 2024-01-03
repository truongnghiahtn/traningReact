import { useState } from "react";
import "./auth.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../services/apiService";
import {  toast } from 'react-toastify';
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleSubmit= async(e)=>{
    e.preventDefault()    
    let data = null;
    try {
      data = await postLogin(email,password);
      if(data && !data.EC){
        toast.success(data.EM);
        navigate('/');
      }else{
        toast.error(data.EM);
      }
    } catch (error) {
      toast.error("Lỗi sever không xóa được user");
    }
  }

  return (
    <div className="login-container">
      <div className="login-header col-md-11 d-flex justify-content-end">
        <span>Don't have an account yet?</span>
        <button onClick={()=>{navigate('/register')}} className="btn btn-register">Register</button>
      </div>
      <div className="login-title col-md-3 mx-auto">
        <h3>My app</h3>
        <p>Hello, who’s this?</p>
      </div>

      <form onSubmit={(e)=>{handleSubmit(e)}} className="login-form">
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
        <div className="col-md-3 mx-auto">
          <label className="form-label">password</label>
          <input
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            className="form-control"
          />
        </div>
        <div className="col-md-3 mx-auto pt-3 forgot-password">
          Forgot password?
        </div>
        <div className="login-submit">
          <button className="col-md-3 btn">Login</button>
        </div>
        <div style={{textAlign:"center"}} onClick={()=>{handleGoHome()}} className="col-md-3 mx-auto forgot-password">
          Go to Homepage
        </div>
      </form>
    </div>
  );
};
export default Login;
