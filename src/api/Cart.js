import axiosInstance from '../services/api';

const getCartItems = async () => {
	const response = await axiosInstance.get('/Cart');
	return response.data;
};

const getCartItemsCount = async () => {
	const response = await axiosInstance.get('/Cart/count');
	return response.data;
};

const removeCartItem = async (courseId) => {
	const response = await axiosInstance.delete(`/Cart/${courseId}`);
	return response.data;
};

const saveCartItem = async (courseId) => {
	const response = await axiosInstance.post(`/Cart/${courseId}`);
	return response.data;
};

const checkItemStatus = async (courseId) => {
	const response = await axiosInstance.get(`/Cart/IsInCart/${courseId}`);
	return response.data;
};

const Cart = {
	getCartItems,
	getCartItemsCount,
	removeCartItem,
	saveCartItem,
	checkItemStatus,
};

export default Cart;
