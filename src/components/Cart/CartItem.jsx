import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cart from '../../api/Cart';

const CartItem = ({ item }) => {
	const queryClient = useQueryClient();

	const removeMutation = useMutation({
		mutationFn: Cart.removeCartItem,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cartItems'] });
			queryClient.invalidateQueries({ queryKey: ['cartCount'] });
		},
		onError: (error) => {
			console.error('Failed to remove item:', error);
		},
	});

	const handleRemove = () => {
		if (window.confirm('Are you sure you want to remove this course?')) {
			removeMutation.mutate(item.courseId);
		}
	};

	return (
		<div className="flex p-4 border border-blue-500 rounded-lg shadow-sm mb-4 bg-white last:mb-0">
			<div className="w-24 h-24 flex-shrink-0 mr-4 rounded-md overflow-hidden">
				<img
					src={item.imagePath}
					alt={item.name}
					className="w-full h-full object-cover"
				/>
			</div>

			{/* Course Details */}
			<div className="flex-grow flex justify-between">
				<div>
					<h3 className="text-lg font-semibold text-gray-900 mb-1">
						{item.name}
					</h3>

					<p className="text-sm text-gray-600 mb-2">By {item.instructorName}</p>

					<p className="text-gray-500 mb-2">
						{item.totalHours} Total Hours. {item.lecturesCount} Lectures.
						{item.level} level
					</p>

					<div className="flex items-center text-sm mb-2">
						<span className="font-bold text-yellow-600 mr-1">{item.rate}</span>
						<span
							className="average-rating"
							style={{ '--star-fill': `${(item.rate / 5) * 100}%` }}
							aria-label={`Rating: ${item.rate} out of 5`}></span>
					</div>

					<button
						onClick={handleRemove}
						disabled={removeMutation.isPending}
						className="text-sm text-red-600 hover:text-red-700 font-medium transition duration-150">
						{removeMutation.isPending ? 'Removing...' : 'Remove'}
					</button>
				</div>

				{/* Price */}
				<div className="flex-shrink-0 text-right">
					<p className="text-lg font-bold text-gray-900">
						${item.cost.toFixed(2)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
