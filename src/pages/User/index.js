import React, {useContext, useEffect, useState}from 'react'
import {Header} from '../../components';
import {Button} from 'react-bootstrap';
import {Link, useParams} from 'react-router-dom';
import {AppContext} from '../../context/appContext';
import {IdeaNotFound, UserDefaultPict} from '../../assets';
import { API,Port} from "../../config/api";

const User = () => {
    const [state, dispatch ]= useContext(AppContext);
    const {user} = state;
    let {id} = useParams();
    const [profileData, setProfileData] = useState({
        idUser : "",
        fullname : "",
        greeting : "",
        avatar : "",
        postslength : null,
        posts : [],
        arts:[],
        follow : 0
    });

    const {idUser, fullname, greeting, avatar, posts, postslength, arts, follow} = profileData;
    const fetchUser = async () => {
        try {
            const response = await API(`/profile/${id}`);
            const responseFollow = await API(`/check-follow/${response.data.data.user.id}`);
            const responseLength = responseFollow.data.data.follow.length;

            setProfileData({
                idUser : response.data.data.user.id,
                fullname: response.data.data.user.fullname,
                greeting: response.data.data.user.greeting,
                avatar: response.data.data.user.avatar,
                postslength : response.data.data.user.posts.length,
                posts: response.data.data.user.posts,
                arts: response.data.data.user.arts,
                follow : responseFollow.data.data.follow.length,
            });
            
        } catch (error) {
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
            fetchUser();
        } catch (error) {
            console.log(error);
        }
    }

    const onUnFollow = async (id) => {
        try {
            const response = await API.delete(`/unfollow/${id}`);
            fetchUser();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUser();
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
                    {
                        idUser === user.id ? <><Link to="/edit-profile"><Button className="btn-green mt-4">Edit Profile</Button></Link></> :
                        <>
                        {
                            follow === 0 ? <><Button className="btn-follow mt-4" onClick={()=>onFollow(idUser)}>Follow</Button>&nbsp;</> : 
                            <><Button className="btn-follow mt-4" onClick={()=>onUnFollow(idUser)}>Unfollow</Button>&nbsp;</>
                        }
                        <Link to={`/hiring/${idUser}`}><Button className="btn-hire mt-4">Hire</Button></Link>
                        </>
                    }
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
                <div className="row mt-4"><div className="col">{fullname} Works</div></div>
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

export default User
