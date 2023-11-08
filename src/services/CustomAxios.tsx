import axios from "axios";

const token = localStorage.getItem("token");
const instance =  axios.create({
    headers: token ? {
        token: token
    } : {},
    baseURL : "http://localhost:8080/api/",
})

export default instance;