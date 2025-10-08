import axios from 'axios';
import auth from '../api/auth.js';

const API_BASE_URL = 'http://localhost:5007/api';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL
});

axiosInstance.interceptors.request.use(
    (config) => {
        const authState = JSON.parse(localStorage.getItem('auth') || '{}');
        const token = authState.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            console.log('Authentication error. Logging out...');
            auth.logout();
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;