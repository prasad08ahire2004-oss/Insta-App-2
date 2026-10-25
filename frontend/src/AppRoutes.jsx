import React from 'react'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import Register from './features/auth/pages/Register'
import Login from './features/auth/pages/Login'
import Feed from './features/post/pages/Feed'
import CreatePost from './features/post/pages/CreatePost'
import Profile from './features/profile/pages/Profile'


const AppRoutes = () => {
  return (
    <BrowserRouter>

        <Routes>

            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/' element={<Home/>} />
            <Route path='/feed' element={<Feed/>} />
            <Route path='/createpost' element={<CreatePost/>} />
            <Route path='/profile' element={<Profile />} />

        </Routes>

    </BrowserRouter>
  )
}

export default AppRoutes
