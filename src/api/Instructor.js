import axiosInstance from '../services/api.js';

const getInstructors = async (
	pageIndex = 1,
	pageSize = 5,
	name = null,
	jobTitle = null
) => {
	const response = await axiosInstance.get(
		`/instructors/?pageIndex=${pageIndex}&pageSize=${pageSize}&name=${name}&jobTitle=${jobTitle}`
	);
	return response.data;
};

const getAllInstructors = async () => {
	const response = await axiosInstance.get(`/instructors`);
	return response.data;
};

const getInstructor = async (instructorId) => {
	const response = await axiosInstance.get(`/instructors/${instructorId}`);
	return response.data;
};

const getInstructorJobTitles = async () => {
	const response = await axiosInstance.get('/Instructors/JobTitles');
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
	getAllInstructors,
	getInstructors,
	getInstructorJobTitles,
	saveInstructor,
	getInstructor,
	removeInstructor,
};

export default Instructor;
