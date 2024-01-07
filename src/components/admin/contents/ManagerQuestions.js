import ModalCreateQuestion from "../components/question/ModalCreateQuestion";
import { useState, useEffect } from "react";
import "./ManagerQuestion.scss";

const ManagerQuestion = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="manager-question-container">
        <div className="title">ManagerQuiz</div>
        <div className="quiz-content ">
          <div className="add-question">
            <button
              className="btn btn-primary"
              onClick={()=>{setShowModal(true)}}
            >
              Add new Question
            </button>
          </div>
          <div className="table-question">  
            table
          </div>
        </div>
      </div>
      <ModalCreateQuestion show={showModal} handleCloseModal={setShowModal}/>
    </>
  );
};
export default ManagerQuestion;
