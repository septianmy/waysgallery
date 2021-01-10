import React from 'react'
import dateFormat from 'dateformat';
import {Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import {useHistory} from 'react-router-dom';
import { API } from "../../config/api";

const ActionOffer = ({id, number, fullname, title, startDate, endDate,status,fetchOffers}) => {
    const router = useHistory();
    let numbering = number + 1;
    const [modalShow, setModalShow] = React.useState(false);

    const handleDelete = async (id) => {
        console.log("Cancel", id);
        try {
            const response = await API.delete(`/order/${id}`);
            setModalShow(false);
            fetchOffers();
        } catch (error) {
            console.log(error);
        }
    }

    function DeleteModal (props) {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body className="make-payment">
            <p>
                Are you sure to cancel offer "{title}" to {fullname} ?
            </p>
            <div className="row d-flex justify-content-center">
              <Button onClick={()=> handleDelete(id)} className="btn-hire">Yes</Button>&nbsp;
              <Button onClick={()=> setModalShow(false)} className="btn-follow">No</Button>
            </div>
            </Modal.Body>
          </Modal>
        );
    };

    const ViewProject = (id) => {
        router.push(`viewproject/${id}`);
    };

    return (
        <>
        <tr>
            <td>{numbering}</td>
            <td>{fullname}</td>
            <td>{title}</td>
            <td>{dateFormat(startDate, "dddd, mmm dS, yyyy")}</td>
            <td>{dateFormat(endDate, "dddd, mmm dS, yyyy")}</td>
            <td>{
                status === "waiting" ? <>Waiting Approval Artist</> :
                status === "Cancel" ? <>Canceled by Artist</> : 
                status === "Finished" ? <>Project Completed</> :
                <>Approved by Artist</>
                }</td>
            <td align="center">{
                status === "Approved" ? <>Waiting Artist upload Project</> : 
                status === "Finished" ? <Button onClick={()=>ViewProject(id)} className="btn-green">View Project</Button> :
                <Button onClick={()=> setModalShow(true)} className="btn-danger">Cancel</Button> 
            }</td>
        </tr>
        <DeleteModal show={modalShow} onHide={() => setModalShow(false)}/>
        </>
    )
}

export default ActionOffer
