import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../../Breadcrumbs.jsx';
import { BellDot, ChevronRight, ChevronLeft, ListFilter } from 'lucide-react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useSetAtom, useAtomValue } from 'jotai';
import { useDebounce } from '../../../hooks/useDebounce.js';
import {
	courseFilterAtom,
	updateCourseFilterAtom,
	closeDeletePopupAtom,
} from '../../../Atoms/courseAtoms.js';
import SearchBar from '../../SearchBar';
import CourseCard from './CourseCard.jsx';
import Course from '../../../api/Course.js';
import { Link } from 'react-router-dom';
import { categoriesAtom } from '../../../Atoms/categoryAtoms.js';
import Loader from '../../Common/Loader.jsx';
import DeleteCoursePopup from './DeleteCoursePopup';
import Pagination from '../../Pagination';
import toast from 'react-hot-toast';

const generateSearchBarPlaceholder = (searchField, searchOptions) => {
	const baseHolder = 'Search by';
	return baseHolder.concat(
		' ',
		searchOptions.find((opt) => opt.value === searchField)?.label
	);
};

const Courses = () => {
	const DEBOUNCE_DELAY = 500;
	const btnClasses =
		'min-w-[100px] h-10 px-3 flex items-center justify-center font-medium rounded-lg transition-colors duration-200 border border-gray-300 shadow-sm whitespace-nowrap cursor-pointer disabled:cursor-not-allowed';
	const searchOptions = [
		{ value: 'name', label: 'Course Name' },
		{ value: 'rating', label: 'Rate (e.g., 4.5)' },
		{ value: 'cost', label: 'Cost (e.g., 50)' },
	];

	const closeDeleteCoursePopup = useSetAtom(closeDeletePopupAtom);
	const categories = useAtomValue(categoriesAtom);
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

	const {
		isLoading: coursesisLoading,
		isFetching: coursesisFetching,
		isError: coursesError,
		data: courses,
		isPlaceholderData,
	} = useQuery({
		queryKey: ['Courses', filters],
		queryFn: () => Course.getCourses(filters),
		placeholderData: keepPreviousData,
		staleTime: 1000 * 60 * 5,
	});

	if (coursesisLoading || coursesisFetching) {
		return <Loader />;
	}

	if (coursesError) {
		toast.error(<p>An error occurred while fetching courses data.</p>);
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
					<p className="grow-1 text-2xl font-medium">Courses</p>
					<div className="flex grow-2 items-center justify-end gap-1">
						<Link to="/dashboard/courses/add">
							<button className="min-w-[130px] bg-gray-800 text-white px-2 py-1 rounded cursor-pointer text-nowrap transition duration-300 hover:bg-gray-950">
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
							className="min-w-[175px] bg-gray-100 text-sm font-medium cursor-pointer p-2 bordder-[#ccc] rounded-md hover:border-[#999] focus:outline-none focus:border-[#007bff] focus:shadow-md">
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
							isNumber={searchField === 'rating'}
							value={localSearchValue}
							onSearch={(e) => setLocalSearchValue(e.target.value)}
							placeHolder={searchPlaceHolder}
						/>

						<select
							id="search-by"
							name="search-by"
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
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
					{courses.data?.map((course) => (
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
							className={btnClasses}>
							<ChevronLeft size={18} />
							<span className="ml-1 hidden sm:inline">Previous</span>
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
							className={btnClasses}>
							<span className="mr-1 hidden sm:inline">Next</span>
							<ChevronRight size={18} />
						</button>
					</div>
				</div>
			</section>
			<DeleteCoursePopup onClose={closeDeleteCoursePopup} />
		</div>
	);
};

export default Courses;
