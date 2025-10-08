import React from 'react';
import Hero from './Hero';
import Stats from './Stats';
import Categories from './Categories';
import TopCourses from './Courses/TopCourses';
import TopInstructors from './Instructors/TopInstructors';
import TestimonialsSlider from './Testimonials/TestimonialsSlider';
import BecomeInstructor from './BecomeInstructor';
import TransformYourLife from './TransformYourLife';
import Footer from './Footer';

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
