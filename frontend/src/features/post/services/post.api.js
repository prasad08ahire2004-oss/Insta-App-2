import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})


// Ye function do values receive karta hai imageFile aur caption
export async function createPost(imageFile, caption) {

    try {
        // Ye line bahut important hai.
        // Normal JSON mein hum text aur numbers easily bhej sakte hain. Lekin image file ko upload karne ke liye hum FormData use karte hain.
        const formData = new FormData()

        // Ye field name tumhare backend ke Multer setup se match hona chahiye:
        // upload.single('image')
        // Dono jagah 'image' same hona zaroori hai
        formData.append("image", imageFile)
        formData.append("caption", caption)

        /*

        Toh FormData mein ab do fields hain:

        image   → selected image file
        caption → My first post

        Backend par Multer image ko req.file mein aur caption ko req.body.caption mein available karata hai.
        Isliye tumhara controller ye values access kar sakta hai:

        req.file
        req.body.caption

        */

        const response = await api.post('/api/posts', formData)
        // Ye line poora data backend ko bhejti hai.

        return response.data

        /*
        Axios ke response object mein status, headers aur response data jaise fields hote hain.
        Hume aam taur par backend ka actual response chahiye, isliye hum:
        response.data
        return karte hain.
        */
    } catch(err) {
        // Backend ne error response bheja hai
        if (err.response) {
            throw new Error(
                err.response.data?.message || 'Failed to create post.'
            )
        }

        // Request bheji gayi, lekin response nahi mila
        if (err.request) {
            throw new Error(
                'Server se response nahi mila. Please check your connection.'
            )
        }

        // Request prepare karte waqt koi problem hui
        throw new Error('Something went wrong. Please try again.')
    }

}

// Backend se feed ki saari posts fetch karna
export async function getFeed() {
    try {
        // Backend se posts maangna
        const response = await api.get('/api/posts/feed')
        //Yahan backend ka poora HTTP response response variable mein store hota hai

        // Backend ka response return karna aur return response.data →  data ko getFeed() call karne wali jagah par bhejta hai.
        return response.data

    } catch (error) {
        // Backend ne error response diya
        if (error.response) {
            throw new Error(
                error.response.data?.message || 'Failed to fetch feed.'
            )
        }

        // Request bheji gayi, lekin response nahi mila
        if (error.request) {
            throw new Error(
                'Server se response nahi mila. Please check your connection.'
            )
        }

        // Koi doosri unexpected problem
        throw new Error(
            error.message || 'Something went wrong while fetching the feed.'
        )
    }
}