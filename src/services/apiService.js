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

const getListUser = () => {
  return axios.get("v1/participant/all");
};
const getListUserByPaginate = (page, limit) => {
  return axios.get(`v1/participant?page=${page}&limit=${limit}`);
};
const deleteUser = (userId) => {
  return axios.delete("v1/participant", { data: { id: userId } });
};

const postLogin = (email, password) => {
  return axios.post("v1/login", { email, password, delay: 2000 });
};
const postRegister = (email, username, password) => {
  return axios.post("v1/register", { email, username, password });
};

const getQuestionById = (id) => {
  return axios.get(`v1/questions-by-quiz?quizId=${id}`);
};

//
const getQuizByUser = () => {
  return axios.get("v1/quiz-by-participant");
};
const postAnswersQuiz = (data) => {
  return axios.post("v1/quiz-submit", { ...data });
};
const createQuizManager = (description, name, difficulty, image) => {
  const data = new FormData();
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", image);
  return axios.post("v1/quiz", data);
};
const getQuizAll = () => {
  return axios.get("v1/quiz/all");
};
const updateQuizManager = (id, description, name, difficulty, quizImage) => {
  const data = new FormData();
  data.append("id", id);
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", quizImage);
  return axios.put("v1/quiz", data);
};

const deleteQuiz = (id) => {
  return axios.delete(`v1/quiz/${id}`);
};

const postCreateQuestion=(quiz_id,description,questionImage)=>{
  const data = new FormData();
  data.append("quiz_id", quiz_id);
  data.append("description", description);
  data.append("questionImage", questionImage);
  return axios.post("v1/question", data);
}

const postCreateAnswer=(description, correct_answer, question_id)=>{
  return axios.post("v1/answer", { description, correct_answer, question_id });
}
const postAssignToUser=(quizId, userId)=>{
  return axios.post("v1/quiz-assign-to-user", { quizId, userId });
}
const getQuestionByIdQuiz = (id) => {
  return axios.get(`v1/quiz-with-qa/${id}`);
};
const postUpdateQuestion=(data)=>{
  return axios.post("v1/quiz-upsert-qa", { ...data });
}
const logout=(email,refresh_token)=>{
  return axios.post("v1/logout", { email,refresh_token });
}


export {
  createUserManager,
  getListUser,
  updateUserManager,
  deleteUser,
  getListUserByPaginate,
  postLogin,
  postRegister,
  getQuizByUser,
  getQuestionById,
  postAnswersQuiz,
  createQuizManager,
  getQuizAll,
  updateQuizManager,
  deleteQuiz,
  postCreateQuestion,
  postCreateAnswer,
  postAssignToUser,
  getQuestionByIdQuiz,
  postUpdateQuestion,
  logout
};
