import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})

// Backend se current logged-in user ki posts fetch karna
export const getMyPosts = async () => {

    // Step 1: Backend API ko GET request bhejna
    const response = await api.get(
        '/api/posts/myPosts',
        {
            withCredentials: true
        }
    )

    // Step 2: Backend se received JSON data return karna
    return response.data
}

// Logged-in user ki selected post delete karne ke liye API
export const deletePost = async (postId) => {

    // Backend ko DELETE request bhejna
    // postId us post ki MongoDB _id hai jise delete karna hai
    const response = await api.delete(
        `/api/posts/${postId}`,
        {
            // JWT authentication cookie backend ko bhejna
            withCredentials: true
        }
    )

    // Backend ka response return karna
    return response.data

}