import axiosInstance from '../services/api.js';

const getInstructors = async (pageIndex = 1, pageSize, name, jobTitle) => {
	const params = new URLSearchParams();
	if (pageIndex) params.append('pageIndex', pageIndex);
	if (pageSize) params.append('pageSize', pageSize);
	if (name) params.append('name', name);
	if (jobTitle) params.append('jobTitle', jobTitle);
	const response = await axiosInstance.get(
		`/instructors/?${params.toString()}`
	);
	return response.data;
};

// const getAllInstructors = async (pageIndex = 1, pageSize = 6) => {
// 	const params = new URLSearchParams();
// 	if (pageIndex) params.append('pageIndex', pageIndex);
// 	if (pageSize) params.append('pageSize', pageSize);
// 	const response = await axiosInstance.get(`/instructors?${params.toString()}`);
// 	return response.data;
// };

const getInstructor = async (instructorId) => {
	const response = await axiosInstance.get(`/instructors/${instructorId}`);
	return response.data;
};

const getInstructorJobTitles = async () => {
	const response = await axiosInstance.get('/Instructors/JobTitles');
	return response.data;
};

const getInstructorsCount = async () => {
	const response = await axiosInstance.get('/Instructors/count');
	return response.data;
};

const saveInstructor = async (instructor) => {
	if (instructor.get('Id')) {
		const response = await axiosInstance.put(
			`/Instructors/${instructor.get('Id')}`,
			instructor
		);
		return response.data;
	} else {
		const response = await axiosInstance.post('/Instructors', instructor);
		return response.data;
	}
};

const removeInstructor = async (id) => {
	const response = await axiosInstance.delete(`/Instructors/${id}`);
	return response.data;
};

const Instructor = {
	// getAllInstructors,
	getInstructors,
	getInstructorJobTitles,
	getInstructorsCount,
	saveInstructor,
	getInstructor,
	removeInstructor,
};

export default Instructor;
