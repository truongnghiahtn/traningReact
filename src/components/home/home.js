import clipHomePage from "./../../assets/clip/video-homepage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Home = (props) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate=useNavigate();
  return (
    <div className="home-container">
      <video width={500} src={clipHomePage} autoPlay muted loop></video>
      <div className="home-content">
        <div className="title-1">
          <p>Forms that break the norm </p>
        </div>
        <div className="title-2">
          <p>
            Get more data—like signups, feedback, and anything else—with forms
            designed to be refreshingly different.
          </p>
        </div>
        <div className="title-3">
          {!isAuthenticated ? (
            <button className="btn btn-home" onClick={()=>{navigate("/login")}}>Get Started-It free</button>
          ) : (
            <button className="btn btn-home" onClick={()=>{navigate("/user")}}> Doing quiz</button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
