import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import Course from '../../../api/Course';
import MultistepCourseForm from './MultistepCourseForm';
import {
	selectedCourseIdAtom,
	initialFormData,
	currentStepAtom,
	formDataAtom,
} from '../../../Atoms/courseAtoms';

const CourseFormContainer = () => {
	const { courseId } = useParams();
	const location = useLocation();
	const setCourseId = useSetAtom(selectedCourseIdAtom);
	const setFormData = useSetAtom(formDataAtom);
	const setCurrentStep = useSetAtom(currentStepAtom);

	const { data: courseData, isLoading } = useQuery({
		queryKey: ['Course', courseId],
		queryFn: () => Course.getCourseById(courseId),
		enabled: !!courseId,
	});

	const isViewMode = location.pathname.includes('/view/');

	useEffect(() => {
		if (courseData && courseId) {
			setFormData({
				name: courseData.name,
				description: courseData.description,
				certification: courseData.certification,
				cost: courseData.cost,
				level: courseData.level,
				rate: courseData.rate,
				totalHours: courseData.totalHours,
				instructorId: courseData.instructorId,
				categoryId: courseData.categoryId,
				contents: courseData.contents,
				image: courseData.imagePath,
			});
			setCourseId(courseId);
			setCurrentStep(1);
		}

		return () => {
			setFormData(initialFormData);
			setCourseId(null);
			setCurrentStep(1);
		};
	}, [courseData, courseId, setFormData, setCourseId, setCurrentStep]);

	if (isLoading) return <div>Loading...</div>;

	return (
		<MultistepCourseForm
			isViewMode={isViewMode}
			isEditMode={!!courseId && !isViewMode}
		/>
	);
};

export default CourseFormContainer;
