import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation } from "react-i18next";
const Languages = (props) => {
  const {t, i18n}= useTranslation()
  const onchangeLanguage = (data) =>{
    i18n.changeLanguage(data);
  }
  return (
    <div className="languages">
      <NavDropdown title={i18n.language==="vi"?"VietNam":"English"} id="basic-nav-dropdown">
        <NavDropdown.Item onClick={()=>{onchangeLanguage("vi")}}>VietNam</NavDropdown.Item>
        <NavDropdown.Item onClick={()=>{onchangeLanguage("en")}}>English</NavDropdown.Item>
      </NavDropdown>
    </div>
  );
};
export default Languages;
