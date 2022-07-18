import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/pups';

export const createPost = async ({ form }) => {
    try {
        //const response = await axios({method: 'POST', url: url, data: body});
        const response = await axios.post(baseUrl, form);

        console.log(response.data);
        //setPups(form);
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
}

export const getAllPost = async () => {
    try {
        const res = await axios.get(baseUrl);

        //setPups(res.data);
        return res.data
    } catch (error) {
        console.error(error.message)
    }
}

export const getPost = async (id) => {
    try {
        const res = await axios.get(baseUrl + `/${id}`)
        return res.data;
    } catch (error) {
        console.error(error.message)
    }
}

export const deletePost = async (id) => {
    try {
        const res = await axios.delete(baseUrl + `/${id}`)
        return res.data;
    } catch (error) {
        console.error(error.message)
    }
}

export const updatePost = async ({ form }, id) => {
    try {
        const res = await axios.put(baseUrl + `/${id}`, form)
        return res.data;
    } catch (error) {
        console.error(error.message)
    }
}