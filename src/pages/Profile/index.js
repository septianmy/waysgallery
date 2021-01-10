import React, {useContext, useEffect, useState}from 'react'
import {Header} from '../../components';
import {Button} from 'react-bootstrap';
import {Link} from  'react-router-dom';
import {IdeaNotFound} from '../../assets';
import { API,Port} from "../../config/api";
import { UserDefaultPict } from '../../assets';
import {AppContext} from '../../context/appContext';

import './profile.scss';

const Profile = () => {
    const [state, dispatch ]= useContext(AppContext);
    const {user} = state;
    const [profileData, setProfileData] = useState({
        fullname : "",
        greeting : "",
        avatar : "",
        postslength : null,
        posts : [],
        arts:[],
    });

    const {fullname, greeting, avatar, posts, postslength, arts} = profileData;
    const fetchProfile = async () => {
        try {
            const response = await API(`/profile/${user.id}`);
            //console.log(response.data.data.user.posts[0].photos)
            setProfileData({
                fullname: response.data.data.user.fullname,
                greeting: response.data.data.user.greeting,
                avatar: response.data.data.user.avatar,
                postslength : response.data.data.user.posts.length,
                posts: response.data.data.user.posts,
                arts: response.data.data.user.arts
            });
            console.log("Ini FullName",postslength)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProfile();
    }, [])

    return (
        <div className="profile">
            <Header/>
            <div className="container profile-container">
                <div className="green-attribute"></div>
                <div className="row mt-4">
                    <div className="col-5">
                        {
                            avatar ? <img src={`${Port}/${avatar}`} className="avatar"></img> :
                            <img src={UserDefaultPict} className="avatar"></img>
                        }
                        
                        <h6 className="username mt-4">{fullname}</h6>
                        <h1 className="greeting mt-4">{greeting}</h1>
                        <Link to="/edit-profile"><Button className="btn-green mt-4">Edit Profile</Button></Link>
                    </div>
                    <div className="col-7 post-container">
                        {
                            postslength === 0 ? <><img src={IdeaNotFound} className="post-image"></img></> :
                            posts.map((post) => (
                                post.photos.map((photo) => (
                                    <img src={`${Port}/${photo.image}`} className="post-image" alt="ini"></img>
                                ))
                            ))
                        }
                    </div>
                </div>
                <div className="row mt-4"><div className="col">My Works</div></div>
                <div className="row mt-3">
                    {
                        arts.length === 0 ? <><div className="wrapper-img"><img src={IdeaNotFound}></img></div></> :
                        arts.map((photo)=>( 
                            <>
                            <div className="col-4 mt-4 wrapper-art"><img src={`${Port}/${photo.image}`} className="image-art"></img></div>
                            </>
                        ))
                    }
                </div>
                
            </div>
        </div>
    )
}

export default Profile
