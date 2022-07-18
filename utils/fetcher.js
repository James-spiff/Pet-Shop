import axios from 'axios';

const authUrl = 'http://localhost:3000/api/auth/signup'; 

export const fetcher = async (data) => {
    try {
        const response = await axios.post(authUrl, {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        return response.data;
    } catch (error) {
        console.error(error.message);
    }
}