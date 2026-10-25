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