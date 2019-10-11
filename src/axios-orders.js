import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'https://burgerapp-daae8.firebaseio.com/'
});

export default axiosInstance;