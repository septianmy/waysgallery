import React, {useState, useEffect} from 'react'
import {Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import {Header} from '../../components';
import {useParams} from 'react-router-dom';
import { API,Port } from "../../config/api";
import './viewproject.scss';
const ViewProject = () => {
    let {id} = useParams();
    const [modalShow, setModalShow] = React.useState(false);
    const [mainPicture, setMainPicture] = useState('');
    const [projectData, setProjectData] = useState({
        description : "",
        photos:[],
    });
    const {description, photos} = projectData;
    const fetchProjectDetail = async () => {
        try{
            const response = await API(`/project/${id}`);
            console.log(response);
            setProjectData({
                description: response.data.data.project.description,
                photos:response.data.data.project.photos,
            });
            setMainPicture(response.data.data.project.photos[0].image);
        }catch (error) {
            console.log(error);
        }
    }

    function DownloadProject(props) {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body className="make-payment">
            <img className="big-image" src={`${Port}/${mainPicture}`} alt='main-picture'></img>
            <div className="row d-flex justify-content-center mt-4">
                <Button className="btn-green">Download</Button>
            </div>
            </Modal.Body>
          </Modal>
        );
      };

     useEffect(() => {
        fetchProjectDetail();
    }, [])

    return (
        <div className="add-project">
            <Header />
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-10">
                        <div className="row">
                            <div className="col-7">
                                <img className="big-image" src={`${Port}/${mainPicture}`} alt='main-picture' onClick={()=>setModalShow(true)}></img>
                                <div className="row mt-4">
                                {
                                    photos.map((photo)=>( 
                                        <div className="col-3 img-small-container">
                                            <img onClick={()=> setMainPicture(photo.image)} className="small-image" src={`${Port}/${photo.image}`}>
                                        </img></div>
                                    ))
                                }
                                </div>
                            </div>
                            <div className="col-5">
                                <p>{description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <DownloadProject
                show={modalShow}
                onHide={() => setModalShow(false)}
                />
            </div>
        </div>
    )
}

export default ViewProject
