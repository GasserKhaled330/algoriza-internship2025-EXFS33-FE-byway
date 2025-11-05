import React from 'react';
import { Trash2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import Course from '../../../api/Course';
import Popup from '../../Popup';
import {
	showDeleteCoursePopupAtom,
	selectedCourseIdAtom,
	selectedCourseNameAtom,
} from '../../../Atoms/courseAtoms';
import toast from 'react-hot-toast';

const DeleteCoursePopup = ({ onClose }) => {
	const courseId = useAtomValue(selectedCourseIdAtom);
	const selectedCourseName = useAtomValue(selectedCourseNameAtom);
	const showPopup = useAtomValue(showDeleteCoursePopupAtom);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationKey: ['removeCourse', courseId],
		mutationFn: () => Course.removeCourse(courseId),
		onSuccess: async () => {
			onClose();
			await queryClient.invalidateQueries({ queryKey: ['Courses'] });
			toast.success(
				<p className="text-sm font-medium">course data deleted successfully</p>
			);
		},
		onError: (error) => {
			toast.error(
				<p className="text-sm font-medium">
					{error.response?.data.detail ||
						'Failed to remove course. Try again later'}
				</p>
			);
		},
	});

	return (
		<Popup show={showPopup} onClose={onClose}>
			<div className="flex flex-col items-center justify-center">
				<div className="flex flex-col items-center justify-center">
					<div className="flex justify-center items-center bg-red-300 w-[80px] h-[80px] rounded-full">
						<Trash2 color="#FF5555" size={60} />
					</div>
					<p className="text-[#858585] text-lg text-wrap font-medium p-2 mt-4">
						Are you sure you want to delete this course
						<br />
						<span className="text-[#242B42] text-lg font-semibold p-1">
							{selectedCourseName}?
						</span>
					</p>
				</div>

				<div className="flex justify-center">
					<button
						onClick={() => {
							mutation.mutate(courseId);
						}}
						className="text-white min-w-[200px] text-xl bg-[#EF5A5A] rounded p-2 mt-4 cursor-pointer">
						Delete
					</button>
				</div>
			</div>
		</Popup>
	);
};

export default DeleteCoursePopup;
