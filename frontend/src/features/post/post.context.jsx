import { createContext, useState } from 'react'

// Post ke liye shared data store karne ke liye Context
export const PostContext = createContext()

// Provider: iske andar ke components Context ka data access kar sakte hain
export const PostContextProvider = ({ children }) => {

    // API request chal rahi hai ya nahi
    const [loading, setLoading] = useState(false)

    // Posts se related additional state
    const [Posts, setPosts] = useState(null)

    // Feed mein dikhane ke liye saari posts ismai store hogi
    const [feed, setFeed] = useState([])

    return (
        <PostContext.Provider
            value={{
                loading,
                setLoading,
                Posts,
                setPosts,
                feed,
                setFeed
            }}
        >
            {children}
        </PostContext.Provider>
    )
}