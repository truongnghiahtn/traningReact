import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/apiService";
import "./listQuiz.scss";
import { useNavigate } from "react-router-dom";
const ListQuiz = () => {
  const [arrQuiz, setArrQuiz] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    getListQuiz();
  }, []);
  const getListQuiz = async () => {
    const data = await getQuizByUser();
    if (!data.EC) {
      setArrQuiz(data.DT);
    }
  };
  console.log(arrQuiz);
  return (
    <>
      <div className="container lizquiz-container">
        {arrQuiz &&
          arrQuiz.length > 0 &&
          arrQuiz.map((item, index) => {
            return (
              <div key={index} className="card" style={{ width: "18rem" }}>
                <img
                  src={`data:image/jpeg;base64,${item.image}`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">{item.description}</p>
                  <button className="btn btn-primary" onClick={()=>{navigate(`/quiz/${item.id}`,{ state: {quiz:item} })}}>Doing Quiz</button>
                </div>
              </div>
            );
          })}
        {arrQuiz && arrQuiz.length === 0 && <div>User don't have any quiz</div>}
      </div>
    </>
  );
};
export default ListQuiz;
