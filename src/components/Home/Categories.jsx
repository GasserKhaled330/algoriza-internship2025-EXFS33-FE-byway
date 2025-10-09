import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import Category from '../../api/Category';

const Categories = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const ITEMS_TO_SHOW = 3;
	const ITEM_WIDTH_PERCENT = 100 / ITEMS_TO_SHOW;

	const GAP_REM_VALUE = 1.25;
	const GAP_PER_ITEM = (GAP_REM_VALUE * (ITEMS_TO_SHOW - 1)) / ITEMS_TO_SHOW;

	const { data } = useQuery({
		queryKey: ['Categories'],
		queryFn: Category.getCategories,
	});

	const itemCount = data?.length || 0;

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

	const TRACK_WIDTH_PERCENT = (itemCount / ITEMS_TO_SHOW) * 100;

	return (
		<section className="mx-auto py-12 px-4">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-[#0F172A] font-bold text-2xl">Top Categories</h2>
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

			<div className="flex overflow-x-scroll md:overflow-x-hidden pb-2">
				<div
					className="flex gap-5 items-center transition-transform duration-500 ease-in-out"
					style={{
						transform: `translateX(${slideAmount}%)`,
						width: `${TRACK_WIDTH_PERCENT}%`,
					}}>
					{data?.map((item) => (
						<div
							key={item.id}
							className={`flex flex-col justify-center items-center bg-gray-50 h-full flex-shrink-0 shadow-md rounded-lg p-4 `}
							style={{
								width: `calc(${ITEM_WIDTH_PERCENT}% - ${GAP_PER_ITEM}rem)`,
							}}>
							<div className="flex justify-center items-center bg-[#E0F2FE] w-[100px] h-[100px] rounded-full mb-3">
								<img src={item.imagePath} alt="category image" />
							</div>
							<p className="text-[#0F172A] text-lg font-bold mb-3">
								{item.name}
							</p>
							<span className="text-[#334155] text-[16px]">11 Courses</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Categories;
