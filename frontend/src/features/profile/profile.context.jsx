import React, { createContext, useState } from 'react'

// Step 1: Profile Context create karna
export const ProfileContext = createContext(null)

// Step 2: Profile Provider component banana
export const ProfileProvider = ({ children }) => {

    // User ki saari posts store karne ke liye
    const [posts, setPosts] = useState([])

    // API request ke loading status ko track karne ke liye
    const [loading, setLoading] = useState(false)

    // API errors store karne ke liye
    const [error, setError] = useState('')

    // Step 3: Context ke through data share karna
    return (
        <ProfileContext.Provider
            value={{
                posts,
                setPosts,
                loading,
                setLoading,
                error,
                setError
            }}
        >
            {children}
        </ProfileContext.Provider>
    )
}