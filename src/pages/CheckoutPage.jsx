import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Cart from '../api/Cart';
import { CreditCard, Loader, Zap } from 'lucide-react';
import Checkout from '../api/Checkout';
import toast from 'react-hot-toast';
import Spinner from '../components/Common/Spinner';

const validateForm = (formData) => {
	const errors = {};

	if (!formData.country) errors.country = 'Country is required.';
	if (!formData.state) errors.state = 'State is required.';

	if (!formData.paymentMethod) {
		errors.paymentMethod = 'Please select a payment method.';
	} else if (formData.paymentMethod === 'creditCard') {
		if (!formData.cardName) errors.cardName = 'Name on card is required.';
		if (!formData.cardNumber || !/^\d{16}$/.test(formData.cardNumber)) {
			errors.cardNumber = 'Card number must be 16 digits.';
		}
		if (!formData.expiryDate) errors.expiryDate = 'Expiry date is required.';
		if (!formData.cvv || !/^\d{3,4}$/.test(formData.cvv)) {
			errors.cvv = 'CVV must be 3 or 4 digits.';
		}
	}

	return errors;
};

const CheckoutPage = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		country: '',
		state: '',
		paymentMethod: 'creditCard',
		cardName: '',
		cardNumber: '',
		expiryDate: '',
		cvv: '',
	});

	const [errors, setErrors] = useState({});

	const {
		data: cartData,
		isLoading: isCartLoading,
		isError: isCartError,
	} = useQuery({
		queryKey: ['cartItems'],
		queryFn: () => Cart.getCartItems(),
	});

	const queryClient = useQueryClient();

	const checkoutMutation = useMutation({
		mutationKey: ['checkout', 'process'],
		mutationFn: () => Checkout.processCheckout(),
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({ queryKey: ['cartItems'] }),
				queryClient.invalidateQueries({ queryKey: ['cartCount'] }),
			]);
			toast.success('Checkout successful!!!');
			navigate('/order-confirmation');
		},
		onError: (error) => {
			toast.error(
				<p className="text-sm font-medium">
					{error.response?.data.detail ||
						'Checkout failed, Please check your details.'}
				</p>
			);
		},
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
	};

	const handleCheckoutSubmit = (e) => {
		e.preventDefault();

		const validationErrors = validateForm(formData);
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length > 0) {
			console.log('Validation failed:', validationErrors);
			return;
		}

		checkoutMutation.mutate();
	};

	if (isCartLoading) {
		return <Loader />;
	}
	if (isCartError) {
		toast.error(
			<p className="text-sm font-medium">Failed to load cart items.</p>
		);
	}
	if (!cartData || cartData.length === 0) {
		return (
			<div className="bg-gray-50 text-center py-20">
				<p className="text-4xl text-gray-800 font-bold mb-6">
					Your cart is empty
				</p>
				<Link to="/courses">
					<button className="text-blue-600 p-3 border border-blue-600 rounded-2xl transition duration-300 hover:text-white hover:bg-blue-600 cursor-pointer">
						Go shopping
					</button>
				</Link>
			</div>
		);
	}

	const subtotal = cartData.reduce((sum, item) => sum + item.cost, 0);
	const taxRate = 0.15;
	const tax = subtotal * taxRate;
	const total = subtotal + tax;
	return (
		<div className="bg-gray-50 min-h-screen">
			<div className="container mx-auto px-4 py-8">
				{/* Breadcrumbs */}
				<div className="text-sm text-gray-500 mb-8">
					<Link to="/courses" className="hover:text-blue-600 mr-1">
						Courses
					</Link>
					&gt;
					<Link to="/cart" className="hover:text-blue-600 mx-1">
						Shopping Cart
					</Link>
					&gt;
					<span className="text-gray-900 font-medium ml-1">Checkout</span>
				</div>

				<h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

				{/* --- Form Element --- */}
				<form
					id="checkout-form"
					onSubmit={handleCheckoutSubmit}
					className="grid lg:grid-cols-3 gap-10">
					{/* --- LEFT COLUMN: ADDRESS & PAYMENT FORM --- */}
					<div className="lg:col-span-2 space-y-8">
						{/* 1. SHIPPING INFORMATION */}
						<div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
							<h2 className="text-xl font-semibold mb-4 text-gray-800">
								1. Shipping Information
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormInput
									name="country"
									label="Country"
									placeholder="Enter Country"
									value={formData.country}
									onChange={handleChange}
									error={errors.country}
								/>
								<FormInput
									name="state"
									label="State/Union Territory"
									placeholder="Enter State"
									value={formData.state}
									onChange={handleChange}
									error={errors.state}
								/>
							</div>
						</div>

						{/* 2. PAYMENT METHOD SECTION */}
						<div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
							<h2 className="text-xl font-semibold mb-6 text-gray-800">
								2. Payment Method
							</h2>

							{/* Credit/Debit Card Option */}
							<div className="border border-gray-200 rounded-lg p-4 mb-4">
								<label className="flex items-center space-x-3 cursor-pointer">
									<input
										type="radio"
										name="paymentMethod"
										value="creditCard"
										checked={formData.paymentMethod === 'creditCard'}
										onChange={handleChange}
										className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
									/>
									<span className="font-medium text-gray-700 flex items-center">
										<CreditCard className="w-5 h-5 mr-2 text-blue-600" />{' '}
										Credit/Debit Card
									</span>
									<div className="ml-auto flex space-x-1">{/* Logos */}</div>
								</label>

								{/* Card Details Form (Conditional Rendering) */}
								{formData.paymentMethod === 'creditCard' && (
									<div className="pt-4 mt-4 border-t border-gray-100 space-y-4">
										<FormInput
											name="cardName"
											label="Name of Card"
											placeholder="Enter Name"
											value={formData.cardName}
											onChange={handleChange}
											error={errors.cardName}
										/>
										<FormInput
											name="cardNumber"
											label="Card Number"
											placeholder="Card Number (16 digits)"
											value={formData.cardNumber}
											onChange={handleChange}
											error={errors.cardNumber}
										/>
										<div className="grid grid-cols-2 gap-4">
											<FormInput
												name="expiryDate"
												label="Expiry Date"
												placeholder="MM/YY"
												value={formData.expiryDate}
												onChange={handleChange}
												error={errors.expiryDate}
											/>
											<FormInput
												name="cvv"
												label="CVC/CVV"
												placeholder="CVC/CVV (3 or 4 digits)"
												value={formData.cvv}
												onChange={handleChange}
												error={errors.cvv}
											/>
										</div>
									</div>
								)}
							</div>

							{/* PayPal Option */}
							<div className="border border-gray-200 rounded-lg p-4">
								<label className="flex items-center space-x-3 cursor-pointer">
									<input
										type="radio"
										name="paymentMethod"
										value="payPal"
										checked={formData.paymentMethod === 'payPal'}
										onChange={handleChange}
										className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
									/>
									<span className="font-medium text-gray-700 flex items-center">
										<Zap className="w-5 h-5 mr-2 text-indigo-600" /> PayPal
									</span>
									<div className="ml-auto">{/* PayPal Logo */}</div>
								</label>
							</div>
							{errors.paymentMethod && (
								<p className="text-red-500 text-sm mt-1">
									{errors.paymentMethod}
								</p>
							)}
						</div>
					</div>

					{/* --- RIGHT COLUMN: ORDER DETAILS --- */}
					<div className="lg:col-span-1">
						<OrderSummary
							cartItems={cartData}
							subtotal={subtotal}
							tax={tax}
							total={total}
							isProcessing={checkoutMutation.isPending}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

const FormInput = ({ name, label, placeholder, value, onChange, error }) => (
	<div className="mb-2">
		<label
			htmlFor={name}
			className="block text-sm font-medium text-gray-700 mb-1">
			{label}
		</label>
		<input
			id={name}
			name={name}
			type="text"
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			className={`w-full p-3 border ${
				error ? 'border-red-500' : 'border-gray-300'
			} rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150`}
		/>
		{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
	</div>
);

const OrderSummary = ({ cartItems, subtotal, tax, total, isProcessing }) => (
	<div className="sticky top-20 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
		<h2 className="text-xl font-bold text-gray-900 mb-4">
			Order Details ({cartItems.length})
		</h2>

		{/* Item List */}
		<div className="border-b border-gray-200 pb-4 mb-4 max-h-48 overflow-y-auto space-y-2">
			{cartItems.map((item, index) => (
				<div
					key={item.courseId || index}
					className="text-sm text-gray-700 truncate">
					{item.name || 'Introduction to User Experience and Cus...'}
				</div>
			))}
		</div>

		{/* Coupon Code Section */}
		<div className="flex items-center text-blue-600 mb-6 cursor-pointer hover:text-blue-800">
			<Zap className="w-4 h-4 mr-2" />
			<span className="text-sm font-medium">APPLY COUPON CODE</span>
		</div>

		{/* Price Breakdown */}
		<div className="space-y-3 border-b border-gray-200 pb-4 mb-4 text-gray-700">
			<PriceRow label="Price" value={subtotal} />
			<PriceRow label="Discount" value={0} isNegative={true} />
			<PriceRow label="Tax" value={tax} />
		</div>

		{/* Total */}
		<div className="flex justify-between items-center text-lg font-bold text-gray-900 mb-6">
			<span>Total</span>
			<span>${total.toFixed(2)}</span>
		</div>

		{/* Checkout Button */}

		<button
			type="submit"
			form="checkout-form"
			disabled={isProcessing}
			className="w-full py-3 bg-gray-900 text-white font-bold rounded-lg cursor-pointer hover:bg-gray-700 transition duration-150 disabled:bg-gray-700 disabled:cursor-not-allowed">
			{isProcessing ? (
				<p className="flex justify-center items-center">
					<Spinner width={24} height={24} />
					<span className="ml-2">Processing...</span>
				</p>
			) : (
				'Proceed to Checkout'
			)}
		</button>
	</div>
);

const PriceRow = ({ label, value, isNegative = false }) => (
	<div className="flex justify-between">
		<span>{label}</span>
		<span
			className={isNegative && value > 0 ? 'text-red-500' : 'text-gray-900'}>
			{isNegative ? `-$${value.toFixed(2)}` : `$${value.toFixed(2)}`}
		</span>
	</div>
);

export default CheckoutPage;
