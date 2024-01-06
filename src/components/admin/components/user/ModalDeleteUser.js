import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {deleteUser} from "../../../../services/apiService";
import {  toast } from 'react-toastify';
const ModalDeleteUser = ({show, setShow,inforUser,getAllUser,getUserByPaginate,setCurentpage}) => {

    const handleClose = () => setShow(false);

    const onDelete= async()=>{

        let data = null;

      try {
        data = await deleteUser(inforUser.id);
        if(data && !data.EC){
          toast.success(data.EM);
          handleClose();
          setCurentpage(1);
          await getUserByPaginate(1);
        }else{
          toast.error(data.EM);
        }
      } catch (error) {
        toast.error("Lỗi sever không xóa được user");
      }
    }
  
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure delete user: <b>{inforUser.email}</b></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalDeleteUser;
