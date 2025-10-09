import React from 'react';
import { useParams } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Star, Clock, User, CheckCircle, Award } from 'lucide-react';
import CourseCard from '../components/Home/Courses/CourseCard';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Course from '../api/Course';
import Instructor from '../api/Instructor';
import AvaterImage from '/avater-img.webp';
import Cart from '../api/Cart';
import { Link } from 'react-router-dom';

const CourseMeta = ({ icon: Icon, text }) => (
	<div className="flex items-center text-gray-600 text-sm">
		<Icon className="w-4 h-4 mr-2 text-blue-600" />
		<span>{text}</span>
	</div>
);

const SectionTab = ({ label, isActive, id }) => (
	<HashLink
		to={`#${id}`}
		className={`px-4 py-2 text-lg font-medium transition duration-200 border-b-2 ${
			isActive
				? 'border-blue-600 text-blue-600'
				: 'border-transparent text-gray-500 hover:text-gray-700'
		}`}>
		{label}
	</HashLink>
);

const learnerReviews = [
	{
		id: 1,
		name: 'Mark Doe',
		rating: 5,
		date: '22nd March, 2024',
		comment:
			'I was totally apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.',
	},
	{
		id: 2,
		name: 'Mark Doe',
		rating: 5,
		date: '22nd March, 2024',
		comment:
			'I was totally apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.',
	},
];

