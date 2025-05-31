import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, error => {
    console.error('Request error:', error)
    return Promise.reject(error)
})

api.interceptors.response.use(response => {
    console.log('API Response:', response)
    return response
}, error => {
    console.error('API Error:', error)
    return Promise.reject(error)
})

export default api