import NavDropdown from "react-bootstrap/NavDropdown";
const Languages = (props) => {
  return (
    <div className="languages">
      <NavDropdown title="VietNam" id="basic-nav-dropdown">
        <NavDropdown.Item>VietNam</NavDropdown.Item>
        <NavDropdown.Item>English</NavDropdown.Item>
      </NavDropdown>
    </div>
  );
};
export default Languages;
