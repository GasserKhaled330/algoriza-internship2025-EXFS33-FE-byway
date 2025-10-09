import React from 'react';
import Hero from '../components/Home/Hero';
import Stats from '../components/Home/Stats';
import Categories from '../components/Home/Categories';
import TopCourses from '../components/Home/Courses/TopCourses';
import TopInstructors from '../components/Home/Instructors/TopInstructors';
import TestimonialsSlider from '../components/Home/Testimonials/TestimonialsSlider';
import BecomeInstructor from '../components/Home/BecomeInstructor';
import TransformYourLife from '../components/Home/TransformYourLife';

const LandingPage = () => {
	return (
		<>
			<Hero />
			<Stats />
			<Categories />
			<TopCourses />
			<TopInstructors />
			<TestimonialsSlider />
			<BecomeInstructor />
			<TransformYourLife />
		</>
	);
};

export default LandingPage;
