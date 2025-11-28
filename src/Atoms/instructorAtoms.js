import { atom } from 'jotai';
import { atomWithQuery } from 'jotai-tanstack-query';
import Instructor from '../api/Instructor';

export const instructorJobTitlesAtom = atomWithQuery(() => ({
	queryKey: ['instructorJobTitles'],
	queryFn: () => Instructor.getInstructorJobTitles(),
	staleTime: 1000 * 60 * 5,
	gcTime: 1000 * 60 * 10,
}));

export const instructorCountAtom = atomWithQuery(() => ({
	queryKey: ['instructorsCount'],
	queryFn: async () => {
		const data = await Instructor.getInstructorsCount();
		return typeof data === 'number' ? data : data?.count || 0;
	},
	staleTime: 1000 * 60 * 5,
	gcTime: 1000 * 60 * 10,
}));

export const pageIndexAtom = atom(1);
export const pageSizeAtom = atom(5);

export const nameSearchAtom = atom('');
export const jobTitleFilterAtom = atom('');

export const selectedInstructorIdAtom = atom(null);
export const selectedInstructorNameAtom = atom(null);

export const showAddPopupAtom = atom(false);
export const showViewPopupAtom = atom(false);
export const showUpdatePopupAtom = atom(false);
export const showDeletePopupAtom = atom(false);

export const closeAllPopupsAtom = atom(null, (get, set) => {
	set(showAddPopupAtom, false);
	set(showViewPopupAtom, false);
	set(showUpdatePopupAtom, false);
	set(showDeletePopupAtom, false);
	set(selectedInstructorIdAtom, null);
});
