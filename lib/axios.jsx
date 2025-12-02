import axios from 'axios';

const AXIOS_INSTANCE = axios.create({
    baseURL:  process.env.NEXT_PUBLIC_API_BASE ,
    withCredentials: true, // if using cookies for auth
});

export default AXIOS_INSTANCE;