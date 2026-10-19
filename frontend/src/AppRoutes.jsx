import React from 'react'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import Register from './features/auth/pages/Register'
import Login from './features/auth/pages/Login'
import Feed from './features/post/pages/Feed'


const AppRoutes = () => {
  return (
    <BrowserRouter>

        <Routes>

            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/' element={<Home/>} />
            <Route path='/feed' element={<Feed/>} />

        </Routes>

    </BrowserRouter>
  )
}

export default AppRoutes
