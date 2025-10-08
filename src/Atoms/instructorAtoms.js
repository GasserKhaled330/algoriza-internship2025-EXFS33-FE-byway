import { atom } from 'jotai';

export const pageIndexAtom = atom(1);
export const pageSizeAtom = atom(5);

export const nameSearchAtom = atom('');
export const jobTitleFilterAtom = atom('');

export const selectedInstructorIdAtom = atom(null);

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
