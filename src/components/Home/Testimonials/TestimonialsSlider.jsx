import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import TestimonialCard from './TestimonialCard';

const mockTestimonials = [
	{ id: 1, name: 'Jane Doe' },
	{ id: 2, name: 'Haneen Abdulhaleem' },
	{ id: 3, name: 'John Smith' },
	{ id: 4, name: 'Emily Clark' },
	{ id: 5, name: 'David Lee' },
	{ id: 6, name: 'Sara Jones' },
];

const TestimonialsSlider = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const ITEMS_TO_SHOW = 3;
	const ITEM_WIDTH_PERCENT = 100 / ITEMS_TO_SHOW;

	const itemCount = mockTestimonials.length;

	const maxIndex = itemCount > ITEMS_TO_SHOW ? itemCount - ITEMS_TO_SHOW : 0;

	const slideAmount = -activeIndex * ITEM_WIDTH_PERCENT;

	const nextSlide = () => {
		setActiveIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
	};

	const prevSlide = () => {
		setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
	};

	const isPrevDisabled = activeIndex === 0;
	const isNextDisabled = activeIndex === maxIndex;

	return (
		<section className="bg-gray-50 mx-auto py-12 px-4">
			<div className="flex justify-between items-center mb-10">
				<h2 className="text-3xl font-bold text-gray-900 leading-tight">
					What Our Customer Say <br /> About Us
				</h2>
				<div className="flex gap-3">
					<button
						onClick={prevSlide}
						disabled={isPrevDisabled}
						className={`flex justify-center items-center rounded-lg p-3 transition duration-150 ${
							isPrevDisabled
								? 'bg-gray-200 cursor-not-allowed'
								: 'bg-gray-300 hover:bg-gray-400 cursor-pointer'
						}`}>
						<ChevronLeft color="#6B7280" strokeWidth={3} className="w-5 h-5" />
					</button>
					<button
						onClick={nextSlide}
						disabled={isNextDisabled}
						className={`flex justify-center items-center rounded-lg p-3 transition duration-150 ${
							isNextDisabled
								? 'bg-gray-200 cursor-not-allowed'
								: 'bg-gray-300 hover:bg-gray-400 cursor-pointer'
						}`}>
						<ChevronRight color="#6B7280" strokeWidth={3} className="w-5 h-5" />
					</button>
				</div>
			</div>

			<div className="flex overflow-x-hidden pb-2">
				<div
					className="flex w-full gap-6 items-stretch transition-transform duration-500 ease-in-out"
					style={{
						transform: `translateX(${slideAmount}%)`,
						width: `${itemCount * ITEM_WIDTH_PERCENT}%`,
					}}>
					{mockTestimonials.map((testimonial) => (
						<TestimonialCard
							key={testimonial.id}
							testimonial={testimonial}
							ITEM_WIDTH_PERCENT={ITEM_WIDTH_PERCENT}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default TestimonialsSlider;
