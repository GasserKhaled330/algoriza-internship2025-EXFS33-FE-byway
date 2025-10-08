import React from 'react';
import { Trash2 } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import Course from '../../../api/Course';
import Popup from '../../Popup';
import {
	showDeleteCoursePopupAtom,
	selectedCourseIdAtom,
} from '../../../Atoms/courseAtoms';
const DeleteCoursePopup = ({ onClose }) => {
	const showPopup = useAtomValue(showDeleteCoursePopupAtom);
	const courseId = useAtomValue(selectedCourseIdAtom);

	const queryClient = useQueryClient();
	const { data: course } = useQuery({
		queryKey: ['Course', courseId],
		queryFn: Course.getCourseById,
		enabled: !!courseId && showPopup,
	});

	const mutation = useMutation({
		mutationKey: ['removeCourse', courseId],
		mutationFn: () => Course.removeCourse(courseId),
		onSuccess: async () => {
			onClose();
			await queryClient.invalidateQueries({ queryKey: ['Courses'] });
		},
		onError: (error) => {
			console.error('Mutation error:', error);
		},
	});
	return (
		<Popup show={showPopup} onClose={onClose}>
			<div className="flex flex-col items-center justify-center min-h-[250px] max-w-[400px]">
				<div className="flex flex-col items-center justify-center">
					<div className="flex justify-center items-center bg-red-300 w-[80px] h-[80px] rounded-full">
						<Trash2 color="#FF5555" size={60} />
					</div>
					<p className="text-[#858585] text-lg text-wrap font-medium p-2 mt-4">
						Are you sure you want to delete this course
						<br />
						<span className="text-[#242B42] text-lg font-semibold p-1">
							{course?.name}?
						</span>
					</p>
				</div>
				<div className="flex justify-center">
					<button
						onClick={() => {
							mutation.mutate(course?.id);
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
