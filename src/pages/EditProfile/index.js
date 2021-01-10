import React, {useState, useContext, useEffect} from 'react'
import {AppContext} from "../../context/appContext";
import {Button} from 'react-bootstrap';
import {Header} from '../../components';
import Dropzone from 'react-dropzone';
import { API } from "../../config/api";
import {useHistory} from 'react-router-dom';

import './editprofile.scss';

const EditProfile = () => {
    const [state, dispatch] = useContext(AppContext);
    const {user} = state;
    const router = useHistory();
    const [data, setData] = useState('');
    const [arts, setArts] = useState([]);

    const [formData, setFormData] = useState({
        id: user.id,
        fullname: '',
        greeting: '',
    });
    const {id, fullname, greeting} = formData;

    const addArt = async (fileArts) => {
        
        const formAddArt = new FormData();
        if(fileArts !== undefined){
            console.log("ini file", fileArts[0]);
            fileArts.map((file, i) => (
                formAddArt.append('arts', fileArts[i])
            ));
        }
        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        };

        try {
            const response = await API.post(`/upload-arts/${id}`, formAddArt, config);
            router.push("/profile");
        } catch (error) {
            console.log(error);
        }
    }
    const handleProfileChange = (files) => {
        setData({files});
        console.log("Ini Data",data);
    }

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        console.log(formData);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const formEditProfile = new FormData();
        formEditProfile.append('fullname', fullname);
        formEditProfile.append('greeting', greeting);
        if(data.files !== undefined) {
            formEditProfile.append('avatar', data.files[0]);
        }

        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        };

        try {
            const response = await API.put(`/profile/${id}`, formEditProfile, config);
            console.log("Ini Response Edit",response.data.data.getUserAfterUpdate);
            dispatch({
                type: "EDITPROFILE",
                payload: response.data.data.getUserAfterUpdate,
            });
            router.goBack(); 
        } catch (error) {
            console.log(error);
        }   
    }
    useEffect(() => {
        setFormData({
            id : user.id,
            fullname: user.name,
            greeting: user.greeting,
        })
      }, []);
    return (
        <div className="add-post">
            <Header />
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-10">
                        <div className="row">
                            <div className="col-7">
                                <Dropzone  onDrop={acceptedFiles => addArt(acceptedFiles)}>
                                    {({getRootProps, getInputProps}) => (
                                        <section>
                                        <div {...getRootProps()} className="drop-files-arts d-flex justify-content-center align-items-center">
                                            <input {...getInputProps()}/>
                                            <p><span className="green">Upload</span> Best Your Art</p>
                                        </div>
                                        </section>
                                    )}
                                </Dropzone>
                                {
                                    
                                    arts.fileArts !== undefined &&
                                    <>
                                    <h3>Previews</h3>
                                    {
                                        <img src={URL.createObjectURL(arts.fileArts[0])} alt={arts.fileArts[0].name}></img>
                                        // arts.fileArts.map((file) => (
                                        //     <img src={URL.createObjectURL(arts.fileArts[1])} alt={file.name}></img>
                                        // ))
                                    }
                                    </>
                                }
                            </div>
                            <div className="col-5">
                                <form onSubmit={onSubmit}>
                                <div className="form-group d-flex justify-content-center">
                                    <Dropzone multiple={false} onDrop={acceptedFiles => handleProfileChange(acceptedFiles)}>
                                        {({getRootProps, getInputProps}) => (
                                            <section>
                                            
                                            <div {...getRootProps()} className="drop-files-profile ">
                                                <input {...getInputProps()}/>
                                                {data !== '' ? <img className="img-profile-preview" src={URL.createObjectURL(data.files[0])}></img> : <></>}
                                            </div>
                                            </section>
                                        )}
                                    </Dropzone>
                                </div>
                                <div className="form-group">
                                    <input 
                                        className="form-control" 
                                        placeholder="Greeting"
                                        name="greeting"
                                        value={greeting}
                                        onChange={onChange}
                                    ></input>
                                </div>
                                <div className="form-group">
                                    <input 
                                        className="form-control" 
                                        placeholder="Full Name"
                                        name="fullname"
                                        value={fullname}
                                        onChange={onChange}
                                    ></input>
                                </div>
                                <div className="form-group d-flex justify-content-center mt-4">
                                    <Button className="btn-green" type="submit">Save</Button>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                   
            </div>
        </div>
    )
}

export default EditProfile
