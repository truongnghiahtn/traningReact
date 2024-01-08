import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { getQuizAll, getListUser,postAssignToUser } from "../../../../services/apiService";

const ModalAssignToUser = ({ show, handleCloseModal }) => {
  const [difficulty, setDifficulty] = useState("EASY");
  const [title, setTitle] = useState("Assign to user");
  const [idquiz, setIdQuiz] = useState("");
  const [listQuiz, setListQuiz] = useState([]);
  const [iduser, setIdUser] = useState("");
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    getListQuiz();
    getAllUser();
  }, [show]);

  const getListQuiz = async () => {
    const data = await getQuizAll();
    if (!data.EC) {
      setListQuiz(data.DT);
      data.DT && data.DT.length > 0 && setIdQuiz(data.DT[0].id);
    }
  };
  const getAllUser = async () => {
    const data = await getListUser();
    if (!data.EC) {
      setListUser(data.DT);
      data.DT && data.DT.length > 0 && setIdUser(data.DT[0].id);
    }
  };

  const handleClose = () => {
    handleCloseModal(false);
  };
  const onSubmitForm = async () => {
    const data = await postAssignToUser(+idquiz, +iduser);
    if (!data.EC) {
      toast.success("Assign to user succes");
    }else{
      toast.error("Error Assign to user");
    } 
  };

  return (
    <>
      <Modal
        className="modal-upload-quiz"
        show={show}
        onHide={handleClose}
        size="lg"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Select Quiz</label>
              <select
                className="form-select"
                value={idquiz}
                onChange={(e) => {
                  setIdQuiz(e.target.value);
                }}
              >
                {listQuiz &&
                  listQuiz.length > 0 &&
                  listQuiz.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.id}-{item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Select User</label>
              <select
                className="form-select"
                value={iduser}
                onChange={(e) => {
                  setIdUser(e.target.value);
                }}
              >
                {listUser &&
                  listUser.length > 0 &&
                  listUser.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.id}-{item.username}-{item.email}
                      </option>
                    );
                  })}
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onSubmitForm();
            }}
          >
            Assign
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAssignToUser;
