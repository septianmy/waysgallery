import {createContext, useReducer} from 'react';

export const AppContext = createContext();

const initialState = {
    isLogin: false,
    isLoading: true,
    user:null,
};

const reducer = (state, action) => {
    switch (action.type){
        case "USER_LOADED":
            return {
                ...state,
                isLogin: true,
                isLoading: false,
                user : {
                    id : action.payload.id,
                    name : action.payload.fullname,
                    email : action.payload.email,
                    avatar: action.payload.avatar,
                    greeting: action.payload.greeting,
                },
            };
        case "LOGIN":
            localStorage.setItem("token", action.payload.token);
            return{
                ...state,
                isLogin:true,
                isLoading: false,
                user : {
                    id : action.payload.id,
                    name : action.payload.fullname,
                    email : action.payload.email,
                    avatar: action.payload.avatar,
                    greeting: action.payload.greeting,
                },
            };
        case "EDITPROFILE":
            localStorage.setItem("token", action.payload.token);
            return{
                    ...state,
                    isLogin:true,
                    isLoading: false,
                    user : {
                        id : action.payload.id,
                        name : action.payload.fullname,
                        email : action.payload.email,
                        avatar: action.payload.avatar,
                        greeting: action.payload.greeting,
                },
            };
        case "AUTH_ERROR":
        case "LOGOUT":
            localStorage.removeItem("token")
            return {
                ...state,
                isLogin: false,
                isLoading: false,
            };
        default:
            throw new Error();
    }
};

export const AppContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return(
        <AppContext.Provider value={[state, dispatch]}>
            {props.children}
        </AppContext.Provider>
    );
};