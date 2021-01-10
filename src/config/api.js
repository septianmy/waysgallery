import axios from "axios";

export const Port = "https://wgallery.herokuapp.com";

export const API = axios.create({
    baseURL: "https://wgallery.herokuapp.com/api/v1",
});

export const setAuthToken = (token) => {
    if (token) {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete API.defaults.headers.common["Authorization"];
    }
};