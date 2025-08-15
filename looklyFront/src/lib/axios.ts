import axios from 'axios';
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';


const baseURL = 'http://localhost:8000';

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para añadir token y refrescar si expira
api.interceptors.request.use(async (config) => {
    let accessToken = localStorage.getItem('access');
    const refreshToken = localStorage.getItem('refresh');

    if (accessToken) {
        const decoded = jwtDecode(accessToken);
        const isExpired = dayjs.unix(decoded.exp).diff(dayjs()) < 1;

        if (isExpired && refreshToken) {
            try {
                const res = await axios.post(`${baseURL}/token/refresh/`, { refresh: refreshToken });
                localStorage.setItem('access', res.data.access);
                accessToken = res.data.access;
            } catch (err) {
                window.location.href = '/login';
            }
        }

        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
}, (error) => Promise.reject(error));

export default api;