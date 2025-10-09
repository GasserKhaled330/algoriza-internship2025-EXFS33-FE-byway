import React from 'react';
import FilterSidebar from '../components/Home/Courses/FilterSidebar';
import CourseCard from '../components/Home/Courses/CourseCard';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { courseFilterAtom, updateCourseFilterAtom } from '../Atoms/filterAtoms';
import { useAtomValue, useSetAtom } from 'jotai';
import Course from '../api/Course';

const CoursesListingPage = () => {
	const filters = useAtomValue(courseFilterAtom);
	const updateFilter = useSetAtom(updateCourseFilterAtom);

	const btnBaseClasses =
		'min-w-[100px] h-10 px-3 flex items-center justify-center font-medium rounded-lg transition-colors duration-200 border border-gray-300 shadow-sm whitespace-nowrap cursor-pointer disabled:cursor-not-allowed';

	const { isLoading, isError, data } = useQuery({
		queryKey: ['Courses', filters],
		queryFn: Course.getCourses,
		placeholderData: keepPreviousData,
	});

	if (isLoading) {
		return <div>Loading courses...</div>;
	}

	if (isError) {
		return <div>An error occurred while fetching data.</div>;
	}

	const courses = data?.data || [];

	return (
		<div className="bg-gray-50 min-h-screen pt-12 pb-20">
			<div className="mx-auto px-6">
				{/* Main Header */}
				<h1 className="text-4xl font-extrabold text-gray-900 mb-2">
					Design Courses
				</h1>
				<p className="text-xl text-gray-600 font-medium mb-8">
					All Development Courses
				</p>

				<div className="flex flex-col lg:flex-row gap-8">
					<div className="lg:w-1/4">
						<FilterSidebar />
					</div>

					<div className="lg:w-3/4">
						{/* Sort & Pagination Controls */}
						<div className="flex justify-end items-center mb-6">
							<span className="text-gray-700 mr-2">Sort By</span>
							<select
								value={filters.sortBy}
								onChange={(e) =>
									updateFilter({ key: 'sortBy', value: e.target.value })
								}
								className="p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500">
								<option value={'costDesc'}>Price (High to Low)</option>
								<option value={'costAsc'}>Price (Low to High)</option>
								<option value={'dateDesc'}>The latest</option>
								<option value={'dateAsc'}>The oldest</option>
							</select>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{courses.map((course) => (
								<CourseCard key={course.id} course={course} />
							))}
						</div>

						{/* Pagination */}
						<div className="flex justify-center mt-10">
							<div className="flex items-center space-x-2">
								<button
									onClick={() =>
										updateFilter({
											key: 'pageIndex',
											value: filters.pageIndex - 1,
										})
									}
									disabled={filters.pageIndex === 1}
									className={btnBaseClasses}>
									Previous Page
								</button>
								<button
									onClick={() =>
										updateFilter({
											key: 'pageIndex',
											value: filters.pageIndex + 1,
										})
									}
									disabled={
										filters.pageIndex ===
										Math.ceil((data?.totalCount || 0) / filters.pageSize)
									}
									className={btnBaseClasses}>
									Next Page
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CoursesListingPage;
