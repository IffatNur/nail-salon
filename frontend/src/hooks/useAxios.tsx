import { AuthContext } from "@/contexts/AuthProvider";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5002",
});
const useAxios = () => {
  const navigate = useNavigate();
  const { SignOut } = useContext(AuthContext);
  axiosSecure.interceptors.request.use((config)=>{
    config.headers.authorization = `Bearer ${localStorage.getItem('nailsalon-token')}`
    return config
  }, (error:Error)=>{
      return Promise.reject(error)
  })

  axiosSecure.interceptors.response.use((response) =>{
    return response
  },(error: Error)=>{
    if(error.response.status === 401 || error.response.status === 403){
      SignOut();
      navigate('/login')
    }
    return Promise.reject(error)
  })
  return axiosSecure;
};

export default useAxios;
