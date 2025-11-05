import React from 'react';
import { BellDot } from 'lucide-react';
import { useAtom, useAtomValue } from 'jotai';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	currentStepAtom,
	formDataAtom,
	initialFormData,
	selectedCourseIdAtom,
} from '../../../Atoms/courseAtoms';
import Breadcrumbs from '../../Breadcrumbs';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import Course from '../../../api/Course';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Spinner from '../../Common/Spinner';

const MultistepCourseForm = ({ isViewMode, isEditMode }) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useAtom(formDataAtom);
	const [currentStep, setCurrentStep] = useAtom(currentStepAtom);
	const selectedCourseId = useAtomValue(selectedCourseIdAtom);
	const formTitle = isViewMode
		? 'View Course'
		: isEditMode
		? 'Update Course'
		: 'Add Course';

	const isAddOrEditMode = !isViewMode;

	const queryClient = useQueryClient();

	const reset = () => {
		setFormData(initialFormData);
		setCurrentStep(1);
	};

	const courseMutation = useMutation({
		mutationKey: ['saveCourse'],
		mutationFn: (course) => Course.saveCourse(course),
		onSuccess: async () => {
			if (!isEditMode) reset();
			await queryClient.invalidateQueries(['Courses']);
			if (isEditMode) toast.success('Course updated successfully!');
			else toast.success('Course added successfully!');
		},
		onError: () => {
			toast.error(
				<p className="text-sm font-medium">
					Failed to save course data. Try again later
				</p>
			);
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		if (currentStep === 2) {
			if (isAddOrEditMode) {
				if (
					formData.contents.length === 0 ||
					!formData.contents.every(
						(c) => c.name && c.lecturesCount > 0 && c.durationInHours > 0
					)
				) {
					alert('Please ensure all course content fields are valid.');
					return;
				}
			}

			const form = new FormData();

			if (isEditMode && selectedCourseId) form.append('id', selectedCourseId);
			for (const key in formData) {
				const value = formData[key];
				if (key === 'contents') {
					value.forEach((content, index) => {
						if (isEditMode && selectedCourseId && content.id) {
							form.append(`contents[${index}].id`, content.id);
						}
						form.append(`contents[${index}].name`, content.name);
						form.append(
							`contents[${index}].lecturesCount`,
							content.lecturesCount
						);
						form.append(
							`contents[${index}].durationInHours`,
							content.durationInHours
						);
					});
					continue;
				} else if (key === 'image' && value instanceof File) {
					form.append(key, value, value.name);
				} else if (value) {
					form.append(key, value);
				}
			}

			if (isEditMode || (!isEditMode && !isViewMode)) {
				courseMutation.mutate(form);
			}
		}
	};

	const handleNext = (e) => {
		e.preventDefault();
		if (currentStep === 1) {
			if (isAddOrEditMode) {
				if (
					!formData.name ||
					!formData.image ||
					!formData.cost ||
					!formData.categoryId ||
					!formData.description ||
					!formData.instructorId ||
					!formData.level ||
					!formData.totalHours ||
					!formData.rate
				) {
					alert('Please fill out all required fields in Step 1.');
					return;
				}
			}
			setCurrentStep(2);
		}
	};

	return (
		<div className="container mb-4">
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
					{formTitle}
					<span className="text-gray-500 text-sm ml-1">
						Step {currentStep} of 2
					</span>
				</h1>

				<form onSubmit={handleSubmit}>
					{currentStep === 1 ? (
						<StepOne isViewMode={isViewMode} isEditMode={isEditMode} />
					) : (
						<StepTwo isViewMode={isViewMode} isEditMode={isEditMode} />
					)}

					<div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
						<button
							type="button"
							className="px-6 py-2 rounded-lg text-red-500 bg-red-100 border border-red-200 transition duration-150 hover:bg-red-200 cursor-pointer"
							onClick={() =>
								currentStep === 1 ? navigate(-1) : setCurrentStep(1)
							}
							disabled={courseMutation.isPending}>
							{currentStep === 1 ? 'Cancel' : 'Back'}
						</button>

						{currentStep === 1 ? (
							<button
								type="button"
								className="px-8 py-2 rounded-lg text-white bg-black hover:bg-gray-800 transition duration-150 cursor-pointer"
								onClick={handleNext}
								disabled={courseMutation.isPending}>
								Next
							</button>
						) : (
							<button
								type="submit"
								className="px-8 py-2 rounded-lg text-white bg-black hover:bg-gray-800 transition duration-150 cursor-pointer disabled:cursor-not-allowed"
								disabled={isViewMode || courseMutation.isPending}>
								{courseMutation.isPending ? (
									<p className="flex justify-center items-center">
										<Spinner width={24} height={24} />
										<span className="ml-2">
											{isEditMode ? 'Updating...' : 'Adding...'}
										</span>
									</p>
								) : isEditMode ? (
									'Update'
								) : (
									'Add'
								)}
							</button>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};

export default MultistepCourseForm;
