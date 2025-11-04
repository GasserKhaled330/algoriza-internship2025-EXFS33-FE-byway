import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Loader } from 'lucide-react';
import CartItem from '../components/Cart/CartItem';
import { useQuery } from '@tanstack/react-query';
import Cart from '../api/Cart';
import toast from 'react-hot-toast';

const ShoppingCartPage = () => {
	const {
		data: cartItems,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['cartItems'],
		queryFn: () => Cart.getCartItems(),
		staleTime: 5 * 60 * 1000,
	});

	if (isLoading) {
		return <Loader />;
	}
	if (isError) {
		toast.error(
			<p className="text-sm font-medium">Failed to load cart items.</p>
		);
	}

	const cartCount = cartItems?.length || 0;

	const subtotal = cartItems?.reduce((sum, item) => sum + item.cost, 0) || 0;
	const discount = 0.0; // For simplicity
	const taxRate = 0.15; // 15% tax rate
	const tax = subtotal * taxRate;
	const total = subtotal - discount + tax;

	const DetailRow = ({ label, value, isTotal = false }) => (
		<div
			className={`flex justify-between items-center py-2 ${
				isTotal
					? 'border-t border-gray-300 mt-2 pt-3 font-bold text-lg'
					: 'text-gray-700'
			}`}>
			<span className={isTotal ? 'text-gray-900' : ''}>{label}</span>
			<span className={isTotal ? 'text-gray-900' : ''}>
				${value.toFixed(2)}
			</span>
		</div>
	);

	return (
		<div className="bg-gray-50 min-h-screen pt-8 pb-20">
			<div className="container mx-auto px-4">
				{/* Header and Breadcrumbs */}
				<h1 className="text-3xl font-extrabold text-gray-900 mb-2">
					Shopping Cart
				</h1>
				<p className="text-sm text-gray-500 mb-6 flex items-center space-x-1">
					<span>Courses</span> <ChevronRight className="w-3 h-3" />
					<span>Details</span> <ChevronRight className="w-3 h-3" />
					<span className="text-blue-600 font-medium">Shopping Cart</span>
				</p>

				{/* --- Main Content Grid --- */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* LEFT COLUMN: Cart Items */}
					<div
						className={`lg:col-span-2 ${cartCount === 0 && 'lg:col-span-3'}`}>
						{cartCount === 0 ? (
							<div className="p-10 text-center text-gray-500 border border-dashed rounded-lg bg-white">
								Your cart is empty.{' '}
								<Link
									to="/courses"
									className="text-sm text-blue-600 hover:underline">
									Go Shopping!
								</Link>
							</div>
						) : (
							<>
								<h2 className="text-xl font-semibold text-gray-700 mb-4">
									{cartCount} Courses in cart
								</h2>
								<div className="space-y-4">
									{cartItems.map((item) => (
										<CartItem key={item.courseId} item={item} />
									))}
								</div>
							</>
						)}
					</div>
					{/* RIGHT COLUMN: Order Details */}
					{cartCount > 0 && (
						<>
							<div className="lg:col-span-1">
								<div className="sticky top-8 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
									<h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-3">
										Order Details
									</h3>

									{/* Detail Rows */}
									<DetailRow label="Price" value={subtotal} />
									<DetailRow label="Discount" value={discount} />
									<DetailRow label="Tax" value={tax} />
									<DetailRow label="Total" value={total} isTotal={true} />

									{/* Checkout Button */}
									<Link to="/checkout">
										<button
											className="w-full py-3 mt-6 bg-gray-900 text-white font-bold rounded-lg shadow-md transition duration-150 hover:bg-gray-700 cursor-pointer"
											disabled={cartCount === 0}>
											Proceed to Checkout
										</button>
									</Link>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default ShoppingCartPage;
