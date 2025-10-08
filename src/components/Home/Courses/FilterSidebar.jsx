import React, { useState } from 'react';
import { ChevronUp, SlidersHorizontal, Star } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import {
	courseFilterAtom,
	updateCourseFilterAtom,
} from '../../../Atoms/filterAtoms';
import { useAtomValue, useSetAtom } from 'jotai';
import Category from '../../../api/Category';

const FilterSection = ({ title, children, open = true }) => (
	<div className="border-b border-gray-200 pb-6 mb-6">
		<h3 className="flex justify-between items-center text-lg font-bold text-gray-900 mb-4 cursor-pointer">
			{title}
			<ChevronUp
				className={`w-4 h-4 text-gray-500 ${
					open ? '' : 'transform rotate-180'
				}`}
			/>
		</h3>
		<div className={`${open ? 'block' : 'hidden'}`}>{children}</div>
	</div>
);

const FilterSidebar = () => {
	const [open, setOpen] = useState(true);
	const filters = useAtomValue(courseFilterAtom);
	const updateFilter = useSetAtom(updateCourseFilterAtom);
	const MAX_PRICE = 1000;
	const MIN_PRICE = 0;
	const sliderValue = Number(filters.cost) || MIN_PRICE;
	const lectureRanges = ['1-15', '16-30', '31-45', 'More than 45'];

	const {
		data: categories,
		isError,
		isLoading,
	} = useQuery({
		queryKey: ['Categories'],
		queryFn: Category.getCategories,
	});

	const renderRatingStars = (count) => (
		<div className="flex items-center space-x-1">
			{Array.from({ length: 5 }, (_, index) => (
				<Star
					key={index}
					className={`w-4 h-4 ${
						index < count ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
					}`}
				/>
			))}
		</div>
	);

	const handleRangeChange = (e) => {
		updateFilter({ key: 'cost', value: Number(e.target.value) });
	};

	const handleCategoryChange = (e) => {
		console.log(e.target.value);
		updateFilter({ key: 'category', value: e.target.value });
	};

	const handleRatingChange = (e) => {
		updateFilter({ key: 'rating', value: e.target.value });
	};

	const handleLectureRangesChange = (e) => {
		// console.log(e.target.value);
		const { value } = e.target;
		if (value === 'More than 45') {
			updateFilter({ key: 'minLecturesCount', value: 45 });
			updateFilter({ key: 'maxLecturesCount', value: '' });
			return;
		}
		console.log(e.target.value);
		const [minLecturesCount, maxLecturesCount] = value.split('-');
		updateFilter({ key: 'minLecturesCount', value: minLecturesCount });
		updateFilter({ key: 'maxLecturesCount', value: maxLecturesCount });
	};

	if (isLoading) {
		return <div className="text-lg">Loading...</div>;
	}

	if (isError) {
		return (
			<div className="text-lg bg-red-100 text-red-300">
				An error occurred while fetching data.
			</div>
		);
	}

	return (
		<div className="w-full lg:w-64 p-4 bg-white rounded-xl shadow-md">
			{/* Filter Header */}
			<div className="flex items-center space-x-2 mb-6 text-gray-900">
				<button className="cursor-pointer" onClick={() => setOpen(!open)}>
					<SlidersHorizontal className="w-5 h-5" />
				</button>
				<h3 className="font-semibold text-lg">Filter</h3>
			</div>

			{/* Rating Filter */}
			<FilterSection title="Rating" open={open}>
				<div className="space-y-3">
					{[5, 4, 3, 2, 1].map((r) => (
						<label
							key={r}
							className="flex items-center space-x-3 cursor-pointer">
							<input
								type="radio"
								name="rating"
								value={r}
								checked={Number(filters.rating) === r}
								onChange={handleRatingChange}
								className="form-radio text-yellow-500 border-gray-300 focus:ring-yellow-500"
							/>
							{renderRatingStars(r)}
						</label>
					))}
				</div>
			</FilterSection>

			{/* Number of Lectures Filter */}
			<FilterSection title="Number of Lectures" open={open}>
				<div className="space-y-3">
					{lectureRanges.map((range) => (
						<label
							key={range}
							className="flex items-center space-x-3 cursor-pointer">
							<input
								type="radio"
								name="lectures"
								value={range}
								checked={
									`${
										filters.maxLecturesCount
											? `${filters.minLecturesCount}-${filters.maxLecturesCount}`
											: 'More than 45'
									}` === range
								}
								onChange={handleLectureRangesChange}
								className="text-blue-600 border-gray-300 focus:ring-blue-600"
							/>
							<span className="text-gray-700">{range}</span>
						</label>
					))}
				</div>
			</FilterSection>

			{/* Price Range Filter (Simplified) */}
			<FilterSection title="Price" open={open}>
				{/* Placeholder for a custom range slider */}
				<div className="text-center font-bold text-lg mb-3 text-blue-600">
					${sliderValue}
				</div>
				<div className="py-4">
					<input
						type="range"
						min={MIN_PRICE}
						max={MAX_PRICE}
						value={sliderValue}
						onChange={handleRangeChange}
						className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
					/>
					<div className="flex justify-between text-xs text-gray-500 mt-2">
						<span>{MIN_PRICE}</span>
						<span>{MAX_PRICE}</span>
					</div>
				</div>
			</FilterSection>

			{/* Category Filter */}
			<FilterSection title="Category" open={open}>
				<div className="space-y-3">
					{categories.map((category) => (
						<label
							key={category.id}
							className="flex items-center space-x-3 cursor-pointer">
							<input
								type="radio"
								name="category"
								value={category.name}
								checked={filters.category === category.name}
								onChange={handleCategoryChange}
								className="text-blue-600 rounded border-gray-300 focus:ring-blue-600"
							/>
							<span className="text-gray-700">{category.name}</span>
						</label>
					))}
				</div>
			</FilterSection>
		</div>
	);
};

export default FilterSidebar;
