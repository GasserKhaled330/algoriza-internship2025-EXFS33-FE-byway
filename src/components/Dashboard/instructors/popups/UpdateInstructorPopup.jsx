import React from 'react';
import { useAtomValue } from 'jotai';
import {
	showUpdatePopupAtom,
	selectedInstructorIdAtom,
} from '../../../../Atoms/instructorAtoms.js';
import AddInstructorPopup from './AddInstructorPopup.jsx';

const UpdateInstructorPopup = () => {
	const instructorId = useAtomValue(selectedInstructorIdAtom);
	const showPopup = useAtomValue(showUpdatePopupAtom);

	if (!instructorId || !showPopup) {
		return null;
	}

	return <AddInstructorPopup isUpdate={true} />;
};

export default UpdateInstructorPopup;
