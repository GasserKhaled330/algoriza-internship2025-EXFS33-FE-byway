import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../../Breadcrumbs.jsx';
import { BellDot, ListFilter } from 'lucide-react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useSetAtom, useAtomValue } from 'jotai';
import { useDebounce } from '../../../hooks/useDebounce.js';
import {
	courseFilterAtom,
	updateCourseFilterAtom,
} from '../../../Atoms/courseAtoms.js';

import SearchBar from '../../SearchBar';
import CourseCard from './CourseCard.jsx';

import Category from '../../../api/Category.js';
import Course from '../../../api/Course.js';
import { Link } from 'react-router-dom';

const generateSearchBarPlaceholder = (searchField, searchOptions) => {
	const baseHolder = 'Search by';
	return baseHolder.concat(
		' ',
		searchOptions.find((opt) => opt.value === searchField)?.label
	);
};

const Courses = () => {
	const DEBOUNCE_DELAY = 500;
	const btnBaseClasses =
		'min-w-[100px] h-10 px-3 flex items-center justify-center font-medium rounded-lg transition-colors duration-200 border border-gray-300 shadow-sm whitespace-nowrap cursor-pointer disabled:cursor-not-allowed';
	const searchOptions = [
		{ value: 'name', label: 'Course Name' },
		{ value: 'rating', label: 'Rate (e.g., 4.5)' },
		{ value: 'cost', label: 'Cost (e.g., 50)' },
	];

	const filters = useAtomValue(courseFilterAtom);
	const updateFilter = useSetAtom(updateCourseFilterAtom);
	const [searchField, setSearchField] = useState('name');
	const [searchPlaceHolder, setSearchPlaceHolder] = useState(
		'Search by course name'
	);
	const [localSearchValue, setLocalSearchValue] = useState(
		filters.name || filters.rating || filters.cost || ''
	);
	const debouncedSearchValue = useDebounce(localSearchValue, DEBOUNCE_DELAY);

	useEffect(() => {
		let updateKey = searchField;
		let clearKeys = ['name', 'rating', 'cost'];

		clearKeys.forEach((key) => {
			if (key !== updateKey) {
				updateFilter({ key: key, value: '' });
			}
		});

		updateFilter({ key: updateKey, value: debouncedSearchValue });
	}, [debouncedSearchValue, searchField, updateFilter]);

	const { data: categories } = useQuery({
		queryKey: ['Categories'],
		queryFn: Category.getCategories,
	});

	const {
		isLoading: coursesLoading,
		isError: coursesError,
		data: courses,
		isPlaceholderData,
	} = useQuery({
		queryKey: ['Courses', filters],
		queryFn: (context) => Course.getCourses(context),
		placeholderData: keepPreviousData,
		staleTime: 5 * 1000,
	});

	if (coursesLoading) {
		return <div>Loading courses...</div>;
	}

	if (coursesError) {
		return <div>An error occurred while fetching courses data.</div>;
	}

	const totalPages = Math.ceil((courses?.totalCount || 0) / filters.pageSize);

	const handleFieldChange = (e) => {
		const field = e.target.value;
		setSearchField(field);
		setLocalSearchValue('');
		setSearchPlaceHolder(generateSearchBarPlaceholder(field, searchOptions));
	};

	return (
		<div className="px-4">
			<header className="flex justify-between items-center border-b-1 border-[#E2E6EE] h-24">
				<div className="flex items-end">
					<h1 className="text-3xl font-medium">Courses</h1>
					<Breadcrumbs />
				</div>
				<span className="cursor-pointer">
					<BellDot size={24} />
				</span>
			</header>
			<section className="grid grid-cols[_1fr_2fr_1fr] gap-5 border border-[#F1F3F9] my-8 p-5 shadow-lg rounded">
				{/* header */}
				<div className="flex justify-between items-center">
					<p className="text-2xl font-medium">Courses</p>
					<div className="flex items-center gap-1">
						<Link to="/dashboard/courses/add-course">
							<button className="bg-[#020617] text-white p-2 rounded-xl cursor-pointer text-nowrap">
								Add Course
							</button>
						</Link>
						<select
							name="category"
							id="category"
							value={filters.category}
							onChange={(e) =>
								updateFilter({ key: 'category', value: e.target.value })
							}
							className="flex-shrink-0 bg-gray-100 text-sm rounded-lg p-2">
							<option
								value=""
								className="bg-white text-[#333]  text-sm font-medium cursor-pointer hover:bg-[#eee]">
								All Categories
							</option>
							{categories?.map((category) => (
								<option
									key={category.id}
									value={category.name}
									className="bg-white text-[#333] text-sm font-medium  cursor-pointer hover:bg-[#eee]">
									{category.name}
								</option>
							))}
						</select>

						<SearchBar
							value={localSearchValue}
							onSearch={(e) => setLocalSearchValue(e.target.value)}
							placeHolder={searchPlaceHolder}
						/>

						<select
							value={searchField}
							onChange={handleFieldChange}
							className="flex-shrink-0 bg-gray-100 text-sm rounded-lg p-2">
							{searchOptions.map((option) => (
								<option key={option.value} value={option.value}>
									Search by: {option.label}
								</option>
							))}
						</select>
					</div>
				</div>
				{/* course list */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					{!coursesLoading &&
						courses.data?.map((course) => (
							<CourseCard key={course?.id} course={course} />
						))}
				</div>

				{/* Pagination */}
				<div className="flex justify-between items-center mt-10">
					<div>
						<span className="m-2">
							Current Page: {filters.pageIndex} of {totalPages}
						</span>
					</div>
					<div className="flex items-center space-x-2">
						<button
							onClick={() => {
								updateFilter({
									key: 'pageIndex',
									value: filters.pageIndex - 1,
								});
							}}
							disabled={filters.pageIndex === 1}
							className={btnBaseClasses}>
							Previous Page
						</button>
						<button
							onClick={() => {
								if (!isPlaceholderData) {
									updateFilter({
										key: 'pageIndex',
										value: filters.pageIndex + 1,
									});
								}
							}}
							disabled={isPlaceholderData || filters.pageIndex === totalPages}
							className={btnBaseClasses}>
							Next Page
						</button>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Courses;
