import React, { lazy, Suspense } from 'react'
import './CSS/HomePage.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from '../Components/Login/LoginPage'
import SignupPage from '../Components/Signup/SignupPage'
import Welcome from '../Components/Welcome/Welcome'
import Home from '../Components/Home/Home'


export const HomePage = () => {
    return (
        <BrowserRouter>
            <Routes>
            <Route path='/' element={<Welcome/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/signup' element={<SignupPage/>}/>
                <Route path='/home' element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}



