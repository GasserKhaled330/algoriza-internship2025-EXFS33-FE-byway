import React from 'react';
import { Star } from 'lucide-react';

const InstructorCard = ({ instructor, ITEM_WIDTH_PERCENT }) => {
	// Use data from the instructor object, or defaults for the placeholder
	const name = instructor?.fullName || 'Ronald Richards';
	const title = instructor?.jobTitle || 'UI/UX Designer';
	const rating = instructor?.rate || 4.9;
	const students = instructor?.students || 2400;
	const imageUrl = instructor?.imagePath || 'https://placehold.co/600x400';

	const mapJobTitles = (title) => {
		switch (title) {
			case 'BackendDeveloper':
				return 'Backend Developer';
			case 'FrontendDeveloper':
				return 'Frontend Developer';
			case 'FullStackDeveloper':
				return 'Full Stack Developer';
			case 'UxUiDesigner':
				return 'UI/UX Designer';
			default:
				return title;
		}
	};

	return (
		<div
			className="h-full max-h-[400px] bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col items-center flex-shrink-0  transition duration-300 cursor-pointer hover:shadow-md hover:scale-95"
			style={{
				width: `calc(${ITEM_WIDTH_PERCENT}% - 1em)`,
				minHeight: '280px',
			}}>
			{/* Instructor Image */}
			<div className="mb-3">
				<img
					src={imageUrl}
					alt={name}
					className="w-64 h-64 rounded shadow-lg object-cover"
					loading="lazy"
				/>
			</div>

			{/* Content */}
			<div className="text-center">
				{/* Name */}
				<h3 className="text-gray-900 font-bold text-lg mb-1">{name}</h3>

				{/* Title */}
				<p className="text-gray-500 text-sm mb-3">{mapJobTitles(title)}</p>

				{/* Rating and Students */}
				<div className="flex justify-center items-center gap-4 text-sm">
					<div className="flex items-center space-x-1">
						<Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
						<span className="text-gray-800 font-semibold">{rating}</span>
					</div>
					<span className="text-gray-500">
						{students.toLocaleString()} Students
					</span>
				</div>
			</div>
		</div>
	);
};

export default InstructorCard;
