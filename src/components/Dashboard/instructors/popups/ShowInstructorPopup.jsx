import React from 'react';
import { Star } from 'lucide-react';
import Popup from '../../../Popup.jsx';
import Instructor from '../../../../api/Instructor.js';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import {
	selectedInstructorIdAtom,
	showViewPopupAtom,
} from '../../../../Atoms/instructorAtoms.js';
import Loader from '../../../Common/Loader.jsx';
import toast from 'react-hot-toast';

const ShowInstructorPopup = ({ onClose }) => {
	const instructorId = useAtomValue(selectedInstructorIdAtom);
	const showPopup = useAtomValue(showViewPopupAtom);

	const {
		isError,
		data: instructor,
		isPending,
		isFetching,
	} = useQuery({
		queryKey: ['instructor', instructorId],
		queryFn: () => Instructor.getInstructor(instructorId),
		enabled: !!instructorId && showPopup,
	});

	if (!instructorId) {
		return null;
	}

	if (isPending || isFetching) {
		return <Loader />;
	}
	if (isError) {
		toast.error(
			<p className="text-sm font-medium">
				Failed to fetch instructor data, Please try again later.
			</p>
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
						className="size-30 rounded cursor-pointer object-fill"
						alt="instructor image"
						loading="lazy"
					/>
				</div>
				<div className="flex flex-col justify-center">
					<label className="text-sm font-medium mb-2">Name</label>
					<input
						type="text"
						id="fullName"
						name="fullName"
						value={instructor?.fullName}
						className="bg-gray-100 text-sm font-medium rounded-lg p-2"
						disabled
					/>
				</div>
				<div className="grid grid-cols-2 gap-2">
					<div className="flex flex-col justify-center">
						<label className="text-sm font-medium mb-2">Job Title</label>
						<input
							type="text"
							name="jobTitle"
							value={instructor?.jobTitle}
							className="bg-gray-100 text-sm font-medium rounded-lg p-2"
							disabled
						/>
					</div>
					<div className="flex flex-col justify-center">
						<label className="text-sm font-medium mb-2">Rate</label>
						<div className="flex items-center py-2 space-x-1">
							{[1, 2, 3, 4, 5].map((star) => (
								<Star
									key={star}
									className={`w-6 h-6 cursor-pointer ${
										instructor?.rate >= star
											? 'text-yellow-400 fill-yellow-400 '
											: 'text-gray-300'
									}`}
								/>
							))}
						</div>
					</div>
				</div>
				<div className="flex flex-col">
					<label className="text-sm font-medium mb-1">Bio</label>
					<textarea
						name="bio"
						id="bio"
						className="min-h-[50px] max-h-[100px] bg-gray-100 text-sm font-medium rounded p-2 resize-none"
						value={instructor?.bio}
						maxLength="500"
						disabled
					/>
				</div>
			</div>
		</Popup>
	);
};

export default ShowInstructorPopup;
