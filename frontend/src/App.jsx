import React from 'react'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import { AuthProvider } from './features/auth/auth.context.jsx'
import { PostContextProvider } from './features/post/post.context.jsx'
// Profile feature ka Provider
// Ye profile posts, loading aur error states share karega
import { ProfileProvider } from './features/profile/profile.context'
import AppRoutes from './AppRoutes'

const App = () => {
  return (

      <AuthProvider>

            <PostContextProvider>

                <ProfileProvider>

                    <AppRoutes />

                </ProfileProvider>

            </PostContextProvider>
            
        </AuthProvider>
      
  )
}

export default App
