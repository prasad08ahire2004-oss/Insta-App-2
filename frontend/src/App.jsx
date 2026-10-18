import React from 'react'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import { AuthProvider } from './features/auth/auth.context.jsx'
import AppRoutes from './AppRoutes'

const App = () => {
  return (

      <AuthProvider>

        <AppRoutes/>

      </AuthProvider>
      
  )
}

export default App
