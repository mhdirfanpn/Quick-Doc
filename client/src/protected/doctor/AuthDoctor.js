import { Navigate } from "react-router-dom";


export default function AuthDoctor({children}){
    const token=localStorage.getItem('doctorToken');
   
    if(token) return <Navigate to={'/doctor-home'}/>

    return children
}