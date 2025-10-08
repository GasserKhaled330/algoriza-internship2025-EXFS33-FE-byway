import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Instructor from '../../../../api/Instructor.js';
import Popup from '../../../Popup.jsx';
import { Trash2 } from 'lucide-react';
import { useAtomValue } from 'jotai';
import {
	selectedInstructorIdAtom,
	showDeletePopupAtom,
} from '../../../../Atoms/instructorAtoms.js';

const DeleteInstructorPopup = ({ onClose }) => {
	const instructorId = useAtomValue(selectedInstructorIdAtom);
	const showPopup = useAtomValue(showDeletePopupAtom);

	const queryClient = useQueryClient();

	const { data: instructor } = useQuery({
		queryKey: ['instructor', instructorId],
		queryFn: () => Instructor.getInstructor(instructorId),
		enabled: !!instructorId && showPopup,
	});

	const mutation = useMutation({
		mutationKey: ['removeInstructor', instructorId],
		mutationFn: Instructor.removeInstructor,
		onSuccess: async () => {
			onClose();
			await queryClient.invalidateQueries({ queryKey: ['instructors'] });
		},
		onError: (error) => {
			console.error('Mutation error:', error);
		},
	});

	return (
		<>
			<Popup show={showPopup} onClose={onClose}>
				<div className="flex flex-col items-center justify-center min-h-[250px] max-w-[400px]">
					<div className="flex flex-col items-center justify-center">
						<div className="flex justify-center items-center bg-red-300 w-[80px] h-[80px] rounded-full">
							<Trash2 color="#FF5555" size={60} />
						</div>
						<p className="text-[#858585] text-lg text-wrap font-medium p-2 mt-4">
							Are you sure you want to delete this Instructor
							<br />
							<span className="text-[#242B42] text-lg font-semibold p-1">
								{instructor?.fullName}?
							</span>
						</p>
					</div>
					<div className="flex justify-center">
						<button
							onClick={() => {
								mutation.mutate(instructorId);
							}}
							className="text-white min-w-[200px] text-xl bg-[#EF5A5A] rounded p-2 mt-4 cursor-pointer">
							Delete
						</button>
					</div>
				</div>
			</Popup>
		</>
	);
};

export default DeleteInstructorPopup;
