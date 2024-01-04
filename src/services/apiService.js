import axios from "../untils/customAxios";

const createUserManager = (email, password, userName, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", userName);
  data.append("role", role);
  data.append("userImage", image);
  return axios.post("v1/participant", data);
};
const updateUserManager = (id, userName, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", userName);
  data.append("role", role);
  data.append("userImage", image);
  return axios.put("v1/participant", data);
};

const getListUser =()=>{
    return axios.get("v1/participant/all");
}
const getListUserByPaginate =(page,limit)=>{
  return axios.get(`v1/participant?page=${page}&limit=${limit}`);
}
const deleteUser =(userId)=>{
  return axios.delete("v1/participant",{data:{id:userId}});
}

const postLogin=(email,password)=>{
  return axios.post("v1/login",{email,password,delay:2000});
}
const postRegister=(email,username,password)=>{
  return axios.post("v1/register",{email,username,password});
}


//
const getQuizByUser=()=>{
  return axios.get("v1/quiz-by-participant");
}


export {createUserManager, getListUser,updateUserManager,deleteUser,getListUserByPaginate,postLogin,postRegister,getQuizByUser};