import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import FilterSidebar from '../components/Home/Courses/FilterSidebar';
import CourseCard from '../components/Home/Courses/CourseCard';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { courseFilterAtom, updateCourseFilterAtom } from '../Atoms/filterAtoms';
import { useAtomValue, useSetAtom } from 'jotai';
import Course from '../api/Course';
import Loader from '../components/Common/Loader';
import CoursesNotMatch from '../assets/courses-not-match.svg';

const CoursesListingPage = () => {
	const filters = useAtomValue(courseFilterAtom);
	const updateFilter = useSetAtom(updateCourseFilterAtom);

	const btnBaseClasses =
		'min-w-[100px] h-10 px-3 flex items-center justify-center font-medium rounded-lg transition-colors duration-200 border border-gray-300 shadow-sm whitespace-nowrap cursor-pointer disabled:cursor-not-allowed';

	const { isLoading, isFetching, isError, data } = useQuery({
		queryKey: ['Courses', filters],
		queryFn: () => Course.getCourses(filters),
		placeholderData: keepPreviousData,
		staleTime: 1000 * 60 * 5,
	});

	if (isLoading || isFetching) {
		return <Loader />;
	}

	if (isError) {
		return <div>An error occurred while fetching data.</div>;
	}

	const courses = data?.data || [];
	const coursesTotalCount = data?.totalCount;
	const totalPages = Math.ceil((coursesTotalCount || 0) / filters.pageSize);

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
								name="sort"
								id="sort"
								value={filters.sortBy}
								onChange={(e) =>
									updateFilter({ key: 'sortBy', value: e.target.value })
								}
								className="w-[200px] p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500">
								<option value={'costDesc'}>Price (High to Low)</option>
								<option value={'costAsc'}>Price (Low to High)</option>
								<option value={'dateDesc'}>The latest</option>
								<option value={'dateAsc'}>The oldest</option>
							</select>
						</div>

						{coursesTotalCount ? (
							<>
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
									{courses.map((course) => (
										<CourseCard key={course.id} course={course} />
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
											onClick={() =>
												updateFilter({
													key: 'pageIndex',
													value: filters.pageIndex - 1,
												})
											}
											disabled={filters.pageIndex === 1}
											className={btnBaseClasses}>
											<ChevronLeft size={18} />
											<span className="ml-1 hidden sm:inline">Previous</span>
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
											<span className="mr-1 hidden sm:inline">Next</span>
											<ChevronRight size={18} />
										</button>
									</div>
								</div>
							</>
						) : (
							<div className="flex flex-col items-center">
								<img
									src={CoursesNotMatch}
									alt="Courses Not Match Selected Criteria"
									className="flex justify-center items-center w-[200px] h-[200px]"
									loading="lazy"
								/>
								<p className="text-lg font-medium mt-4">
									No matching courses found
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CoursesListingPage;
