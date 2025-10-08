import axiosInstance from '../services/api';

const processCheckout = async () => {
	const response = await axiosInstance.post(`Checkout`);
	return response.data;
};

const Checkout = { processCheckout };

export default Checkout;
