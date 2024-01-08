import { useState, useEffect } from "react";
import ModalCreateQuiz from "./../components/quiz/ModalCreateQuiz";
import "./managerQuiz.scss";
import TableQuiz from "../components/quiz/TableQuiz";
import { getQuizAll } from "../../../services/apiService";
import ModalDeleteQuiz from "../components/quiz/ModalDeleteQuiz";
import ModalUpdateAnswer from "../components/quiz/ModalUpdateAnswer";
import ModalAssignToUser from "../components/quiz/ModalAssignToUser";

const ManagerQuiz = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [listQuiz, setListQuiz] = useState([]);
  const [statusAdd, setStatusAdd] = useState(true);
  const [inforQuizUpdate, setInforQuizUpdate] = useState({});
  const [inforQuizDelete, setInforQuizDelete] = useState({});
  const[showModalUpdateAnswer,setShowModalUpdateAnswer]=useState(false);
  const[showModalAssign,setShowModalAssign]=useState(false);
  useEffect(() => {
    getListQuiz();
  }, []);

  const getListQuiz = async () => {
    const data = await getQuizAll();
    if (!data.EC) {
      setListQuiz(data.DT);
    }
  };
  const createUser = () => {
    setStatusAdd(true);
    setShowModal(true);
    setInforQuizUpdate({});
  };
  const updateQuiz = (quiz) => {
    setInforQuizUpdate({ ...quiz });
    setStatusAdd(false);
    setShowModal(true);
  };
  const deleteQuiz = (quiz) => {
    setInforQuizDelete({ ...quiz });
    setShowModalDelete(true);
  };

  return (
    <div className="manager-quiz-container">
      <div className="title">ManagerQuiz</div>
      <div className="quiz-content ">
        <div className="add-quiz">
          <div>
            <button
              className="btn btn-primary"
              onClick={() => {
                createUser();
              }}
            >
              Add new quiz
            </button>
            <button className="btn btn-warning" onClick={()=>{setShowModalUpdateAnswer(true)}}>Update Answer</button>
          </div>

          <button className="btn btn-success" onClick={()=>{setShowModalAssign(true)}}>Assign to user</button>
        </div>
        <div className="table-quiz">
          <TableQuiz
            listQuiz={listQuiz}
            updateQuiz={updateQuiz}
            deleteQuiz={deleteQuiz}
          />
        </div>
      </div>
      <ModalCreateQuiz
        show={showModal}
        status={statusAdd}
        inforQuiz={inforQuizUpdate}
        handleCloseModal={setShowModal}
        getListQuiz={getListQuiz}
      />
      <ModalDeleteQuiz
        show={showModalDelete}
        setShow={setShowModalDelete}
        inforQuiz={inforQuizDelete}
        getListQuiz={getListQuiz}
      />
      <ModalUpdateAnswer show={showModalUpdateAnswer} handleCloseModal={setShowModalUpdateAnswer}/>
      <ModalAssignToUser show={showModalAssign} handleCloseModal={setShowModalAssign}/>
      
    </div>
  );
};
export default ManagerQuiz;
