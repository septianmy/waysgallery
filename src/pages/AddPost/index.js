import React, {useState, useEffect, useContext} from 'react';
import {AppContext} from "../../context/appContext";
import {Button} from 'react-bootstrap';
import {Header} from '../../components';
import Dropzone from 'react-dropzone';
import { API } from "../../config/api";
import {useHistory} from 'react-router-dom';

import './addpost.scss';
const AddPost = () => {
    const router = useHistory();
    const [state, dispatch] = useContext(AppContext);
    const {user} = state;
    const [photos, setPhotos] = useState([]);
    const [formData, setFormData] = useState({
        id : user.id,
        title: '',
        description: ''
    });
    const {id, title, description} = formData;
    const handleChange = (file1) => {
       setPhotos( arr => [...arr, file1]);
    };

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        console.log(formData);
    };

    const onSubmit =  async (e) => {
        e.preventDefault();
        console.log("ini title", title)
        const formAddPost = new FormData();
        if(photos[0] !== undefined) {formAddPost.append('photos', photos[0].[0]);}
        if(photos[1] !== undefined) {formAddPost.append('photos', photos[1].[0]);}
        if(photos[2] !== undefined) {formAddPost.append('photos', photos[2].[0]);}
        if(photos[3] !== undefined) {formAddPost.append('photos', photos[3].[0]);}
        if(photos[4] !== undefined) {formAddPost.append('photos', photos[4].[0]);}
        formAddPost.append('title', title);
        formAddPost.append('description',description);

        const config = {
            headers: {
              'Content-type': 'multipart/form-data',
            },
        };

        try {
            const response = await API.post(`/post/${id}`, formAddPost, config);
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setFormData({
            id : user.id,
            title: '',
            description: ''
        })
    }, [])

    return (
        <div className="add-post">
            <Header />
            <div className="container mt-4">
            <form onSubmit={onSubmit}>
                <div className="row justify-content-center">
                    <div className="col-10">
                        <div className="row">
                            <div className="col-7">
                                <Dropzone multiple={false} onDrop={acceptedFiles => handleChange(acceptedFiles)}>
                                    {({getRootProps, getInputProps}) => (
                                        <section>
                                        <div {...getRootProps()} className="drop-files-post d-flex justify-content-center align-items-end">
                                            <input {...getInputProps()} name="photos"/>
                                            {photos[0] !== undefined ? <img src={URL.createObjectURL(photos[0].[0])} className="img-big-post-preview" alt="ini"></img> : 
                                            <><p className="browse-file"><span className="green">Browse</span> to choose a file</p></>}
                                        </div>.
                                        </section>
                                    )}
                                </Dropzone>
                                <div className="row">
                                    <Dropzone multiple={false} onDrop={acceptedFiles => handleChange(acceptedFiles)}>
                                        {({getRootProps, getInputProps}) => (
                                            <section className="col-3">
                                            <div {...getRootProps()} className="drop-files-project">
                                                <input {...getInputProps()}/>
                                                {photos[1] !== undefined ? <img className="img-big-post-preview" src={URL.createObjectURL(photos[1].[0])} alt="ini"></img> : 
                                            <></>}
                                            </div>
                                            </section>
                                        )}
                                    </Dropzone>
                                    <Dropzone multiple={false} onDrop={acceptedFiles => handleChange(acceptedFiles)}>
                                        {({getRootProps, getInputProps}) => (
                                            <section className="col-3">
                                            <div {...getRootProps()} className="drop-files-project">
                                                <input {...getInputProps()}/>
                                                {photos[2] !== undefined ? <img className="img-big-post-preview" src={URL.createObjectURL(photos[2].[0])} alt="ini"></img> : 
                                            <></>}
                                            </div>
                                            </section>
                                        )}
                                    </Dropzone>
                                    <Dropzone multiple={false} onDrop={acceptedFiles => handleChange(acceptedFiles)}>
                                        {({getRootProps, getInputProps}) => (
                                            <section className="col-3">
                                            <div {...getRootProps()} className="drop-files-project">
                                                <input {...getInputProps()}/>
                                                {photos[3] !== undefined ? <img className="img-big-post-preview" src={URL.createObjectURL(photos[3].[0])} alt="ini"></img> : 
                                            <></>}
                                            </div>
                                            </section>
                                        )}
                                    </Dropzone>
                                    <Dropzone multiple={false} onDrop={acceptedFiles => handleChange(acceptedFiles)}>
                                        {({getRootProps, getInputProps}) => (
                                            <section className="col-3">
                                            <div {...getRootProps()} className="drop-files-project">
                                                <input {...getInputProps()}/>
                                                {photos[4] !== undefined ? <img className="img-big-post-preview" src={URL.createObjectURL(photos[4].[0])} alt="ini"></img> : 
                                            <></>}
                                            </div>
                                            </section>
                                        )}
                                    </Dropzone>    
                                </div>
                            </div>
                            <div className="col-5">
                                <div className="form-group">
                                    <input 
                                        className="form-control" 
                                        placeholder="Title"
                                        name="title"
                                        value={title}
                                        onChange={onChange}
                                    ></input>
                                </div>
                                <div className="form-group">
                                    <textarea 
                                        className="form-control textarea" 
                                        placeholder="Description"
                                        name="description"
                                        value={description}
                                        onChange={onChange}
                                    ></textarea>
                                </div>
                                <div className="form-group d-flex justify-content-center mt-4">
                                    <Button className="btn-green">Cancel</Button>&nbsp;
                                    <Button className="btn-green" type="submit">Post</Button>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
                </form>      
            </div>
        </div>
    )
}

export default AddPost
