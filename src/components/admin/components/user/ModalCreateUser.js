import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaFolderPlus } from "react-icons/fa";
import {createUserManager,updateUserManager} from "../../../../services/apiService";
import {  toast } from 'react-toastify';

const ModalCreateUser = ({ show, handleCloseModal,getAllUser,status,inforUser,getUserByPaginate,setCurentpage }) => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [image, setImage] = useState("");
  const [urlImage, setUrlImage] = useState(null);
  //
  const [title,setTitle]=useState("Add new user")


  useEffect(()=>{
    setDataUser()
  },[inforUser])

  const setDataUser=()=>{
    if(status){
      resetUser();
      setTitle("Add new user");
    }
    else{
      setTitle(" Update user");
      setEmail(inforUser.email);
      setPassword("");
      setRole(inforUser.role);
      setUserName(inforUser.username);
      setImage("");
      if(inforUser.image!==""){
        setUrlImage(`data:image/jpeg;base64,${inforUser.image}`);
      }
    }
  }

  const handleClose = () => {
    handleCloseModal(false);
    resetUser()
  };
  const resetUser=()=>{
    setEmail("");
    setPassword("");
    setRole("User");
    setUrlImage(null);
    setUserName("");
    setImage("");
  }
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

    if(!validateEmail(email)&&status){
      toast.error("mail của bạn không đúng");
      return;
    }
    if(!validatePassword(password)&&status){
      toast.error("Mật khẩu của bạn có ít nhất 4 ký tự,có hoa, có số !!!");
      return;
    }
    if(userName === ""){
      toast.error("Username ko được để trống");
      return;
    }
    let data = null;
    if(status){
      try {
        data = await createUserManager(email, password, userName, role, image);
        if(data && !data.EC){
          toast.success(data.EM);
          handleClose();
          setCurentpage(1);
          await getUserByPaginate(1);
        }else{
          toast.error(data.EM);
        }
      } catch (error) {
        toast.error("Lỗi sever không tạo được user");
      }
    }else{
      try {
        data = await updateUserManager(inforUser.id, userName, role, image);
        if(data && !data.EC){
          toast.success(data.EM);
          handleClose();
          setCurentpage(1)
          await getUserByPaginate(1);
        }else{
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
        className="modal-upload-user"
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
              <label className="form-label">Email</label>
              <input
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                disabled={!status}
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
                disabled={!status}
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
                <option value={"USER"}>User</option>
                <option value={"ADMIN"}>Admin</option>
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
