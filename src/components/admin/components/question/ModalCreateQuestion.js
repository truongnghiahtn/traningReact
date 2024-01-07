import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { RiImageAddFill } from "react-icons/ri";
import { MdOutlineAddBox, MdOutlineDeleteOutline } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import {
  postCreateQuestion,
  postCreateAnswer,
  getQuizAll,
} from "../../../../services/apiService";

const ModalCreateQuestion = ({ show, handleCloseModal }) => {
  const [title, setTitle] = useState("Add new question");
  const [question, setQuestion] = useState([
    {
      id: uuidv4(),
      description: "",
      image: "",
      nameImage: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ]);
  const [idquiz, setIdQuiz] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [dataImage, setDataImage] = useState({
    name: "",
    url: "",
  });
  const [listQuiz, setListQuiz] = useState([]);
  useEffect(() => {
    getListQuiz();
  }, []);

  const getListQuiz = async () => {
    const data = await getQuizAll();
    if (!data.EC) {
      setListQuiz(data.DT);
      data.DT && data.DT.length > 0 && setIdQuiz(data.DT[0].id);
    }
  };

  const resetData = () => {
    setIdQuiz(1);
    setQuestion([
      {
        id: uuidv4(),
        description: "",
        image: "",
        nameImage: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      },
    ]);
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: uuidv4(),
      description: "",
      image: "",
      nameImage: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    };
    const cloneQuestions = _.cloneDeep(question);
    cloneQuestions.push(newQuestion);
    setQuestion(cloneQuestions);
  };

  const handleAddAnswer = (id) => {
    const newAnswer = {
      id: uuidv4(),
      description: "",
      isCorrect: false,
    };
    const cloneQuestions = _.cloneDeep(question);
    const index = cloneQuestions.findIndex((q) => id === q.id);
    cloneQuestions[index].answers.push(newAnswer);
    setQuestion(cloneQuestions);
  };

  const handleRemoveQuestion = (id) => {
    const cloneQuestions = _.cloneDeep(question);
    const newQuestion = cloneQuestions.filter((q) => {
      return q.id !== id;
    });
    setQuestion(newQuestion);
  };
  const handleRemoveAnswer = (idq, ida) => {
    const cloneQuestions = _.cloneDeep(question);
    const index = cloneQuestions.findIndex((q) => idq === q.id);
    const newAnswer = cloneQuestions[index].answers.filter((a) => {
      return a.id !== ida;
    });
    cloneQuestions[index].answers = newAnswer;
    setQuestion(cloneQuestions);
  };

  const onchangeQuestion = (e, idQ) => {
    const cloneQuestions = _.cloneDeep(question);
    const newQuestion = cloneQuestions.map((item) => {
      if (item.id === idQ) item.description = e.target.value;
      return item;
    });
    setQuestion(newQuestion);
  };

  const onchangeFileImage = (e, idQ) => {
    const cloneQuestions = _.cloneDeep(question);
    let newQuestion = cloneQuestions;
    if (e.target.files && e.target.files[0] && e.target) {
      newQuestion = cloneQuestions.map((item) => {
        if (item.id === idQ) {
          // item.image = URL.createObjectURL(e.target.files[0]);
          item.image = e.target.files[0];
          item.nameImage = e.target.files[0].name;
        }
        return item;
      });
    }
    setQuestion(newQuestion);
  };
  const onchangeAnsWer = (e, type, idQ, idA) => {
    const cloneQuestions = _.cloneDeep(question);
    const index = cloneQuestions.findIndex((q) => idQ === q.id);
    const newAnswer = cloneQuestions[index].answers.map((item) => {
      if (item.id === idA) {
        if (type === "checkbox") {
          item.isCorrect = !item.isCorrect;
        } else {
          item.description = e.target.value;
        }
      }
      return item;
    });
    cloneQuestions[index].answers = newAnswer;
    setQuestion(cloneQuestions);
  };
  const preViewImage = (data) => {
    setShowImage(true);
    setDataImage(data);
  };

  const onSubmitForm = async () => {
    // await Promise.all( // logic promis
    //   question.map(async (q) => {
    //     const res = await postCreateQuestion(+idquiz, q.description, q.image);
    //     await Promise.all(
    //       q.answers.map(async (a) => {
    //         const res1 = await postCreateAnswer(
    //           a.description,
    //           a.isCorrect,
    //           res.DT.id
    //         );
    //         console.log(res1);
    //       })
    //     );
    //   })
    // );
    // valid question and answer
    let isvalidQ = false;
    let isvalidA = false;
    for (let index = 0; index < question.length; index++) {
      const q = question[index];
      if (q.description === "") {
        isvalidQ = true;
      }
      for (let j = 0; j < q.answers.length; j++) {
        const a = q.answers[j];
        if (a.description === "") {
          isvalidA = true;
          break;
        }
      }
      if (isvalidA || isvalidQ) break;
    }
    if (isvalidA || isvalidQ) {
      toast.error("ban chưa điền đủ thông tin câu hỏi hoạc trả lời");
      return;
    }

    try {
      for (const q of question) {
        const res = await postCreateQuestion(+idquiz, q.description, q.image);
        for (const a of q.answers) {
          const res1 = await postCreateAnswer(
            a.description,
            a.isCorrect,
            res.DT.id
          );
        }
      }
      toast.success("Tạo thành công câu hỏi");
    } catch (error) {
      toast.error("Lỗi serve");
    }
  };
  const handleClose = () => {
    handleCloseModal(false);
    resetData();
  };

  return (
    <>
      <Modal
        className="modal-upload-question"
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
            {question &&
              question.length > 0 &&
              question.map((q) => {
                return (
                  <div key={q.id}>
                    <div className="row col-md-12">
                      <div
                        className="col-md-6 "
                        style={{ paddingLeft: "8px", paddingRight: "0" }}
                      >
                        <label className="form-label">Description</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            onchangeQuestion(e, q.id);
                          }}
                        />
                      </div>
                      <div className="col-md-2 upload-img">
                        <label
                          htmlFor={q.id}
                          className="form-label input-upload-img"
                        >
                          <RiImageAddFill size={20} />{" "}
                        </label>
                        <span
                          style={{
                            color: "#8d9ea1",
                            padding: "6px 5px",
                            cursor: "pointer",
                          }}
                        >
                          {q.nameImage ? (
                            <span
                              onClick={() => {
                                preViewImage({
                                  name: q.nameImage,
                                  url: URL.createObjectURL(q.image),
                                });
                              }}
                            >
                              {q.nameImage}
                            </span>
                          ) : (
                            "0 file up load"
                          )}
                        </span>
                        <input
                          type="file"
                          hidden
                          id={q.id}
                          onChange={(e) => onchangeFileImage(e, q.id)}
                        />
                      </div>
                      <div className="col-md-3 action-question">
                        <MdOutlineAddBox
                          className="add"
                          onClick={() => {
                            handleAddQuestion();
                          }}
                        />
                        {question.length > 1 ? (
                          <MdOutlineDeleteOutline
                            className="remove"
                            onClick={() => {
                              handleRemoveQuestion(q.id);
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    {q.answers &&
                      q.answers.length > 0 &&
                      q.answers.map((a) => {
                        return (
                          <div
                            key={a.id}
                            className="row col-md-9 option-answer"
                          >
                            <div
                              className="form-check"
                              style={{ width: "30px" }}
                            >
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                onChange={(e) => {
                                  onchangeAnsWer(e, "checkbox", q.id, a.id);
                                }}
                              />
                            </div>
                            <div className="col-md-6">
                              <input
                                type="text"
                                className="form-control"
                                onChange={(e) => {
                                  onchangeAnsWer(e, "description", q.id, a.id);
                                }}
                              />
                            </div>
                            <div className="col-md-2 action-answer">
                              <MdOutlineAddBox
                                className="add"
                                onClick={() => {
                                  handleAddAnswer(q.id);
                                }}
                              />
                              {q.answers.length > 1 ? (
                                <MdOutlineDeleteOutline
                                  className="remove"
                                  onClick={() => {
                                    handleRemoveAnswer(q.id, a.id);
                                  }}
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                );
              })}
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
      {showImage == true && (
        <Lightbox
          onClose={() => {
            setShowImage(false);
          }}
          image={`${dataImage.url}`}
          title={dataImage.name}
        ></Lightbox>
      )}
    </>
  );
};

export default ModalCreateQuestion;
