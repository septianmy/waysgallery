import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PrivateRoute from '../privateRoute';
import { 
    LandingPage, 
    Home, 
    Logout, 
    PostDetail, 
    Hiring, 
    MyOrder, MyOffer, Profile, 
    User, AddPost, EditProfile, 
    SendProject, ViewProject, PostsByFollow} from '../../pages';
import {useEffect, useContext } from 'react';
import {API, setAuthToken} from "../../config/api";
import { AppContext } from '../../context/appContext';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const Routes = () => {
    const [state,dispatch] = useContext(AppContext);

    const loadUser = async () => {
        try {
        const response = await API("/check-auth");
        if(response.status === 401){
            return dispatch({
            type: "AUTH_ERROR",
            });
        }
        dispatch({
            type: "USER_LOADED",
            payload: response.data.data, 
        });
        } catch (error) {
        dispatch({
            type: "AUTH_ERROR",
        });
        }
    };
    useEffect(() => {
        loadUser();
    }, []);

    return (
        <Router>
            <Switch>
                <Route exact path="/landing-page" component={LandingPage}></Route>
                <PrivateRoute path="/post-detail/:id" component={PostDetail}/>
                <PrivateRoute path="/hiring/:id" component={Hiring}/>
                <PrivateRoute path="/myorder" component={MyOrder}/>
                <PrivateRoute path="/myoffer" component={MyOffer}/>
                <PrivateRoute path="/profile" component={Profile}/>
                <PrivateRoute path="/send/:id" component={SendProject}/>
                <PrivateRoute path="/viewproject/:id" component={ViewProject}/>
                <PrivateRoute path="/edit-profile" component={EditProfile}/>
                <PrivateRoute path="/user/:id" component={User}/>
                <PrivateRoute path="/add-post" component={AddPost}/>
                <PrivateRoute path="/logout" component={Logout}/>
                <PrivateRoute path="/postsbyfollow" component={PostsByFollow}/>
                <PrivateRoute path="/" component={Home}/>
            </Switch>
        </Router>
    )
}

export default Routes
