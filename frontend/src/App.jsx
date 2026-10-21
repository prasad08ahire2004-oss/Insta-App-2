import React from 'react'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import { AuthProvider } from './features/auth/auth.context.jsx'
import { PostContextProvider } from './features/post/post.context.jsx'
import AppRoutes from './AppRoutes'

const App = () => {
  return (

      <AuthProvider>

            <PostContextProvider>

                <AppRoutes />

            </PostContextProvider>
            
        </AuthProvider>
      
  )
}

export default App
