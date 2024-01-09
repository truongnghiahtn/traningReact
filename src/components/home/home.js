import clipHomePage from "./../../assets/clip/video-homepage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation,Trans } from "react-i18next";
const Home = (props) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate=useNavigate();
  const {t}=useTranslation();
  return (
    <div className="home-container">
      <video width={500} src={clipHomePage} autoPlay muted loop></video>
      <div className="home-content">
        <div className="title-1">
          <p>
            {t('homePage.title1')}
            </p>
        </div>
        <div className="title-2">
          <p>
          {t('homePage.title2')}
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
