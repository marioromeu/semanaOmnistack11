import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.128.10.99:3333'
});

export default api;