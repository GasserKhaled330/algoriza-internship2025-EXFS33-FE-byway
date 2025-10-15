import { atom } from 'jotai';

export const initialCoursesFilterState = {
	pageIndex: 1,
	pageSize: 6,
	name: '',
	category: '',
	cost: '',
	rating: '',
};

export const courseFilterAtom = atom(initialCoursesFilterState);

export const updateCourseFilterAtom = atom(null, (get, set, { key, value }) => {
	const isPagingKey = key === 'pageIndex';
	set(courseFilterAtom, (prevFilters) => ({
		...prevFilters,
		[key]: value,
		pageIndex: isPagingKey ? value : 1,
	}));
});

export const selectedCourseIdAtom = atom(null);
export const showDeleteCoursePopupAtom = atom(false);
export const closeDeletePopupAtom = atom(null, (get, set) => {
	set(showDeleteCoursePopupAtom, false);
});

// Two step form

export const initialFormData = {
	name: '',
	categoryId: '',
	level: '',
	instructorId: '',
	cost: '',
	totalHours: '',
	rate: 0,
	description: '',
	certification: '',
	image: null,

	contents: [{ id: '', name: '', lecturesCount: '', durationInHours: '' }],
};

export const formDataAtom = atom(initialFormData);

export const currentStepAtom = atom(1);
