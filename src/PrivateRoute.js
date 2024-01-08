import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, authUser } = useSelector((state) => state.auth);
  if(!isAuthenticated){
    return<Navigate to="/login"></Navigate>
  }
  return <>{children}</>;
};
export default PrivateRoute;
