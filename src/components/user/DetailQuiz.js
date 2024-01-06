import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionById } from "../../services/apiService";
import { useLocation } from "react-router-dom";
import _ from "lodash";
import "./detailQuiz.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { postAnswersQuiz } from "../../services/apiService";

const DetailQuiz = () => {
  const [detailQuiz, setDetailQuiz] = useState([]);
  const [show,setShow]=useState(false);
  const [resultSubmit,setResultSubmit]=useState(null);
  const [index, setIndex] = useState(0);
  let { id } = useParams();
  const location = useLocation();
  useEffect(() => {
    // get api
    getQuestionByIdQuiz();
  }, [id]);

  const handleNext = () => {
    if (detailQuiz && index < detailQuiz.length - 1) {
      setIndex(index + 1);
    }
  };
  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };
  const handleSubmit = async() => {
    const data = {
      quizId: +id,
    };
    const answers = detailQuiz.map((item) => {
      const questionId = +item.id;
      const userAnswerId = [];
      item.answers.forEach((a) => {
        if (a.isSelected) userAnswerId.push(a.id);
      });
      return { questionId, userAnswerId };
    });
    data.answers = answers;
    let result=null
    try {
        result = await postAnswersQuiz(data);
        if(result && !result.EC){
          toast.success(result.EM);
          setResultSubmit(result.DT)
          setShow(true);
        }else{
          toast.error(result.EM);
        }
      } catch (error) {
        toast.error("Lỗi sever không xóa được user");
      }
  };

  const handdleAnswer = (data) => {
    const detailQuizClone = _.cloneDeep(detailQuiz);
    const result = detailQuizClone.map((item) => {
      if (item.id === data.idQ) {
        const element = item.answers.map((a) => {
          if (a.id === data.idA) {
            a.isSelected = !a.isSelected;
          }
          return a;
        });
        item.answers = element;
      }
      return item;
    });
    setDetailQuiz(result);
  };

  const getQuestionByIdQuiz = async () => {
    const data = await getQuestionById(id);
    if (!data.EC) {
      let result = _.chain(data.DT)
        .groupBy("id")
        .map((value, key) => {
          const answers = [];
          const { description, image } = value[0];
          value.forEach((item) => {
            const element = { ...item.answers, isSelected: false };
            answers.push(element);
          });
          return { id: key, description, image, answers };
        })
        .value();
      setDetailQuiz(result);
    }
  };
  return (
    <>
      <div className="detail-quiz-container">
        <div className="content-left">
          <div className="title">
            Quiz {location?.state?.quiz?.id}{" "}
            {location?.state?.quiz?.description}
            <hr></hr>
          </div>
          {detailQuiz && detailQuiz.length > 0 && (
            <Question
              question={detailQuiz[index]}
              index={index}
              handdleAnswer={handdleAnswer}
            />
          )}

          <div className="detal-quiz-footer">
            <button
              className="btn btn-secondary"
              onClick={() => {
                handlePrev();
              }}
            >
              Prev
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                handleNext();
              }}
            >
              Next
            </button>
            <button
              className="btn btn-success"
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="content-right">count down</div>
      </div>
      <ModalResult show={show} setShow={setShow} data={resultSubmit}/>
    </>
  );
};
export default DetailQuiz;

const Question = ({ question, index, handdleAnswer }) => {
  const handleSelect = (e, idAnswer) => {
    handdleAnswer({ idA: idAnswer, idQ: question.id });
  };
  return (
    <div className="main-content">
      <div className="detai-quiz-description">
        {question?.image && (
          <img
            src={`data:image/jpeg;base64,${question?.image}`}
            className="card-img-top"
            alt="..."
          />
        )}
      </div>

      <div className="question">
        <h3>
          Question {index + 1} : {question?.description}
        </h3>
      </div>
      <div className="answer">
        {question &&
          question.answers.map((item, i) => {
            return (
              <div key={i} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={item?.isSelected}
                  onChange={(e) => {
                    handleSelect(e, item.id);
                  }}
                />
                <label className="form-check-label">{item?.description}</label>
              </div>
            );
          })}
      </div>
    </div>
  );
};
const ModalResult = ({ show, setShow, data }) => {
  const handleClose = () => setShow(false);
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Your result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Total questions: <b>{data?.countTotal}</b>
          </div>
          <div>
            Total Correct answers: <b>{data?.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Show
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
