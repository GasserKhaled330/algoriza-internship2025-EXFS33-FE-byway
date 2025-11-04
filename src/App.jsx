import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import SignIn from './pages/SignIn.jsx';
import UnAuthorized from './pages/UnAuthorized.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Courses from './components/Dashboard/courses/Courses.jsx';
import Instructors from './components/Dashboard/instructors/Instructors.jsx';
import Statistics from './components/Dashboard/statistics/Statistics.jsx';
import React from 'react';
import SignUp from './pages/SignUp.jsx';
import LandingPage from './pages/LandingPage.jsx';
import CoursesListingPage from './pages/CoursesListingPage.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CourseDetailPage from './pages/CourseDetailPage.jsx';
import ShoppingCartPage from './pages/ShoppingCartPage.jsx';
import OrderConfirmationPage from './pages/OrderConfirmationPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import MultistepCourseForm from './components/Dashboard/courses/MultistepCourseForm.jsx';
import CourseFormContainer from './components/Dashboard/courses/CourseFormContainer.jsx';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 30, // Default stale time of 30 seconds
			gcTime: 1000 * 60 * 60, // Default cache time of 1 hour
		},
	},
});

function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Routes>
						<Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
							<Route path="/dashboard" element={<Dashboard />}>
								<Route index element={<Statistics />} />
								<Route path="instructors" element={<Instructors />} />
								<Route exact path="courses" element={<Courses />} />
								<Route
									path="/dashboard/courses/add"
									element={<CourseFormContainer />}
								/>
								<Route
									path="/dashboard/courses/view/:courseId"
									element={<CourseFormContainer />}
								/>
								<Route
									path="/dashboard/courses/edit/:courseId"
									element={<CourseFormContainer />}
								/>
								<Route path="*" element={<NotFound />} />
							</Route>
						</Route>
						<Route exact path="/unauthorized" element={<UnAuthorized />} />
						<Route path="/" element={<Home />}>
							<Route index element={<LandingPage />} />
							<Route exact path="signin" element={<SignIn />} />
							<Route exact path="signup" element={<SignUp />} />
							<Route exact path="courses" element={<CoursesListingPage />} />
							<Route element={<ProtectedRoute allowedRoles={['User']} />}>
								<Route exact path="cart" element={<ShoppingCartPage />} />
								<Route exact path="checkout" element={<CheckoutPage />} />
								<Route
									exact
									path="order-confirmation"
									element={<OrderConfirmationPage />}
								/>
							</Route>
							<Route
								exact
								path="/courses/:courseId"
								element={<CourseDetailPage />}
							/>
							<Route path="*" element={<NotFound />} />
						</Route>
						<Route path="*" element={<NotFound />} />
					</Routes>
					<Toaster position="top-right" reverseOrder={false} />
				</BrowserRouter>
			</QueryClientProvider>
		</>
	);
}

export default App;
