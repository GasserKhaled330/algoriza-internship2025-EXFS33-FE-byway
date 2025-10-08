import React from 'react';
import CourseCard from './CourseCard';
import { useQuery } from '@tanstack/react-query';
import Course from '../../../api/Course';
import { Link } from 'react-router-dom';

const TopCourses = () => {
	const topCoursesCount = 4;
	const { isLoading, isError, data: courses } = useQuery({
		queryKey: ['TopCourses', topCoursesCount],
		queryFn: () => Course.getTopCourses(topCoursesCount),
	});

	if (isLoading) {
		return <div>Loading courses...</div>;
	}

	if (isError) {
		return <div>An error occurred while fetching data.</div>;
	}

	return (
		<section className="mx-auto py-12 px-4 bg-gray-50">
			<div className="flex justify-between items-center mb-8">
				<h2 className="text-3xl font-bold text-gray-900">Top Courses</h2>
				<Link
					to="/courses"
					className="text-blue-600 hover:text-blue-700 font-semibold transition duration-150">
					See All
				</Link>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{courses?.map((course) => (
					<CourseCard key={course.id} course={course} />
				))}
			</div>
		</section>
	);
};

export default TopCourses;
