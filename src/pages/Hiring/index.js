import {Button} from 'react-bootstrap';
import React, { useState, useEffect, useContext} from "react";
import { useParams, Link } from "react-router-dom";
import {API} from '../../config/api';
import { Header } from '../../components'
import {AppContext} from '../../context/appContext';
import Modal from 'react-bootstrap/Modal';
import './hiring.scss';

const Hiring = () => {
    let {id} = useParams();
    const [modalShow, setModalShow] = React.useState(false);
    const [state, dispatch] = useContext(AppContext);
    const {user} = state;
    const [formData, setFormData ] = useState({
        title: "",
        description : "",
        startDate: "",
        endDate:"",
        price:"",
        hiringBy:user.id,
        hiringTo:id,
        status:"waiting"
      });

    const {title, description, startDate,endDate,price,hiringBy,hiringTo,status} = formData;

    function HiringSuccess(props) {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body className="make-payment">
            <Link to="/myoffer">
                <p>
                    We have sent your offer, please wait for the artist to accept it
                </p>
            </Link>
            </Modal.Body>
          </Modal>
        );
      };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value });
        console.log(formData);
      };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = JSON.stringify({title,description,startDate,endDate,price,hiringBy,hiringTo,status});
            const config = {
              headers: {
                  "Content-Type":"application/json",
              },
          }; 
          const response = await API.post("/order", body, config);
          setModalShow(true);
          setFormData({
            title: "",
            description : "",
            startDate: "",
            endDate:"",
            price:"",
            hiringBy:user.id,
            hiringTo:id,
            status:"waiting"
          });
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="hiring">
            <Header></Header>
            <div className="container mt-4">
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="row justify-content-center">
                <div className="col-8">
                    <div className="form-group">
                        <input 
                            className="form-control" 
                            placeholder="Title"
                            name="title"
                            value={title}
                            onChange={(e) => handleChange(e)}
                        ></input>
                    </div>
                </div>
                </div>
                <div className="row justify-content-center">
                <div className="col-8">
                    <div className="form-group">
                        <textarea 
                            className="form-control" 
                            placeholder="Description" 
                            name="description" 
                            value={description}
                            onChange={(e) => handleChange(e)}
                        ></textarea>
                    </div>
                </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-4">
                        <div className="form-group">
                            <input 
                                type="date" 
                                className="form-control" 
                                placeholder="Start Date"
                                name="startDate"
                                value={startDate}
                                onChange={(e) => handleChange(e)}
                            ></input>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <input 
                                type="date" 
                                className="form-control" 
                                placeholder="End Date"
                                name="endDate"
                                value={endDate}
                                onChange={(e) => handleChange(e)}
                            ></input>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                <div className="col-8">
                    <div className="form-group">
                        <input 
                            className="form-control" 
                            placeholder="Price"
                            name="price"
                            value={price}
                            onChange={(e) => handleChange(e)}
                        ></input>
                    </div>
                        <input 
                            type="hidden"
                            className="form-control" 
                            placeholder="orderby"
                            name="hiringBy"
                            value={hiringBy}
                        ></input>
                        <input 
                            type="hidden"
                            className="form-control" 
                            placeholder="orderto"
                            name="hiringTo"
                            value={hiringTo}
                        ></input>
                    
                </div>
                </div>
                <div className="row justify-content-center">
                        <Link to="/"><Button className="btn-follow">Cancel</Button></Link>&nbsp;<Button type="submit" className="btn-hire">Bidding</Button>
                </div>
                </form>
            </div>
            <HiringSuccess
                show={modalShow}
                onHide={() => setModalShow(false)}
                />
        </div>
    )
}

export default Hiring
