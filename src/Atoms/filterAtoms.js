import { atom } from 'jotai';

export const initialFilterState = {
	pageIndex: 1,
	pageSize: 6,
	sortBy: 'dateDesc',
	category: '',
	cost: 0,
	rating: '',
	minLecturesCount: '',
	maxLecturesCount: '',
};


export const courseFilterAtom = atom(initialFilterState);

export const updateCourseFilterAtom = atom(null, (get, set, { key, value }) => {
	const isPagingKey = key === 'pageIndex';
	set(courseFilterAtom, (prevFilters) => ({
		...prevFilters,
		[key]: value,
		pageIndex: isPagingKey ? value : 1,
	}));
});
