import { atom } from 'jotai';
import Category from '../api/Category';

export const categoriesAtom = atom(async () => await Category.getCategories());

export const categoriesCountAtom = atom(async (get) => {
	const result = await get(categoriesAtom);
	return result.length;
});
