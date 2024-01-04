import { useState, useEffect } from "react";
import ModalCreateUser from "./../components/ModalCreateUser";
import "./managerUser.scss";
import TableUser from "../components/TableUser";
import { getListUser, getListUserByPaginate } from "../../../services/apiService";
import ModalDeleteUser from "../components/ModalDeleteUser";

const ManagerUser = (props) => {
  const LIMIT = 8;
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [statusAdd, setStatusAdd] = useState(true);
  const [inforUserUpdate, setInforUserUpdate] = useState({});
  const [inforUserDelete, setInforUserDelete] = useState({});
  const [pageCount, setPageCount] = useState(0);
  const [curentpage, setCurentpage] = useState(1);
  useEffect(() => {
    getUserByPaginate(curentpage);
  }, []);

  const getAllUser = async () => {
    const data = await getListUser();
    if (!data.EC) {
      setListUser(data.DT.reverse());
    }
  };
  const getUserByPaginate = async (page) => {
    const data = await getListUserByPaginate(page, LIMIT);
    if (!data.EC) {
      setListUser(data.DT.users);
      setPageCount(data.DT.totalPages);
    }
  };
  const createUser = () => {
    setStatusAdd(true);
    setShowModal(true);
    setInforUserUpdate({});
  };
  const updateUser = (user) => {
    setInforUserUpdate({ ...user });
    setStatusAdd(false);
    setShowModal(true);
  };
  const deleteUser = (user) => {
    setInforUserDelete({ ...user });
    setShowModalDelete(true);
  };

  return (
    <div className="manager-user-container">
      <div className="title">ManagerUser</div>
      <div className="user-content ">
        <div className="add-user">
          <button
            className="btn btn-primary"
            onClick={() => {
              createUser();
            }}
          >
            Add new user
          </button>
        </div>
        <div className="table-user">
          <TableUser
            listUser={listUser}
            updateUser={updateUser}
            deleteUser={deleteUser}
            pageCount={pageCount}
            getUserByPaginate={getUserByPaginate}
            setCurentpage={setCurentpage}
            curentpage={curentpage}
          />
        </div>
      </div>
      <ModalCreateUser
        show={showModal}
        status={statusAdd}
        inforUser={inforUserUpdate}
        handleCloseModal={setShowModal}
        getAllUser={getAllUser}
        getUserByPaginate={getUserByPaginate}
        setCurentpage={setCurentpage}
      />
      <ModalDeleteUser
        show={showModalDelete}
        setShow={setShowModalDelete}
        inforUser={inforUserDelete}
        getAllUser={getAllUser}
        getUserByPaginate={getUserByPaginate}
        setCurentpage={setCurentpage}
      />
    </div>
  );
};
export default ManagerUser;
