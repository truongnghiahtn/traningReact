export const LOGIN="LOGIN";
export const LOGOUT="LOGOUT";

export const loginAction = (data) =>{
    return {
        type:LOGIN,
        payload:data
    }
}

export const logoutAction=()=>{
    return{
        type:LOGOUT
    }
}