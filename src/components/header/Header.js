import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/apiService";
import { toast } from "react-toastify";
import { logoutAction } from "../../redux/action/authAction";

const Header = () => {
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const {isAuthenticated,authUser}=useSelector((state)=>state.auth)

  const handleLogin = () => {
    navigate('/login');
  };
  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogout = async()=>{
    let data = await logout(authUser.email, authUser.refresh_token);
    if (data && !data.EC) {
      toast.success(data.EM);
      dispatch(logoutAction());
      navigate("/login");
    } else {
      toast.error(data.EM);

    }
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="light">
      <Container className="nav-container-custom">
        <NavLink to="/" className="nav-link navbar-brand">
          My app
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/user" className="nav-link">
              User
            </NavLink>
            <NavLink to="/admin" className="nav-link">
              Admin
            </NavLink>
          </Nav>
          <Nav>
            {isAuthenticated?<NavDropdown title="Setting" id="basic-nav-dropdown">
              <NavDropdown.Item >Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{handleLogout()}}>Logout</NavDropdown.Item>
            </NavDropdown>:<>
            <button className="btn btn-login" onClick={()=>{handleLogin()}}>Login</button>
            <button className="btn btn-logout" onClick={()=>{handleRegister()}}>Register</button>
            </>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
