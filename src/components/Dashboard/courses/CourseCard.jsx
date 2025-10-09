import React from 'react';
import { Star, Clock, List, Eye, PencilLine, Trash2 } from 'lucide-react';
import { useSetAtom } from 'jotai';
import {
	selectedCourseIdAtom,
	showDeleteCoursePopupAtom,
	closeDeletePopupAtom,
} from '../../../Atoms/courseAtoms';
import DeleteCoursePopup from './DeleteCoursePopup';
const CourseCard = ({ course }) => {
	const setCourseId = useSetAtom(selectedCourseIdAtom);
	const setShowDeletePopup = useSetAtom(showDeleteCoursePopupAtom);
	const closeDeleteCoursePopup = useSetAtom(closeDeletePopupAtom);
	const {
		id,
		imagePath,
		categoryName,
		name,
		instructorName,
		rate,
		totalHours,
		level,
		cost,
		contents,
	} = course;
	const totalLectures = contents.reduce(
		(sum, content) => sum + content.lecturesCount,
		0
	);

	const handleOpenDeletePopup = (id) => {
		setCourseId(id);
		setShowDeletePopup(true);
	};
	const handleClosePopup = closeDeleteCoursePopup;

	return (
		<div
			className="bg-white  rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
			key={id}>
			<div className="relative h-40 overflow-hidden">
				<div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-600 text-sm">
					<img
						src={imagePath}
						alt={name}
						className="w-full h-full object-cover"
					/>
				</div>
				<span className="absolute top-2 left-2 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
					{categoryName}
				</span>
			</div>

			<div className="p-4 space-y-2">
				<h3 className="text-lg font-bold text-gray-900 line-clamp-2">{name}</h3>
				<p className="text-sm text-gray-600">By {instructorName}</p>

				<div className="py-1">
					<span
						className="average-rating"
						style={{ '--star-fill': `${(rate / 5) * 100}%` }}
						aria-label={`Rating: ${rate} out of 5`}></span>
				</div>
				<div className="text-xs text-gray-500 flex items-center space-x-3">
					<span>{totalHours} Total Hours.</span>
					<span>{totalLectures} Lectures.</span>
					<span className="font-semibold">{level}</span>
				</div>

				<div className="pt-2">
					<span className="text-2xl font-bold text-gray-900">
						${cost.toFixed(2)}
					</span>
				</div>

				<div className="flex items-center gap-3 text-gray-800">
					<button
						className="flex justify-center items-center bg-gray-100 shadow-xl rounded  cursor-pointer"
						title="show course">
						<Eye color="#5879DC" size={18} />
					</button>
					<button
						className="flex justify-center items-center bg-gray-100 shadow-md rounded cursor-pointer"
						title="update course">
						<PencilLine color="#5879DC" size={16} />
					</button>
					<button
						className="flex justify-center items-center bg-gray-100 shadow-md rounded  cursor-pointer"
						title="delete course"
						onClick={() => handleOpenDeletePopup(id)}>
						<Trash2 color="#EB5757" size={16} />
					</button>
				</div>
			</div>
			<DeleteCoursePopup onClose={handleClosePopup} />
		</div>
	);
};

export default CourseCard;
