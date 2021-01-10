import React, {useContext, useState, useEffect} from 'react';
import {AppContext} from '../../context/appContext';
import { useHistory} from 'react-router-dom';
import { API,Port } from "../../config/api";
import {Header} from '../../components';

import './home.css';
const PostsByFollow = () => {
    const [state, dispatch ]= useContext(AppContext);
    const {user} = state;
    const [posts, setPosts ] = useState([]);
    const router = useHistory();
    const fetchPosts = async () => {
        try {
            const response = await API(`/postbyfollow/${user.id}`);
            if (response.status === 500){
                console.log("server error")
            }
            console.log(response.data.data.postsbyfollow);
            setPosts(response.data.data.postsbyfollow)
        } catch (error) {
            console.log(error);
        }
    }

    const detailPage = (id) => {
        router.push(`/post-detail/${id}`);
    }

    useEffect(() => {
        fetchPosts();
    }, [])

    return (
        <div className="home">
            <Header/>
            <div className="container mt-4">
            <div className="row">
                    <div className="col">
                        <select name='page' className="sorted">
                            <option value='followed'>Followed</option>
                            <option value='all'>All Time</option>
                        </select>
                    </div>
                </div>
                <div className="row home-content">
                {
                    posts.map((post) => (
                        posts.length > 0 && post.users.posts.map((post) => (
                            post.photos.map((photo)=>(
                                <div className="col-3 img-post-wrapper">
                                    <img 
                                        className="post-image" 
                                        src={`${Port}/${photo.image}`} 
                                        alt={photo.image}
                                        onClick={()=>detailPage(post.id)}
                                    ></img>
                                </div>
                            ))
                        ))
                    ))
                }
                </div>
            </div>
            
        </div>
    )
}

export default PostsByFollow