const CourseDetailPage = () => {
	const { courseId } = useParams();

	const {
		data: loadedCourse,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['Course', courseId],
		queryFn: () => Course.getCourseById(courseId),
		enabled: !!courseId,
	});

	const { data: instructor } = useQuery({
		queryKey: ['instructor', loadedCourse?.instructorId],
		queryFn: () => Instructor.getInstructor(loadedCourse.instructorId),
		enabled: !!loadedCourse?.instructorId,
	});

	const { data: topCoursesInSameCategory } = useQuery({
		queryKey: [
			'TopCoursesInSameCategory',
			loadedCourse?.id,
			loadedCourse?.categoryId,
		],
		queryFn: () =>
			Course.getTopCoursesInSameCategory(
				loadedCourse?.id,
				loadedCourse?.categoryId
			),
		enabled: !!loadedCourse?.id && !!loadedCourse?.categoryId,
	});

	const { data: isInCart } = useQuery({
		queryKey: ['Cart', 'itemStatus', courseId],
		queryFn: () => Cart.checkItemStatus(courseId),
		enabled: !!courseId,
	});

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationKey: ['Cart', 'save'],
		mutationFn: (courseId) => Cart.saveCartItem(courseId),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['cartItems'] });
			await queryClient.invalidateQueries({ queryKey: ['cartCount'] });
			await queryClient.invalidateQueries({
				queryKey: ['Cart', 'itemStatus', courseId],
			});
			console.log('item add sccessfully');
		},
		onError: (error) => {
			console.error('Mutation error:', error);
		},
	});

	if (isLoading) {
		return <div>Loading courses...</div>;
	}

	if (isError) {
		return <div>An error occurred while fetching data.</div>;
	}

	const buttonDisabled = mutation.isPending || isInCart;
	const buttonText = mutation.isPending
		? 'Adding...'
		: isInCart
		? 'Added'
		: 'Add to Cart';

	const totalLectures =
		loadedCourse?.contents.reduce((sum, content) => {
			return sum + content.lecturesCount;
		}, 0) || 0;

	const course = {
		id: loadedCourse.id,
		title: loadedCourse.name,
		breadcrumbs: ['Home', 'Courses', loadedCourse.name],
		description: loadedCourse.description,
		certification: loadedCourse.certification,
		instructorName: instructor?.fullName,
		instructorTitle: instructor?.jobTitle,
		price: loadedCourse.cost,
		rating: loadedCourse.rate,
		reviewsCount: 1653,
		contents: loadedCourse.contents,
		totalHours: loadedCourse.totalHours,
		totalLectures: totalLectures,
		imageUrl: loadedCourse.imagePath,
	};

	const handleAddToCartClick = (courseId) => {
		mutation.mutate(courseId);
	};

	return (
		<div className="bg-white min-h-screen">
			<div className="container mx-auto px-4 py-8">
				{/* Breadcrumbs */}
				<p className="text-sm text-gray-500 mb-6">
					{course.breadcrumbs.join(' > ')}
				</p>

				{/* --- GRID LAYOUT: LEFT (Content) & RIGHT (Sidebar) --- */}
				<div className="grid lg:grid-cols-3 gap-10">
					{/* LEFT COLUMN: Course Content, Instructor, Reviews */}
					<div className="lg:col-span-2">
						{/* Course Title and Meta */}
						<h1 className="text-4xl font-extrabold text-gray-900 mb-4">
							{course.title}
						</h1>
						<p className="text-lg text-gray-600 mb-4">
							This course is meticulously crafted to provide you with a
							foundational understanding of the principles, methodologies, and
							practical skills required to excel your experience in UI/UX
							Design.
						</p>

						{/* Course Stats */}
						<div className="flex items-center space-x-6 mb-8 text-sm">
							<p className="text-gray-500">
								Created by{' '}
								<span className="text-blue-600 font-medium">
									{course.instructorName}
								</span>
							</p>
							<div className="flex items-center space-x-1 text-yellow-500">
								<Star className="w-4 h-4 fill-yellow-500" />
								<span className="text-gray-900 font-bold">{course.rating}</span>
								<span className="text-gray-500">
									({course.reviewsCount.toLocaleString()} reviews)
								</span>
							</div>
						</div>

						{/* --- Content Tabs --- */}
						<div className="border-b border-gray-200 mb-8 flex space-x-6">
							<SectionTab
								label="Description"
								isActive={true}
								id={'description-section'}
							/>
							<SectionTab
								label="Instructor"
								isActive={false}
								id={'instructor-section'}
							/>
							<SectionTab
								label="Content"
								isActive={false}
								id={'content-section'}
							/>
							<SectionTab
								label="Reviews"
								isActive={false}
								id={'reviews-section'}
							/>
						</div>

						{/* ------------------ DESCRIPTION SECTION ------------------ */}
						<div id="description-section" className="mb-12">
							<h3 className="text-2xl font-bold text-gray-900 mb-4">
								Course Description
							</h3>
							<p className="text-gray-700 leading-relaxed mb-6">
								{course.description}
							</p>

							<h3 className="text-2xl font-bold text-gray-900 mb-4">
								Certification
							</h3>
							<p className="text-gray-700 leading-relaxed">
								{course.certification}
							</p>
						</div>

						{/* ------------------ INSTRUCTOR SECTION ------------------ */}
						<div id="instructor-section" className="mb-12">
							<h3 className="text-2xl font-bold text-gray-900 mb-4">
								Instructor
							</h3>
							<div className="text-blue-600 font-semibold mb-4">
								{course.instructorName}
							</div>

							<div className="flex items-center space-x-6 mb-4 text-gray-600 text-sm">
								<CourseMeta icon={Star} text="4.8/5.0 Ratings" />
								<CourseMeta icon={User} text="500 Students" />
								<CourseMeta icon={Clock} text="40,443 Reviews" />
							</div>

							<p className="text-gray-700 leading-relaxed">{instructor?.bio}</p>
						</div>

						{/* ------------------ CONTENT / SYLLABUS SECTION ------------------ */}
						<div id="content-section" className="mb-12">
							<h3 className="text-2xl font-bold text-gray-900 mb-4">Content</h3>
							<div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
								{course.contents.map((item) => (
									<div
										key={item.id}
										className="flex justify-between items-center p-4">
										<p className="text-gray-700 font-medium">{item.name}</p>
										<div className="flex space-x-4 text-gray-500 text-sm">
											<span>{item.lecturesCount} Lectures</span>
											<span>{item.durationInHours} Hour</span>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* ------------------ LEARNER REVIEWS SECTION ------------------ */}
						<div id="reviews-section" className="mb-12">
							<h3 className="text-2xl font-bold text-gray-900 mb-6">
								Learner Reviews
							</h3>

							{/* Review Summary (Mock) */}
							<div className="flex items-center space-x-4 mb-8">
								<span className="text-4xl font-extrabold text-gray-900">
									{course.rating}
								</span>
								<div className="flex flex-col">
									<div className="flex items-center text-yellow-500">
										<Star className="w-5 h-5 fill-yellow-500" />
										<Star className="w-5 h-5 fill-yellow-500" />
										<Star className="w-5 h-5 fill-yellow-500" />
										<Star className="w-5 h-5 fill-yellow-500" />
										<Star className="w-5 h-5 fill-yellow-500" />
									</div>
									<span className="text-gray-600 text-sm">
										{course.reviewsCount.toLocaleString()} total reviews
									</span>
								</div>
							</div>

							{/* Individual Reviews */}
							<div className="space-y-6">
								{learnerReviews.map((review) => (
									<div
										key={review.id}
										className="p-4 border border-gray-100 rounded-lg bg-white shadow-sm">
										<div className="flex items-center mb-3">
											<div className="w-10 h-10 rounded-full overflow-hidden mr-3">
												<img
													src={AvaterImage}
													alt={review.name}
													className="object-cover"
												/>
											</div>
											<div>
												<p className="font-semibold text-gray-900">
													{review.name}
												</p>
												<div className="flex items-center text-xs text-gray-500">
													<Star className="w-3 h-3 fill-yellow-500 text-yellow-500 mr-1" />
													<span>{review.rating}.0</span>
													<span className="ml-2">
														Reviewed on {review.date}
													</span>
												</div>
											</div>
										</div>
										<p className="text-gray-700 leading-relaxed">
											{review.comment}
										</p>
									</div>
								))}
							</div>

							<button className="mt-8 px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition duration-150">
								View More Reviews
							</button>
						</div>
					</div>
					{/* END LEFT COLUMN */}

					{/* RIGHT COLUMN: Course Buy Box / Sticky Sidebar */}
					<div className="lg:col-span-1">
						<div className="p-6 border border-gray-200 rounded-xl shadow-lg sticky top-20">
							{/* Course Video/Image Thumbnail */}
							<div className="mb-4 rounded-lg overflow-hidden">
								<img
									src={course.imageUrl}
									alt="Course Thumbnail"
									className="w-full h-auto object-cover"
								/>
							</div>

							{/* Price */}
							<p className="text-4xl font-extrabold text-gray-900 mb-6">
								${course.price.toFixed(2)}
							</p>

							{/* Buttons */}
							<div className="space-y-3 mb-6">
								<button
									onClick={() => handleAddToCartClick(courseId)}
									disabled={buttonDisabled}
									className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-150 cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-200 disabled:text-gray-700">
									{buttonText}
								</button>
								<Link to={'/cart'}>
									<button
										className="w-full py-3 bg-white border border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition duration-150"
										onClick={() => {
											if (!isInCart) mutation.mutate(courseId);
										}}>
										Buy Now
									</button>
								</Link>
							</div>

							{/* Course Highlights */}
							<div className="space-y-3 text-gray-700 text-sm">
								<CourseMeta
									icon={CheckCircle}
									text={`${course.totalLectures} Lectures`}
								/>
								<CourseMeta
									icon={Clock}
									text={`${course.totalHours} Total Hours`}
								/>
								<CourseMeta icon={Award} text="Certificate of Completion" />
							</div>

							{/* Share Icons */}
							<div className="mt-6 pt-4 border-t border-gray-200 flex justify-around">
								<p className="text-gray-500 font-medium">Share</p>
								<div className="flex space-x-3">
									<a href="#" className="text-blue-600 hover:text-blue-800">
										<Star className="w-5 h-5" />
									</a>
									<a href="#" className="text-blue-600 hover:text-blue-800">
										<Star className="w-5 h-5" />
									</a>
									<a href="#" className="text-blue-600 hover:text-blue-800">
										<Star className="w-5 h-5" />
									</a>
									<a href="#" className="text-blue-600 hover:text-blue-800">
										<Star className="w-5 h-5" />
									</a>
								</div>
							</div>
						</div>
					</div>
					{/* END RIGHT COLUMN */}
				</div>
				{/* END GRID LAYOUT */}

				{/* MORE COURSES SECTION (Bottom Slider - Reuse CourseCard) */}
				<div className="mt-16">
					<h3 className="text-2xl font-bold text-gray-900 mb-6">
						More Courses Like This
					</h3>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-6">
						{topCoursesInSameCategory?.map((course) => (
							<CourseCard key={course.id} course={course} /> // Reuse the updated card
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseDetailPage;
