import axios from "axios";

const token = localStorage.getItem("token");
console.log(token);

const instance = axios.create({
    headers: token ? {
        Token: "Bearer " + token
    } : {},
    baseURL : "http://localhost:8080/api/",
})

export default instance;