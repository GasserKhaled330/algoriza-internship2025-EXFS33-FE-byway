import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
	// Use data from the course object, or defaults for the placeholder
	const totalLectures =
		course?.contents.reduce((sum, content) => {
			return sum + content.lecturesCount;
		}, 0) || 0;

	const title = course?.name || "Beginner's Guide to Design";
	const instructor = course?.instructorName || 'Ronald Richards';
	const hours = course?.totalHours || 22;
	const lectures = totalLectures || 155;
	const price = course?.cost || 45.0;
	const tag = course?.categoryName || 'UI/UX Design';
	const imageUrl = course?.imagePath;
	const rate = course?.rate || 5;

	// Helper function to render star icons
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

	return (
		<Link
			to={`/courses/${course.id}`}
			className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition duration-300 cursor-pointer">
			<div className="relative h-40 overflow-hidden">
				<div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-600 text-sm">
					<img
						src={imageUrl}
						alt={title}
						className="w-full h-full object-cover"
					/>
				</div>

				<span className="absolute top-4 left-4 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
					{tag}
				</span>
			</div>

			{/* Card Content */}
			<div className="p-4">
				{/* Title */}
				<h3 className="text-gray-900 font-semibold text-lg mb-1 line-clamp-2">
					{title}
				</h3>

				{/* Instructor */}
				<p className="text-gray-600 text-sm mb-2">By {instructor}</p>

				{/* Rating Stars */}
				<div className="flex items-center space-x-0.5 mb-2">
					{renderStars(rate)}
				</div>

				{/* Details */}
				<p className="text-gray-500 text-xs mb-3">
					{hours} Total Hours. {lectures} Lectures. Beginner
				</p>

				{/* Price */}
				<p className="text-gray-900 font-bold text-xl">${price.toFixed(2)}</p>
			</div>
		</Link>
	);
};

export default CourseCard;
