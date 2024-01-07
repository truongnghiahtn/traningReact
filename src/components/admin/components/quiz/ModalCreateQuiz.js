import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaFolderPlus } from "react-icons/fa";
import {
  createQuizManager,
  updateQuizManager,
} from "../../../../services/apiService";
import { toast } from "react-toastify";

const ModalCreateQuiz = ({
  show,
  handleCloseModal,
  status,
  inforQuiz,
  getListQuiz

}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [quizImage, setQuizImage] = useState("");
  const [urlImage, setUrlImage] = useState(null);
  //
  const [title, setTitle] = useState("Add new user");

  useEffect(() => {
    setDataUser();
  }, [inforQuiz]);

  const setDataUser = () => {
    if (status) {
      resetQuiz();
      setTitle("Add new quiz");
    } else {
      setTitle(" Update quiz");
      setName(inforQuiz?.name);
      setDifficulty(inforQuiz?.difficulty);
      setDescription(inforQuiz?.description);
      setQuizImage("");
      if (inforQuiz?.quizImage !== "") {
        setUrlImage(`data:image/jpeg;base64,${inforQuiz?.image}`);
      }
    }
  };

  const handleClose = () => {
    handleCloseModal(false);
    resetQuiz();
  };
  const resetQuiz = () => {
    setName("");
    setDifficulty("EASY");
    setUrlImage(null);
    setDescription("");
    setQuizImage("");
  };
  const onchangeFileImage = (e) => {
    if (e.target.files && e.target.files[0] && e.target) {
      setUrlImage(URL.createObjectURL(e.target.files[0]));
      setQuizImage(e.target.files[0]);
    }
  };

  const onSubmitForm = async () => {
    let data = null;
    if (status) {
      try {
        data = await createQuizManager(description, name, difficulty, quizImage);
        if (data && !data.EC) {
          toast.success(data.EM);
          handleClose();
          await getListQuiz();
        } else {
          toast.error(data.EM);
        }
      } catch (error) {
        toast.error("Lỗi sever không tạo được user");
      }
    } else {
      try {
        data = await updateQuizManager(inforQuiz.id, description, name, difficulty, quizImage);
        if (data && !data.EC) {
          toast.success(data.EM);
          handleClose();
          await getListQuiz();
        } else {
          toast.error(data.EM);
        }
      } catch (error) {
        toast.error("Lỗi sever không tạo được user");
      }
    }
  };

  return (
    <>
      <Modal
        className="modal-upload-quiz"
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Type</label>
              <select
                className="form-select"
                name="level"
                value={difficulty}
                onChange={(e) => {
                  setDifficulty(e.target.value);
                }}
              >
                <option value={"EASY"}>Easy</option>
                <option value={"NORMAL"}>Normal</option>
                <option value={"HARD"}>Hard</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label">Description</label>
              <input
                name="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                type="text"
                className="form-control"
              />
            </div>

            <div className="col-md-12">
              <label
                htmlFor="uploadImage"
                className="form-label input-upload-img"
              >
                <FaFolderPlus size={20} color="#4eb941" /> Upload File Image
              </label>
              <input
                type="file"
                hidden
                id="uploadImage"
                name="image"
                onChange={(e) => {
                  onchangeFileImage(e);
                }}
              />
            </div>
            <div className="col-md-12 img-preview">
              {urlImage === null ? (
                <span> Preview Image</span>
              ) : (
                <img src={urlImage} />
              )}
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
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateQuiz;
