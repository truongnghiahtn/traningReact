import { useState } from "react";
import ModalCreateUser from "./../components/ModalCreateUser"
import "./managerUser.scss"

const ManagerUser = (props) => {
    const [showModal,setShowModal]= useState(false);

  return (
    <div className="manager-user-container">
      <div className="title">ManagerUser</div>
      <div className="user-content ">
        <div>
          <button onClick={()=>{setShowModal(true)}} >Add new user</button>
          <ModalCreateUser show={showModal} handleCloseModal={setShowModal}/>
        </div>
        <div>table</div>
      </div>
    </div>
  );
};
export default ManagerUser;
