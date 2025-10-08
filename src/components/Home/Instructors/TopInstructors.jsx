import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import InstructorCard from './InstructorCard'; // Assuming the component is correctly imported
import { useQuery } from '@tanstack/react-query';
import Instructor from '../../../api/Instructor';

const TopInstructors = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const ITEMS_TO_SHOW = 4;
	const ITEM_WIDTH_PERCENT = 100 / ITEMS_TO_SHOW;

	const { isLoading, isError, data } = useQuery({
		queryKey: ['Instructors'],
		queryFn: Instructor.getAllInstructors,
	});

	if (isLoading) {
		return <div>Loading Instructors...</div>;
	}

	if (isError) {
		return <div>An error occurred while fetching data.</div>;
	}

	const instructors = data.data.sort((a, b) => b.rate - a.rate) || [];

	const itemCount = instructors.length;
	// Maximum index we can scroll to while still showing ITEMS_TO_SHOW
	const maxIndex = itemCount > ITEMS_TO_SHOW ? itemCount - ITEMS_TO_SHOW : 0;

	// Translation amount in percentage
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
		<section className="mx-auto py-12 px-4">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-3xl font-bold text-gray-900">Top Instructors</h2>
				<div className="flex gap-3">
					<button
						onClick={prevSlide}
						disabled={isPrevDisabled}
						className={`flex justify-center items-center rounded-lg p-2 transition duration-150 ${
							isPrevDisabled
								? 'bg-[#E2E8F0] cursor-not-allowed'
								: 'bg-gray-300 hover:bg-gray-400 cursor-pointer'
						}`}
						aria-label="Previous Instructor">
						<ChevronLeft
							strokeWidth={2.5}
							color={isPrevDisabled ? '#6B7280' : '#FFFFFF'}
							className="w-5 h-5"
						/>
					</button>
					<button
						onClick={nextSlide}
						disabled={isNextDisabled}
						className={`flex justify-center items-center rounded-lg p-2 transition duration-150 ${
							isNextDisabled
								? 'bg-[#E2E8F0] cursor-not-allowed'
								: 'bg-gray-300 hover:bg-gray-400 cursor-pointer'
						}`}
						aria-label="Next Instructor">
						<ChevronRight
							color={isNextDisabled ? '#6B7280' : '#FFFFFF'}
							strokeWidth={2.5}
							className="w-5 h-5"
						/>
					</button>
				</div>
			</div>

			<div className="flex overflow-x-hidden pb-2">
				<div
					className="flex w-full gap-5.5 items-center transition-transform duration-500 ease-in-out"
					style={{
						transform: `translateX(${slideAmount}%)`,
						maxWidth: `${itemCount * ITEM_WIDTH_PERCENT}%`,
					}}>
					{instructors.map((instructor) => (
						<InstructorCard
							key={instructor.id}
							instructor={instructor}
							ITEM_WIDTH_PERCENT={ITEM_WIDTH_PERCENT}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default TopInstructors;
