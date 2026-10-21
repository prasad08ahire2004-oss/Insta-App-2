import { useContext } from 'react'
import { PostContext } from '../post.context'
import { getFeed } from '../services/post.api'

export const usePost = () => {

    // PostContext se shared state aur functions lena
    const {
        loading,
        setLoading,
        feed,
        setFeed
    } = useContext(PostContext)

    // Backend se feed fetch karna
    const fetchFeed = async () => {
        setLoading(true)

        try {
            // API ko call karke backend se posts lena
            const response = await getFeed()

            // Response se posts nikal kar Context mein store karna
            setFeed(response.posts)

        } catch (error) {
            console.error('Fetch feed error:', error)
            throw error

        } finally {
            setLoading(false)
        }
    }

    // Component ko required data aur function dena
    return {
        loading,
        feed,
        fetchFeed
    }
}