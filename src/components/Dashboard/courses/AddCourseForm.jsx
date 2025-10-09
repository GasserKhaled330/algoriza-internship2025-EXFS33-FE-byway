import React from 'react';
import { BellDot } from 'lucide-react';
import { useAtom } from 'jotai';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { currentStepAtom, formDataAtom } from '../../../Atoms/courseAtoms';
import Breadcrumbs from '../../Breadcrumbs';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import Course from '../../../api/Course';
import { useNavigate } from 'react-router-dom';

const AddCourseForm = () => {
	const navigate = useNavigate();
	const [formData] = useAtom(formDataAtom);
	const [currentStep, setCurrentStep] = useAtom(currentStepAtom);
	const queryClient = useQueryClient();

	const addCourseMutation = useMutation({
		mutationKey: ['saveCourse'],
		mutationFn: (course) => Course.saveCourse(course),
		onSuccess: () => {
			queryClient.invalidateQueries(['Courses']);
			alert('Course added successfully!');
			// Reset form state and go back to step 1
			// Note: A full reset of formDataAtom would be needed here too.
			setCurrentStep(1);
		},
		onError: (error) => {
			console.error('Submission Error:', error);
			alert(`Error: ${error.message}`);
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		// Validate Step 2 data before submission
		if (currentStep === 2) {
			if (
				formData.contents.length === 0 ||
				!formData.contents.every(
					(c) => c.name && c.lecturesCount > 0 && c.time > 0
				)
			) {
				alert('Please ensure all content fields are valid.');
				return;
			}

			addCourseMutation.mutate(formData);
		}
	};

	const handleNext = () => {
		if (currentStep === 1) {
			if (!formData.courseName || !formData.image || !formData.cost) {
				alert('Please fill out all required fields in Step 1.');
				return;
			}
			setCurrentStep(2);
		}
	};

	const isSubmitting = addCourseMutation.isLoading;

	return (
		<div className="container">
			<header className="flex justify-between items-center border-b-1 border-[#E2E6EE] h-24">
				<div className="flex items-end">
					<h1 className="text-3xl font-medium">Courses</h1>
					<Breadcrumbs />
				</div>
				<span className="cursor-pointer">
					<BellDot size={24} />
				</span>
			</header>

			<div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-xl">
				<h1 className="text-2xl font-semibold mb-4">
					Add Course{' '}
					<span className="text-gray-500 text-sm">Step {currentStep} of 2</span>
				</h1>

				<form onSubmit={handleSubmit}>
					{currentStep === 1 ? <StepOne /> : <StepTwo />}

					<div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
						<button
							type="button"
							className="px-6 py-2 rounded-lg text-red-500 bg-red-100 border border-red-200 transition duration-150 hover:bg-red-200 cursor-pointer"
							onClick={() =>
								currentStep === 1 ? navigate(-1) : setCurrentStep(1)
							}
							disabled={isSubmitting}>
							{currentStep === 1 ? 'Cancel' : 'Back'}
						</button>

						{currentStep === 1 ? (
							<button
								type="button"
								className="px-8 py-2 rounded-lg text-white bg-black hover:bg-gray-800 transition duration-150 cursor-pointer"
								onClick={handleNext}
								disabled={isSubmitting}>
								Next
							</button>
						) : (
							<button
								type="submit"
								className="px-8 py-2 rounded-lg text-white bg-black hover:bg-gray-800 transition duration-150 cursor-pointer"
								disabled={isSubmitting}>
								{isSubmitting ? 'Adding...' : 'Add'}
							</button>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddCourseForm;
