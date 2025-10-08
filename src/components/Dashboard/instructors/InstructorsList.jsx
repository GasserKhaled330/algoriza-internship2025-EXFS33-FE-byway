import React from 'react';
import { Eye, PencilLine, Trash2 } from 'lucide-react';
import { useSetAtom } from 'jotai';
import {
	selectedInstructorIdAtom,
	showViewPopupAtom,
	showDeletePopupAtom,
	showUpdatePopupAtom,
	closeAllPopupsAtom,
} from '../../../Atoms/instructorAtoms';

import ShowInstructorPopup from './popups/ShowInstructorPopup.jsx';
import AddInstructorForm from './AddInstructorForm.jsx';
import DeleteInstructorPopup from './popups/DeleteInstructorPopup.jsx';
import UpdateInstructorPopup from './popups/UpdateInstructorPopup.jsx';

const InstructorsList = ({ columns, data }) => {
	const setInstructorId = useSetAtom(selectedInstructorIdAtom);
	const setShowViewPopup = useSetAtom(showViewPopupAtom);
	const setShowUpdatePopup = useSetAtom(showUpdatePopupAtom);
	const setShowDeletePopup = useSetAtom(showDeletePopupAtom);

	const closeAllPopups = useSetAtom(closeAllPopupsAtom);

	const handleOpenPopup = (instructorId) => {
		setInstructorId(instructorId);
		setShowViewPopup(true);
	};

	const handleOpenUpdatePopup = (instructorId) => {
		setInstructorId(instructorId);
		setShowUpdatePopup(true);
	};

	const handleOpenDeletePopup = (instructorId) => {
		setInstructorId(instructorId);
		setShowDeletePopup(true);
	};

	const handleClosePopup = closeAllPopups;

	return (
		<>
			<table className="table-fixed w-full shadow-md rounded-md">
				<thead className="bg-[#F1F5FF]">
					<tr className="text-left h-12">
						{columns.map((column) => (
							<th
								key={column}
								className="py-2 px-4 border-b border-gray-200 text-[#202637] font-semibold">
								{column}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map(({ id, fullName, jobTitle, rate }) => (
						<tr key={id} className="h-12 border-b border-gray-200">
							<td className="py-2 px-4  text-gray-800">{fullName}</td>
							<td className="py-2 px-4  text-gray-800">{jobTitle}</td>
							<td className="py-2 px-4  text-gray-800 ">
								{/*<div className="star-fill" style={{width: ((rate / 5) * 100) + "%" }}></div>*/}
								<span
									className="average-rating"
									style={{ '--star-fill': `${(rate / 5) * 100}%` }}
									aria-label={`Rating: ${rate} out of 5`}></span>
							</td>

							<td className="flex items-center py-2 px-4  text-gray-800">
								<button
									className="cursor-pointer"
									title="show instructor data"
									onClick={() => handleOpenPopup(id)}>
									<Eye color="#5879DC" size={16} className="mr-4" />
								</button>
								<button
									className="cursor-pointer"
									title="update instructor data"
									onClick={() => handleOpenUpdatePopup(id)}>
									<PencilLine color="#5879DC" size={16} className="mr-4" />
								</button>
								<button
									className="cursor-pointer"
									title="delete instructor"
									onClick={() => handleOpenDeletePopup(id)}>
									<Trash2 color="#EB5757" size={16} />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<ShowInstructorPopup onClose={handleClosePopup} />
			<DeleteInstructorPopup onClose={handleClosePopup} />
			<UpdateInstructorPopup onClose={handleClosePopup} />
		</>
	);
};

export default InstructorsList;
