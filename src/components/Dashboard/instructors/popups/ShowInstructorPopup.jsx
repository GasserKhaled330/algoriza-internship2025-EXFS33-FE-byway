import React from 'react';
import Popup from '../../../Popup.jsx';
import Instructor from '../../../../api/Instructor.js';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import {
	selectedInstructorIdAtom,
	showViewPopupAtom,
} from '../../../../Atoms/instructorAtoms.js';

const ShowInstructorPopup = ({ onClose }) => {
	const instructorId = useAtomValue(selectedInstructorIdAtom);
	const showPopup = useAtomValue(showViewPopupAtom);

	const {
		isError,
		error,
		data: instructor,
		isPending,
	} = useQuery({
		queryKey: ['instructor', instructorId],
		queryFn: () => Instructor.getInstructor(instructorId),
		enabled: !!instructorId && showPopup,
	});

	if (!instructorId) {
		return null;
	}

	if (isError) console.error(error);

	if (isPending) {
		return (
			<Popup show={showPopup} onClose={onClose}>
				<p className="text-center p-8">Loading instructor data...</p>
			</Popup>
		);
	}

	return (
		<Popup show={showPopup} onClose={onClose}>
			<h2 className="text-lg font-medium text-[#202637] mb-4">
				View Instructor
			</h2>
			<div className="grid gap-3">
				<div className="m-2">
					<img
						src={instructor?.imagePath}
						id="image"
						name="image"
						className="size-20 rounded cursor-pointer"
						alt="instructor image"
					/>
				</div>
				<div className="flex flex-col justify-center">
					<label htmlFor="fullName" className="text-sm font-medium mb-2">
						Name
					</label>
					<input
						type="text"
						id="fullName"
						name="fullName"
						value={instructor?.fullName}
						className="bg-gray-100 text-sm font-medium rounded-lg p-2 focus:outline-blue-500"
						disabled
					/>
				</div>
				<div className="grid grid-cols-2 gap-2">
					<div className="flex flex-col justify-center">
						<label htmlFor="jobTitle" className="text-sm font-medium mb-2">
							Job Title
						</label>
						<input
							type="text"
							name="jobTitle"
							value={instructor?.jobTitle}
							className="bg-gray-100 text-sm font-medium rounded-lg p-2 focus:outline-blue-500"
							disabled
						/>
					</div>
					<div className="flex flex-col justify-center">
						<label htmlFor="rate" className="text-sm font-medium mb-2">
							Rate
						</label>
						<input
							type="number"
							id="rate"
							name="rate"
							value={instructor?.rate}
							className="bg-gray-100 text-sm font-medium rounded-lg p-2 focus:outline-blue-500"
							disabled
						/>
					</div>
				</div>
				<div className="flex flex-col">
					<label htmlFor="bio" className="text-sm font-medium mb-1">
						Bio
					</label>
					<textarea
						name="bio"
						id="bio"
						className="h-full bg-gray-100 text-sm font-medium rounded-2xl p-2 resize-none focus:outline-blue-500"
						value={instructor?.bio}
						rows="5"
						cols="40"
						maxLength="500"
						required
						autoComplete="bio"
						disabled
					/>
				</div>
			</div>
		</Popup>
	);
};

export default ShowInstructorPopup;
