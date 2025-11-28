import React from 'react';
import { ArrowRight } from 'lucide-react';
import BecomeInstructorImage from '/become-instructor.png';

const BecomeInstructor = () => {
	return (
		<section className="container mx-auto py-20 px-4">
			<div className="flex items-center justify-center bg-white">
				<div className="w-1/2 flex justify-center">
					<img
						src={BecomeInstructorImage}
						alt="Instructor smiling"
						className="w-[400px] h-auto max-w-full"
					/>
				</div>

				<div className="w-1/2 pl-16 max-w-lg">
					<h2 className="text-4xl font-bold text-gray-900 mb-4">
						Become an Instructor
					</h2>

					<p className="text-lg text-gray-600 mb-8">
						Instructors from around the world teach millions of students on
						Byway. We provide the tools and skills to teach what you love.
					</p>

					<button
						className="inline-flex items-center justify-center px-6 py-3
                           bg-gray-900 text-white font-medium text-base
                           rounded-lg shadow-lg transition duration-300
                           hover:bg-gray-700 cursor-pointer">
						Start Your Instructor Journey
						<ArrowRight className="ml-3 w-5 h-5" />
					</button>
				</div>
			</div>
		</section>
	);
};

export default BecomeInstructor;
