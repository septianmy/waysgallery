import React, {useState, useEffect} from 'react'
import {Button} from 'react-bootstrap';
import {Header} from '../../components';
import Dropzone from 'react-dropzone';
import {useParams} from 'react-router-dom';
import { API } from "../../config/api";
import {useHistory} from 'react-router-dom';

const SendProject = () => {
    const router = useHistory();
    let {id} = useParams();
    const [photosProject, setPhotosProject] = useState([]);
    const [formData, setFormData] = useState({
        hiringId : id,
        description: ''
    });

    const {hiringId, description} = formData;
    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        console.log(formData);
    };

    const handleChange = (file1) => {
        setPhotosProject( arr => [...arr, file1]);
     };

     const onSubmit =  async (e) => {
        e.preventDefault();
        const formAddProject = new FormData();
        if(photosProject[0] !== undefined) {formAddProject.append('projectphotos', photosProject[0].[0]);}
        if(photosProject[1] !== undefined) {formAddProject.append('projectphotos', photosProject[1].[0]);}
        if(photosProject[2] !== undefined) {formAddProject.append('projectphotos', photosProject[2].[0]);}
        if(photosProject[3] !== undefined) {formAddProject.append('projectphotos', photosProject[3].[0]);}
        if(photosProject[4] !== undefined) {formAddProject.append('projectphotos', photosProject[4].[0]);}

        formAddProject.append('description',description);

        const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        };

        try {
            const response = await API.post(`/project/${hiringId}`, formAddProject, config);
            router.push("/myorder");
        } catch (error) {
            console.log(error);
        }
    }

     useEffect(() => {
        setFormData({
            hiringId : id,
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
                                            <input {...getInputProps()}/>
                                            {photosProject[0] !== undefined ? <img src={URL.createObjectURL(photosProject[0].[0])} className="img-big-post-preview" alt="ini"></img> : 
                                            <><p className="browse-file"><span className="green">Browse</span> to choose a Project</p></>}
                                        </div>
                                        </section>
                                    )}
                                </Dropzone>
                                <div className="row mt-4">
                                    <Dropzone multiple={false} onDrop={acceptedFiles => handleChange(acceptedFiles)}>
                                        {({getRootProps, getInputProps}) => (
                                            <section className="col-3">
                                            <div {...getRootProps()} className="drop-files-project">
                                                <input {...getInputProps()}/>
                                                {photosProject[1] !== undefined ? <img className="img-big-post-preview" src={URL.createObjectURL(photosProject[1].[0])} alt="ini"></img> : 
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
                                                {photosProject[2] !== undefined ? <img className="img-big-post-preview" src={URL.createObjectURL(photosProject[2].[0])} alt="ini"></img> : 
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
                                                {photosProject[3] !== undefined ? <img className="img-big-post-preview" src={URL.createObjectURL(photosProject[3].[0])} alt="ini"></img> : 
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
                                                {photosProject[4] !== undefined ? <img className="img-big-post-preview" src={URL.createObjectURL(photosProject[4].[0])} alt="ini"></img> : 
                                            <></>}
                                            </div>
                                            </section>
                                        )}
                                    </Dropzone>    
                                </div>
                            </div>
                            <div className="col-5">
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
                                    <Button className="btn-green" type="submit">Send Project</Button>
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

export default SendProject
