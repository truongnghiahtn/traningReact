import { LOGIN, LOGOUT } from "../action/authAction";
const INITIAL_STATE = {
  authUser: {
    access_token: "",
    refresh_token: "",
    username: "",
    role: "",
    email: "",
    image: "",
  },
  isAuthenticated: false,
};
const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        authUser: { ...action?.payload?.DT },
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        authUser: {
          access_token: "",
          refresh_token: "",
          username: "",
          role: "",
          email: "",
          image: "",
        },
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
