import axios from 'axios'
const service = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // timeout: 5000,
    withCredentials: true,  // send cookies when cross-domain requests
    headers: {
        Accept: 'application/json'
    }
})

// Request interceptors
service.interceptors.request.use(
    (config: any) => {
        // Add Authorization header to every request, you can add other custom headers here
        // 在此处添加请求头等，如添加 token
        // config.headers['Authorization'] = 'tokentokentokentokentokentokenhhh'
        return config
    },
    (error: any) => {
        Promise.reject(error)
    }
)

// Response interceptors
service.interceptors.response.use(
    (response: any) => {
        const res = response.data
        // return Promise.reject(new Error('Error'))
        return res
    },
    (error: any) => {
        return Promise.reject(error)
    }
)

export default service