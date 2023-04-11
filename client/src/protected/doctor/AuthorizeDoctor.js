import { Navigate } from "react-router-dom";


export default function AuthorizeDoctor({children}){
    const token=localStorage.getItem('doctorToken');

    if(!token) return <Navigate to={'/doctor-login'}/>

    return children
}