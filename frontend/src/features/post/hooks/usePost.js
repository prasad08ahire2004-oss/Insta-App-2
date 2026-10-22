import { useContext } from 'react'
import { PostContext } from '../post.context'
import { getFeed, toggleLike } from '../services/post.api'

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

    // Post ko like ya unlike karna
    const handleToggleLike = async (postId) => {
        try {
            // Step 1: Backend API ko post ki ID bhejna.
            // Backend check karega ki like create karna hai ya delete.
            const response = await toggleLike(postId)

            // Step 2: Sirf successful response ke baad feed update karna.
            if (response.success) {

                // Step 3: Feed ke har post ko check karna.
                // Jis post ki ID match hogi, uska like status aur count update hoga.
                setFeed((previousFeed) => {
                    return previousFeed.map((post) => {

                        // Baaki posts ko unchanged rakhna.
                        if (post._id !== postId) {
                            return post
                        }

                        // Step 4: Backend se mila liked status use karna.
                        const isLiked = response.liked

                        // Step 5: Like hua toh count +1.
                        // Unlike hua toh count -1.
                        // Math.max count ko zero se neeche jaane se rokta hai.
                        const likesCount = Math.max(
                            0,
                            (post.likesCount || 0) + (isLiked ? 1 : -1)
                        )

                        // Step 6: Updated post return karna.
                        return {
                            ...post,
                            isLiked,
                            likesCount
                        }
                    })
                })
            }

            // Backend ka response caller ko return karna.
            return response

        } catch (error) {
            // API fail hui toh error console mein dikhana.
            console.error('Toggle like error:', error)

            // Error ko caller tak bhejna, taaki component bhi handle kar sake.
            throw error
        }
    }

    // Component ko required data aur function dena
    return {
        loading,
        feed,
        fetchFeed,
        handleToggleLike
    }
}