import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaFolderPlus } from "react-icons/fa";
import axios from "axios";
import {  toast } from 'react-toastify';

const ModalCreateUser = ({ show, handleCloseModal }) => {
  const handleClose = () => {
    handleCloseModal(false);
    setEmail("");
    setPassword("");
    setRole("User");
    setUrlImage(null);
    setUserName("");
    setImage("");
  };

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [image, setImage] = useState("");
  const [urlImage, setUrlImage] = useState(null);

  const onchangeFileImage = (e) => {
    if (e.target.files && e.target.files[0] && e.target) {
      setUrlImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const onSubmitForm = async () => {

    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    const validatePassword=(pw)=> {

      return /[A-Z]/       .test(pw) &&
             /[a-z]/       .test(pw) &&
             /[0-9]/       .test(pw) &&
            //  /[^A-Za-z0-9]/.test(pw) &&
             pw.length > 4;
  
  }

    if(!validateEmail(email)){
      toast.error("mail của bạn không đúng");
      return;
    }
    if(!validatePassword(password)){
      toast.error("Mật khẩu của bạn có ít nhất 4 ký tự,có hoa, có số !!!");
      return;
    }
    if(userName === ""){
      toast.error("Username ko được để trống");
      return;
    }


    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("username", userName);
    data.append("role", role);
    data.append("userImage", image);
    let result = null;
    try {
      result = await axios.post(
        "http://localhost:8081/api/v1/participant",
        data
      );
      if(result.data && !result.data.EC){
        toast.success(result.data.EM);
        handleClose();
      }else{
        toast.error(result.data.EM);
      }
    } catch (error) {
      toast.error("Lỗi sever không tạo được user");
    }
    
  };

  return (
    <>
      <Modal
        className="modal-upload-user"
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">UserName</label>
              <input
                name="userName"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                name="role"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                <option value={"User"}>User</option>
                <option value={"Admin"}>Admin</option>
              </select>
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

export default ModalCreateUser;
