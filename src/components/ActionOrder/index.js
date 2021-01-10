import React from 'react'
import dateFormat from 'dateformat';
import {OrderActionDropDown} from '../Atoms';
import {CancelIcon} from '../../assets';
import {Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import {useHistory} from 'react-router-dom';

const ActionOrder = ({id, number, fullname, title, price, description, startDate, endDate,status, handleOrder}) => {
    const router = useHistory();
    let numbering = number + 1;
    const [modalShow, setModalShow] = React.useState(false);

    function ViewOrderModal (props) {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body className="make-payment">
            <p>
                Title : {title}
            </p>
            <p>
                Description : {description}
            </p>
            <p>
                Price : {price}
            </p>
            <div className="row d-flex justify-content-center">
              <Button onClick={()=> handleOrder(id)} className="btn-hire">Yes</Button>&nbsp;
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
            <td className="orderdata" onClick={()=>setModalShow(true)}>{numbering}</td>
            <td className="orderdata" onClick={()=>setModalShow(true)}>{fullname}</td>
            <td className="orderdata" onClick={()=>setModalShow(true)}>{title}</td>
            <td width="15%" className="orderdata" onClick={()=>setModalShow(true)}>{dateFormat(startDate, "dddd, mmm dS, yyyy")}</td>
            <td width="15%" className="orderdata" onClick={()=>setModalShow(true)}>{dateFormat(endDate, "dddd, mmm dS, yyyy")}</td>
            <td className="orderdata" onClick={()=>setModalShow(true)}>{
                status === "Cancel" ? <>You Canceled this order</> : 
                status === "waiting" ?  <>Waiting Your Approval</> : 
                status === "Finished" ? <>You Finished this order</> : <>You Approved this order</>
                }</td>
            <td>
                {
                    status === "Cancel" ? <img src={CancelIcon}></img> : 
                    status === "Finished" ? <><Button onClick={()=>ViewProject(id)} className="btn-green">View Project</Button></> : <><OrderActionDropDown id={id} status={status} handleOrder={handleOrder}/></>
                }
            </td>
            <ViewOrderModal show={modalShow} onHide={() => setModalShow(false)}/>
        </tr>
        </>
    )
}

export default ActionOrder
