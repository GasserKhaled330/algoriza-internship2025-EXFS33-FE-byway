import React from 'react';
import { useAtom } from 'jotai';
import { formDataAtom } from '../../../Atoms/courseAtoms';
import { Upload, Star } from 'lucide-react';
import Category from '../../../api/Category';
import { useQuery } from '@tanstack/react-query';
import Instructor from '../../../api/Instructor';

const inputClass =
	'w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500';
const labelClass = 'block text-sm font-medium text-gray-700 mb-1';

const StepOne = ({ isViewMode, isEditMode }) => {
	const [formData, setFormData] = useAtom(formDataAtom);
	const imageUrl =
		formData.image instanceof File
			? URL.createObjectURL(formData.image)
			: typeof formData.image === 'string'
			? formData.image
			: null;

	const { data: categories } = useQuery({
		queryKey: ['Categories'],
		queryFn: () => Category.getCategories(),
	});

	const { data: instructors } = useQuery({
		queryKey: ['Instructors'],
		queryFn: () => Instructor.getAllInstructors(),
	});

	const handleChange = (e) => {
		const { name, value, files } = e.target;

		if (name === 'image') {
			setFormData((prev) => ({ ...prev, [name]: files[0] }));
			return;
		}

		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleRateChange = (rate) => {
		setFormData((prev) => ({ ...prev, rate }));
	};

	return (
		<div>
			{/* course image upload */}
			<div className="p-4 border border-dashed border-gray-300 rounded-lg mb-6 flex items-center">
				<div className="flex items-center justify-center w-32 h-32 bg-gray-50 rounded-lg mr-4">
					{imageUrl ? (
						<img
							src={imageUrl}
							alt="Course Preview"
							className="w-full h-full object-cover rounded-lg"
						/>
					) : (
						<Upload className="w-6 h-6 text-gray-400" />
					)}
				</div>

				{!isViewMode && (
					<div className="flex flex-col">
						<span className="text-sm font-medium text-gray-700">
							Size: 700x430 pixels
						</span>
						<span className="text-xs text-gray-500">
							File Support: .jpg, .jpeg, .png, or .wepb
						</span>

						<label
							htmlFor="image-upload"
							className="mt-2 cursor-pointer inline-block px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition duration-150">
							<div className="flex items-center gap-2">
								<Upload className="size-4" />
								Upload Image
							</div>
						</label>
						<input
							id="image-upload"
							type="file"
							name="image"
							accept=".jpg,.jpeg,.png,.webp"
							className="hidden"
							onChange={handleChange}
							required
						/>
					</div>
				)}
			</div>
			{/* end course image upload */}

			{/* Form Fields */}

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="md:col-span-2">
					<label className={labelClass} htmlFor="name">
						Course Name
					</label>
					<input
						id="name"
						name="name"
						type="text"
						placeholder="Write here"
						value={formData.name}
						onChange={isViewMode ? undefined : handleChange}
						readOnly={isViewMode}
						className={inputClass}
						required={isEditMode}
					/>
				</div>

				<div>
					<label className={labelClass} htmlFor="category">
						Category
					</label>
					<select
						id="category"
						name="categoryId"
						value={formData.categoryId}
						onChange={isViewMode ? undefined : handleChange}
						readOnly={isViewMode}
						className={inputClass}
						required={isEditMode}>
						<option value="" disabled>
							Choose
						</option>

						{categories?.map((category) => (
							<option
								key={category.id}
								value={category.id}
								className="bg-white text-[#333] text-sm font-medium  cursor-pointer hover:bg-[#eee]">
								{category.name}
							</option>
						))}
					</select>
				</div>
				<div>
					<label className={labelClass} htmlFor="level">
						Level
					</label>
					<select
						id="level"
						name="level"
						value={formData.level}
						onChange={isViewMode ? undefined : handleChange}
						readOnly={isViewMode}
						className={inputClass}
						required={isEditMode}>
						<option value="" disabled>
							Choose
						</option>

						<option value="Beginner">Beginner</option>
						<option value="Intermediate">Intermediate</option>
						<option value="Advanced">Advanced</option>
						<option value="Expert">Expert</option>
						<option value="AllLevels">All Levels</option>
					</select>
				</div>

				<div>
					<label className={labelClass} htmlFor="instructor">
						Instructor
					</label>
					<select
						id="instructor"
						name="instructorId"
						value={formData.instructorId}
						onChange={isViewMode ? undefined : handleChange}
						readOnly={isViewMode}
						className={inputClass}
						required={isEditMode}>
						<option value="" disabled>
							Choose
						</option>

						{instructors?.data.map((instructor) => (
							<option
								key={instructor.id}
								value={instructor.id}
								className="bg-white text-[#333] text-sm font-medium  cursor-pointer hover:bg-[#eee]">
								{instructor.fullName}
							</option>
						))}
					</select>
				</div>
				<div>
					<label className={labelClass} htmlFor="cost">
						Cost
					</label>
					<input
						id="cost"
						name="cost"
						type="number"
						placeholder="Write here"
						value={formData.cost}
						onChange={isViewMode ? undefined : handleChange}
						readOnly={isViewMode}
						className={inputClass}
						min="0"
						step="0.01"
						required={isEditMode}
					/>
				</div>

				<div>
					<label className={labelClass} htmlFor="totalHours">
						Total hours
					</label>
					<input
						id="totalHours"
						name="totalHours"
						type="number"
						placeholder="Write here"
						value={formData.totalHours}
						onChange={isViewMode ? undefined : handleChange}
						readOnly={isViewMode}
						className={inputClass}
						min="1"
						required={isEditMode}
					/>
				</div>
				<div>
					<label className={labelClass}>Rate</label>
					<div className="flex items-center space-x-1 mt-2">
						{[1, 2, 3, 4, 5].map((star) => (
							<Star
								key={star}
								className={`w-6 h-6 cursor-pointer ${
									formData.rate >= star
										? 'text-yellow-400 fill-yellow-400'
										: 'text-gray-300'
								}`}
								onClick={() =>
									isViewMode ? undefined : handleRateChange(star)
								}
							/>
						))}
					</div>
				</div>

				<div className="md:col-span-2 mt-4">
					<label className={labelClass} htmlFor="description">
						Description
					</label>
					<textarea
						id="description"
						name="description"
						placeholder="Write here"
						value={formData.description}
						onChange={isViewMode ? undefined : handleChange}
						readOnly={isViewMode}
						className={`${inputClass} min-h-[100px]`}
						required={isEditMode}
					/>
				</div>
				<div className="md:col-span-2 mt-4">
					<label className={labelClass} htmlFor="certification">
						Certification
					</label>
					<textarea
						id="certification"
						name="certification"
						placeholder="Write here"
						value={formData.certification}
						onChange={isViewMode ? undefined : handleChange}
						readOnly={isViewMode}
						className={`${inputClass} min-h-[100px]`}
					/>
				</div>
			</div>
		</div>
	);
};

export default StepOne;
