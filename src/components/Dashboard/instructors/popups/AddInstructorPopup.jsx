import React from 'react';
import UpdateInstructorFrom from '../UpdateInstructorFrom';
import AddInstructorForm from '../AddInstructorForm';

const AddInstructorPopup = ({ isUpdate }) => {
	return <>{isUpdate ? <UpdateInstructorFrom /> : <AddInstructorForm />}</>;
};

export default AddInstructorPopup;
