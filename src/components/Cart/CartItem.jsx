import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cart from '../../api/Cart';
import toast from 'react-hot-toast';

const CartItem = ({ item }) => {
	const queryClient = useQueryClient();

	const removeMutation = useMutation({
		mutationFn: Cart.removeCartItem,
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({ queryKey: ['cartItems'] }),
				queryClient.invalidateQueries({ queryKey: ['cartCount'] }),
				queryClient.invalidateQueries({
					queryKey: ['Cart', 'itemStatus', item.courseId],
				}),
			]);
		},
		onError: () => {
			toast.error(
				<p className="text-sm text-gray-900">
					Failed to remove course
					<span className="font-medium mx-1">{item.name}</span> from cart.
				</p>
			);
		},
	});

	const handleRemove = () => {
		if (window.confirm('Are you sure you want to remove this course?')) {
			removeMutation.mutate(item.courseId);
		}
	};

	return (
		<div className="flex p-4 border border-gray-400 rounded-lg shadow-sm mb-4 bg-white last:mb-0">
			<div className="w-50 h-40 flex-shrink-0 mr-4 rounded-md overflow-hidden">
				<img
					src={item.imagePath}
					alt={item.name}
					className="w-full h-full object-fill rounded-lg"
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
						{item.totalHours} Total Hours. {item.lecturesCount} Lectures.{' '}
						<strong>{item.level}</strong>
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
