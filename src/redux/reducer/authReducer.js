
import { LOGIN } from "../action/authAction";
const INITIAL_STATE = {
    authUser:{
        access_token:"",
        refresh_token: "",
        username: "",
        role: "",
        email: "",
        image: ""
    },
    isAuthenticated:false
};
const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN:
            console.log(action.payload)
            return {
                ...state,
                auth:{...action?.payload?.DT},
                isAuthenticated:true
            };
        default: return state;
    }
};

export default authReducer;