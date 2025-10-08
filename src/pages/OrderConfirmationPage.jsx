import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderConfirmationPage = () => {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
			<div className="bg-white p-8 md:p-12 rounded-lg shadow-xl text-center max-w-md w-full border border-gray-200">
				{/* Checkmark Icon */}
				<div className="flex justify-center mb-6">
					<div className="bg-green-500 rounded-full p-4 inline-flex items-center justify-center">
						<CheckCircle className="w-16 h-16 text-white" strokeWidth={1.5} />
					</div>
				</div>

				{/* Title */}
				<h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
					Purchase Complete
				</h1>

				{/* Message */}
				<p className="text-lg text-gray-600 mb-8">
					You Will Receive a confirmation email soon!
				</p>

				{/* Back to Home Button */}
				<Link
					to="/"
					className="inline-block px-8 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
					Back to home
				</Link>
			</div>
		</div>
	);
};

export default OrderConfirmationPage;
