import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaFolderPlus } from "react-icons/fa";

const ModalCreateUser = ({ show, handleCloseModal }) => {
  const handleClose = () => {
    handleCloseModal(false);
  };

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [image, setImage] = useState("");
  const [urlImage, setUrlImage] = useState(null);

  const onchangeFileImage = (e) => {
    console.log(e);
    if (e.target.files && e.target.files[0] && e.target) {
      setUrlImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
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
            <div className="col-md-4">
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
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateUser;
