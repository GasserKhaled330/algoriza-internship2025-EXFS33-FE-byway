import React from 'react';
import { Star, Clock, List, Eye, PencilLine, Trash2 } from 'lucide-react';
import { useSetAtom } from 'jotai';
import {
	selectedCourseIdAtom,
	selectedCourseNameAtom,
	showDeleteCoursePopupAtom,
} from '../../../Atoms/courseAtoms';
import { Link } from 'react-router-dom';

const renderStars = (rating = 5) => {
	return Array.from({ length: 5 }, (_, index) => (
		<Star
			key={index}
			className={`w-4 h-4 ${
				index < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
			}`}
		/>
	));
};

const CourseCard = ({ course }) => {
	const setCourseId = useSetAtom(selectedCourseIdAtom);
	const setCourseName = useSetAtom(selectedCourseNameAtom);
	const setShowDeletePopup = useSetAtom(showDeleteCoursePopupAtom);

	const id = course?.id;
	const name = course?.name || "Beginner's Guide to Design";
	const imagePath = course?.imagePath;
	const categoryName = course?.categoryName || 'UI/UX Design';
	const instructorName = course?.instructorName || 'Ronald Richards';
	const level = course?.level || 'Beginner';
	const rate = course?.rate || 5;
	const totalHours = course?.totalHours || 22;
	const cost = course?.cost || 45.0;
	const totalLectures =
		course?.contents.reduce((sum, content) => {
			return sum + content.lecturesCount;
		}, 0) || 20;

	const handleOpenDeletePopup = (id, name) => {
		setCourseId(id);
		setCourseName(name);
		setShowDeletePopup(true);
	};

	return (
		<div
			className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-400 transition duration-300 cursor-pointer hover:shadow-lg"
			key={id}>
			<div className="relative h-40 overflow-hidden">
				<div className="absolute inset-0 bg-gray-200">
					<img
						src={imagePath}
						alt={name}
						className="w-full h-full object-cover"
						loading="lazy"
					/>
				</div>
				<span className="absolute top-2 left-2 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
					{categoryName}
				</span>
			</div>

			<div className="p-4">
				<h3 className="text-gray-900 font-semibold text-lg mb-1 line-clamp-2">
					{name}
				</h3>
				<p className="text-gray-600 text-sm mb-2">By {instructorName}</p>

				<div className="flex items-center space-x-0.5 mb-2">
					{renderStars(rate)}
				</div>
				<p className="text-gray-500 text-xs mb-3">
					{totalHours} Total Hours. {totalLectures} Lectures.{' '}
					<strong>{level}</strong>
				</p>

				<p className="text-gray-900 font-bold text-xl mb-2">
					${cost.toFixed(2)}
				</p>

				<div className="flex items-center gap-3 text-gray-800">
					<Link to={`/dashboard/courses/view/${id}`}>
						<button
							className="flex justify-center items-center bg-gray-100 shadow-xl rounded  cursor-pointer"
							title="show course">
							<Eye color="#5879DC" size={16} />
						</button>
					</Link>
					<Link to={`/dashboard/courses/edit/${id}`}>
						<button
							className="flex justify-center items-center bg-gray-100 shadow-md rounded cursor-pointer"
							title="update course">
							<PencilLine color="#5879DC" size={16} />
						</button>
					</Link>
					<button
						className="flex justify-center items-center bg-gray-100 shadow-md rounded  cursor-pointer"
						title="delete course"
						onClick={() => handleOpenDeletePopup(id, name)}>
						<Trash2 color="#EB5757" size={16} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
