import axios from 'axios'
//封装
export const posts = axios.create({
    baseURL: 'http://127.0.0.1:3000',
    headers: {}
});