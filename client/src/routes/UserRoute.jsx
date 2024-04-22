import React from "react";
import {Route,Routes} from"react-router-dom"
import LoginPage from"../pages/User/login"
import Registerpage from "../pages/User/register";
import OtpPage from"../pages/User/otp"
import Home from"../pages/User/UserHome";
import { ProtectedRoute } from "../ProtectedRoute/UserProteted";
import { HomeVerification } from "../ProtectedRoute/HomeVerification";

const UserRoute=()=>{
    return(
       <Routes>
        <Route exact path='/login' element={ <HomeVerification><LoginPage/></HomeVerification>}/>
        <Route exact path='/register' element={<Registerpage/>}/>
        <Route exact path='/otp' element={ <OtpPage/>}/>
        <Route exact path='/'element={< ProtectedRoute accessBy = {"Authorized"}><Home/></ProtectedRoute>}/>
        {/* <Route exact path='/'element={<Home/>}/> */}

       </Routes> 
    )
}
export default UserRoute

