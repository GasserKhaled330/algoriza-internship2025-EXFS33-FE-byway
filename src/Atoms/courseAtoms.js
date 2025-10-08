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
