import React, {useContext, useState, useEffect} from 'react';
import {AppContext} from '../../context/appContext';
import { useHistory} from 'react-router-dom';
import { API,Port } from "../../config/api";
import {Header} from '../../components';

import './home.css';
const Home = () => {
    const [state, dispatch ]= useContext(AppContext);
    const {user} = state;
    const [page, setPage] = useState('all');
    const [posts, setPosts ] = useState([]);
    const [postsByFollow, setPostsByFollow ] = useState([]);
    const router = useHistory();

    const fetchPosts = async () => {
        try {
            const response = await API("/posts");
            if (response.status === 500){
                console.log("server error")
            }
            setPosts(response.data.data.posts)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchPostsByFollow = async () => {
        try {
            const response = await API(`/postbyfollow/${user.id}`);
            if (response.status === 500){
                console.log("server error")
            }
            setPostsByFollow(response.data.data.postsbyfollow)
        } catch (error) {
            console.log(error);
        }
    }

    const detailPage = (id) => {
        router.push(`/post-detail/${id}`);
    }

    useEffect(() => {
        if (page === 'all'){
            fetchPosts();
        }
        if(page === 'followed'){
            fetchPostsByFollow();
        }
    }, [page])

    return (
        <div className="home">
            <Header/>
            <div className="container mt-4">
                <div className="row">
                    <div className="col">
                        <select name='page' onChange={(e) => setPage(e.target.value)} className="sorted">
                            <option value='all'>All Time</option>
                            <option value='followed'>Followed</option>
                        </select>
                    </div>
                </div>
                <div className="row home-content">
                {
                    page === 'all' ? 
                    posts.map((postdata) => (
                        postdata.photos.length > 0 && postdata.photos.map((photo) => {
                            return (
                                photo && ( 
                                <div className="col-3 img-post-wrapper">
                                    <img className="post-image" src={`${Port}/${photo.image}`} alt={postdata.id} onClick={()=>detailPage(postdata.id)}></img>
                                </div>)
                            )
                        })
                    )) :
                    page == 'followed'?
                    postsByFollow.map((post) => (
                        postsByFollow.length > 0 && post.users.posts.map((post) => (
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
                    :
                    <><p>Ini Page </p></>
                }
                </div>
            </div>
            
        </div>
    )
}

export default Home
