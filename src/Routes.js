import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './core/Home'
import SignIn from './user/Signin';
import SignUp from './user/Signup';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route  path = '/' element = {<Home/>} ></Route>
                <Route  path = '/signup' element = {<SignUp/>} ></Route>
                <Route  path = '/signin' element = {<SignIn/>} ></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
