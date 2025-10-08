import { atom } from 'jotai';

// Mock data structure for cart items
const mockCartItems = [
	{
		id: 1,
		title: 'Introduction to User Experience Design',
		price: 45.0,
		instructor: 'John Doe',
		rating: 4.6,
		hours: 22,
		lectures: 155,
		imageUrl: 'course-thumb-1.jpg',
	},
	{
		id: 2,
		title: 'Advanced Frontend Development',
		price: 45.0,
		instructor: 'Jane Smith',
		rating: 4.8,
		hours: 30,
		lectures: 200,
		imageUrl: 'course-thumb-2.jpg',
	},
	{
		id: 3,
		title: 'Backend with Node.js & Express',
		price: 45.0,
		instructor: 'John Doe',
		rating: 4.5,
		hours: 18,
		lectures: 120,
		imageUrl: 'course-thumb-3.jpg',
	},
];

export const cartItemsAtom = atom(mockCartItems);

// Derived atom to remove an item from the cart
export const removeCartItemAtom = atom(null, (get, set, itemId) => {
	set(cartItemsAtom, (prevItems) =>
		prevItems.filter((item) => item.id !== itemId)
	);
});
