


const TableQuiz = ({ listQuiz, updateQuiz, deleteQuiz }) => {
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Level</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.length > 0 &&
            listQuiz.map((quiz, index) => {
              return (
                <tr key={index}>
                  <td>{quiz.id}</td>
                  <td>{quiz.name}</td>
                  <td>{quiz.description}</td>
                  <td>{quiz.difficulty}</td>
                  <td>
                    <button className="btn btn-secondary"> View</button>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => {
                        updateQuiz(quiz);
                      }}
                    >
                      {" "}
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteQuiz(quiz);
                      }}
                    >
                      {" "}
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {listQuiz && listQuiz.length === 0 && (
            <tr>
              <th colSpan={5}> Không có thông tin</th>
            </tr>
          )}
        </tbody>
      </table>
      <div>
      </div>
    </>
  );
};
export default TableQuiz;
