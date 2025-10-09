import axiosInstance from '../services/api';

const getCourses = async ({ queryKey }) => {
	const [_, filters] = queryKey;
	const params = new URLSearchParams();
	params.append('pageIndex', filters.pageIndex);
	params.append('pageSize', filters.pageSize);
	params.append('sortBy', filters.sortBy);
	if (filters.category) params.append('category', filters.category);
	if (filters.cost) params.append('cost', filters.cost);
	if (filters.rating) params.append('rating', filters.rating);
	if (filters.minLecturesCount)
		params.append('minLecturesCount', filters.minLecturesCount);
	if (filters.maxLecturesCount)
		params.append('maxLecturesCount', filters.maxLecturesCount);

	const response = await axiosInstance.get(`/Courses?${params.toString()}`);
	console.log(response.data);
	return response.data;
};

const getTopCourses = async (count) => {
	const response = await axiosInstance.get(`/Courses/top-rated?count=${count}`);
	return response.data;
};

const getTopCoursesInSameCategory = async (courseId, categoryId) => {
	const response = await axiosInstance.get(
		`/Courses/${courseId}/related/top-rated?categoryId=${categoryId}`
	);
	return response.data;
};

const getCourseById = async (courseId) => {
	const response = await axiosInstance.get(`/Courses/${courseId}`);
	return response.data;
};

const getCoursesCount = async () => {
	const response = await axiosInstance.get('/Courses/count');
	return response.data;
};

const saveCourse = async (course) => {
	// const form = new FormData();
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
	getCoursesCount,
};

export default Course;
