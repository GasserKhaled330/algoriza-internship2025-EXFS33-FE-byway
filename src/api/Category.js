import axiosInstance from '../services/api.js';

const getCategories = async () => {
	const response = await axiosInstance.get('/Categories');
	return response.data;
};

const Category = { getCategories };

export default Category;
