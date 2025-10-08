import axiosInstance from '../services/api.js';

const register = async (newUser) => {
	const response = await axiosInstance.post('/auth/register', newUser);
	console.log(response.data);
	return response.data;
};

const login = async (email, password) => {
	const response = await axiosInstance.post('/auth/login', { email, password });
	return response.data;
};

export const logout = () => {
	localStorage.removeItem('auth');
	window.location.href = '/';
};

const auth = { register, login, logout };

export default auth;
