import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

const TableUser = ({ listUser, updateUser, deleteUser,pageCount,getUserByPaginate }) => {

  const handlePageClick = (event) => {
    console.log(event.selected);
    getUserByPaginate(+event.selected+1)
  };
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Email</th>
            <th scope="col">User name</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="btn btn-secondary"> View</button>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => {
                        updateUser(user);
                      }}
                    >
                      {" "}
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteUser(user);
                      }}
                    >
                      {" "}
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {listUser && listUser.length === 0 && (
            <tr>
              <th colSpan={5}> Không có thông tin</th>
            </tr>
          )}
        </tbody>
      </table>
      <div>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      </div>
    </>
  );
};
export default TableUser;
