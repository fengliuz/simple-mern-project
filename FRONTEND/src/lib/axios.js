import axios from "axios"
const BASEURL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api"
const api = axios.create({
    baseURL:BASEURL,
    headers:{
        Accept:"application/json"
    }
})
// api.interceptors.request.use((config)=>{
//     const token = localStorage.getItem("token")
//     if(token){
//         config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
// })

export default api