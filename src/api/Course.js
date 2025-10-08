import axiosInstance from '../services/api';

const getCourses = async ({ queryKey }) => {
	const [_, filters] = queryKey;
	const params = new URLSearchParams(filters).toString();
	const response = await axiosInstance.get(`/Courses?${params}`);
	return response.data;
};

const getTopCourses = async (count) => {
	const response = await axiosInstance.get(`/Courses/top-rated?${count}`);
	return response.data;
};

const getTopCoursesInSameCategory = async ({ queryKey }) => {
	const [_, courseId, categoryId] = queryKey;
	const response = await axiosInstance.get(
		`/Courses/${courseId}/related/top-rated?categoryId=${categoryId}`
	);
	return response.data;
};

const getCourseById = async ({ queryKey }) => {
	const [_, courseId] = queryKey;
	const response = await axiosInstance.get(`/Courses/${courseId}`);
	return response.data;
};

const saveCourse = async (course) => {
	const courseId = course.get('Id');
	if (courseId) {
		const response = await axiosInstance.put(`/Courses/${courseId}`, course);
		return response.data;
	} else {
		const response = await axiosInstance.post('/Courses', course);
		return response.data;
	}
};
const removeCourse = async (id) => {
	const response = await axiosInstance.delete(`/Courses/${id}`);
	return response.data;
};

const Course = {
	getCourses,
	getTopCourses,
	getTopCoursesInSameCategory,
	getCourseById,
	removeCourse,
	saveCourse,
};

export default Course;
