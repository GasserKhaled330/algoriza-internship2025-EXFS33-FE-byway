import React from 'react';
import AvaterImage from '/avater-img.webp';

const TestimonialCard = ({ testimonial, ITEM_WIDTH_PERCENT }) => {
	const quote =
		"Byway's tech courses are top-notch! As someone who's always looking to stay ahead in the rapidly evolving tech world, I appreciate the up-to-date content and engaging multimedia.";
	const name = testimonial?.name || 'Jane Doe';
	const title = 'Designer';

	return (
		<div
			className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col justify-between flex-shrink-0 w-full  transition duration-300 cursor-pointer hover:shadow-md hover:scale-95"
			style={{
				width: `calc(${ITEM_WIDTH_PERCENT}% - 1.5rem)`,
				minHeight: '280px',
			}}>
			<div>
				<span className="text-blue-600 text-5xl font-extrabold leading-none">
					&ldquo;
				</span>
				<p className="text-gray-700 text-base mt-2 mb-6">{quote}</p>
			</div>

			<div className="flex items-center mt-auto">
				<div className="w-12 h-12 rounded-full overflow-hidden mr-3">
					<img
						src={AvaterImage}
						alt={name}
						className="w-full h-full object-cover"
						loading="lazy"
					/>
				</div>

				<div>
					<p className="text-gray-900 font-semibold">{name}</p>
					<p className="text-gray-500 text-sm">{title}</p>
				</div>
			</div>
		</div>
	);
};

export default TestimonialCard;
