import { useState, useEffect } from "react";
import ModalCreateQuiz from "./../components/quiz/ModalCreateQuiz";
import "./managerQuiz.scss";
import TableQuiz from "../components/quiz/TableQuiz";
import { getQuizAll } from "../../../services/apiService";
import ModalDeleteQuiz from "../components/quiz/ModalDeleteQuiz";

const ManagerQuiz = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [listQuiz, setListQuiz] = useState([]);
  const [statusAdd, setStatusAdd] = useState(true);
  const [inforQuizUpdate, setInforQuizUpdate] = useState({});
  const [inforQuizDelete, setInforQuizDelete] = useState({});
  useEffect(() => {
    getListQuiz()
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
          <button
            className="btn btn-primary"
            onClick={() => {
              createUser();
            }}
          >
            Add new quiz
          </button>
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
        getListQuiz ={getListQuiz }
      />
      <ModalDeleteQuiz
        show={showModalDelete}
        setShow={setShowModalDelete}
        inforQuiz={inforQuizDelete}
        getListQuiz ={getListQuiz }
      />
    </div>
  );
};
export default ManagerQuiz;
