import { useState, useEffect, useContext } from "react";
import {Header} from '../../components';
import {API,Port} from '../../config/api';
import {Button} from 'react-bootstrap';
import { UserDefaultPict } from '../../assets';
import {Link, useParams} from 'react-router-dom';
import {AppContext} from '../../context/appContext';
import './postdetail.scss';

const PostDetail = () => {
    const [state, dispatch ]= useContext(AppContext);
    const {user} = state;
    let {id} = useParams();
    const [mainPicture, setMainPicture] = useState('');
    const [postData, setPostData] = useState({
        title : "",
        description : "",
        photos:[],
        userData:{},
        follow: 0,
    });

    const {title, description, photos, userData, follow} = postData;

    const fetchPostDetail = async () => {
        try{
            const response = await API(`/post/${id}`);
            const responseFollow = await API(`/check-follow/${response.data.data.post.user.id}`);
            const responseLength = responseFollow.data.data.follow.length;
            setPostData({
                title: response.data.data.post.title,
                description: response.data.data.post.description,
                photos:response.data.data.post.photos,
                userData : response.data.data.post.user, 
                follow : responseFollow.data.data.follow.length,
            });
            setMainPicture(response.data.data.post.photos[0].image);
           
        }catch (error) {
            console.log(error);
        }
    }

    const onFollow = async (id) => {
        try {
            const body = JSON.stringify({id});
            const config = {
                headers: {
                    "Content-Type":"application/json",
                },
            }; 
            const response = await API.post("/follow", body, config);
            fetchPostDetail();
        } catch (error) {
            console.log(error);
        }
    }

    const onUnFollow = async (id) => {
        try {
            const response = await API.delete(`/unfollow/${id}`);
            fetchPostDetail();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=> {
        fetchPostDetail();
    },[]);

    return (
        <div className="post-detail">
            <Header/>
            <div className="container mt-4">
               <div className="row justify-content-center">
                <div className="col-9">
                <div className="row">
                    <div className="col-6">
                        <div className="row">
                            <div className="col-3">
                                <Link to={`/user/${userData.id}`}>
                                    {
                                        userData.avatar ? <img className="avatar" src={`${Port}/${userData.avatar}`}></img> :
                                        <img className="avatar" src={UserDefaultPict}></img>
                                    }
                                    
                                </Link>
                            </div>
                            <div className="col-9">
                                <div className="row">
                                    <Link to={`/user/${userData.id}`}><h4>{title}</h4></Link>
                                </div>
                                <div className="row">
                                    <Link to={`/user/${userData.id}`}><h6>{userData.fullname}</h6></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        userData.id === user.id ? <></> :
                        <>
                        <div className="col-6 d-flex justify-content-end">
                        {
                            follow === 0 ? <><Button className="btn-follow" onClick={()=>onFollow(userData.id)}>Follow</Button>&nbsp;</> : 
                            <><Button className="btn-follow" onClick={()=>onUnFollow(userData.id)}>Unfollow</Button>&nbsp;</>
                        }
                            
                            <Link to={`/hiring/${userData.id}`}><Button className="btn-hire">Hire</Button></Link>
                        </div>
                        </>
                    }
                </div>
                <div className="row big-image d-flex justify-content-center">
                    <div className="col img-big-container">
                        <img className="big-image" src={`${Port}/${mainPicture}`} alt='main-picture'></img>
                    </div>
                </div>
                <div className="row mt-2 d-flex justify-content-center">
                    {
                        photos.map((photo)=>( 
                            <div className="col-md-2 img-small-container">
                                <img onClick={()=> setMainPicture(photo.image)} className="small-image" src={`${Port}/${photo.image}`}>
                            </img></div>
                        ))
                    }
                </div>
                <div className="row mt-2">
                    <div className="col">
                        <p>{description}</p>
                    </div>
                </div>
                
                </div>
                </div>

            </div>
        </div>
    )
}

export default PostDetail
