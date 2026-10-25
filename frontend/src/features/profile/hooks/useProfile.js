import { useContext } from 'react'

// Profile Context import kar rahe hain
// Is Context mein posts, loading aur error ki states stored hain
import { ProfileContext } from '../profile.context'

// API function import kar rahe hain
// Ye function backend se logged-in user ki posts fetch karta hai
import { getMyPosts , deletePost } from '../services/profile.api'


// Custom hook banaya hai jo Profile feature ka logic handle karega
export const useProfile = () => {

    // Step 1: ProfileContext se shared data access karna
    const context = useContext(ProfileContext)

    // Agar component ProfileProvider ke andar nahi hai
    // toh clear error show karenge
    if (!context) {
        throw new Error(
            'useProfile must be used inside ProfileProvider'
        )
    }

    // Step 2: Context se required states aur setter functions lena
    const {
        posts,
        setPosts,
        loading,
        setLoading,
        error,
        setError
    } = context


    // Step 3: Logged-in user ki posts fetch karne ke liye function
    const fetchMyPosts = async () => {

        // API request start hone par loading true karna
        setLoading(true)

        // Purana error clear karna
        setError('')

        try {

            // Backend API ko call karna
            // Response mein success, message aur posts array milega
            const data = await getMyPosts()

            // Backend se exactly kya response mila, check karna
            console.log('Backend API Response:', data)

            // Backend se mila posts array Context mein store karna
            // Agar posts available nahi hain toh empty array store karna
            setPosts(data.posts ?? [])

        } catch (err) {

            // API fail hone par actual error check karna
            console.error('Get My Posts Error:', err)

            // Agar API request fail hoti hai
            // toh error message Context mein store karna
            setError(
                err.response?.data?.message ||
                'Failed to fetch your posts.'
            )

        } finally {

            // API successful ho ya fail
            // dono conditions mein loading false karna
            setLoading(false)

        }
    }

    // Selected post ko backend se delete karna
    const handleDeletePost = async (postId) => {

        // Delete request start hone par loading true karna
        setLoading(true)

        // Purana error clear karna
        setError('')

        try {

            // Backend ko selected post ki ID bhejna
            const data = await deletePost(postId)

            // Backend se successful response milne ke baad
            // deleted post ko ProfileContext ki posts array se remove karna
            setPosts((previousPosts) => {

                return previousPosts.filter((post) => {

                    // Sirf woh posts rakhna jinki _id deleted post se different hai
                    return post._id !== postId

                })

            })

            // Success response Profile.jsx ko return karna
            return data

        } catch (err) {

            // Backend error message nikalna
            const message =
                err.response?.data?.message ||
                'Failed to delete post.'

            // Error Context mein store karna
            setError(message)

            // Error dobara throw karna taaki Profile.jsx handle kar sake
            throw new Error(message)

        } finally {

            // API request complete hone par loading false karna
            setLoading(false)

        }

    }


    // Step 4: Components ko required data aur functions return karna
    return {
        posts,
        loading,
        error,
        fetchMyPosts,
        handleDeletePost
    }
}