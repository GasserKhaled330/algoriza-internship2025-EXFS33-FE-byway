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

const StepOne = () => {
	const [formData, setFormData] = useAtom(formDataAtom);

	const { data: categories } = useQuery({
		queryKey: ['Categories'],
		queryFn: Category.getCategories,
	});

	const { data: instructors } = useQuery({
		queryKey: ['Instructors'],
		queryFn: Instructor.getAllInstructors,
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
					{formData.image ? (
						<img
							src={URL.createObjectURL(formData.image)}
							alt="Course Preview"
							className="w-full h-full object-cover rounded-lg"
						/>
					) : (
						<Upload className="w-6 h-6 text-gray-400" />
					)}
				</div>

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
			</div>
			{/* end course image upload */}

			{/* Form Fields */}

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Row 1 */}
				<div className="md:col-span-2">
					<label className={labelClass} htmlFor="courseName">
						Course Name
					</label>
					<input
						id="courseName"
						name="courseName"
						type="text"
						placeholder="Write here"
						value={formData.courseName}
						onChange={handleChange}
						className={inputClass}
						required
					/>
				</div>

				{/* Row 2 */}
				<div>
					<label className={labelClass} htmlFor="category">
						Category
					</label>
					<select
						id="category"
						name="category"
						value={formData.category}
						onChange={handleChange}
						className={inputClass}
						required>
						<option value="" disabled>
							Choose
						</option>

						{categories?.map((category) => (
							<option
								key={category.id}
								value={category.name}
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
						onChange={handleChange}
						className={inputClass}
						required>
						<option value="" disabled>
							Choose
						</option>

						<option value="beginner">Beginner</option>
						<option value="intermediate">Intermediate</option>
						<option value="advanced">Advanced</option>
						<option value="expert">Expert</option>
						<option value="alllevels">All Levels</option>
					</select>
				</div>

				{/* Row 3 */}
				<div>
					<label className={labelClass} htmlFor="instructor">
						Instructor
					</label>
					<select
						id="instructor"
						name="instructor"
						value={formData.instructor}
						onChange={handleChange}
						className={inputClass}
						required>
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
						onChange={handleChange}
						className={inputClass}
						min="0"
						step="0.01"
						required
					/>
				</div>

				{/* Row 4 */}
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
						onChange={handleChange}
						className={inputClass}
						min="1"
						required
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
								onClick={() => handleRateChange(star)}
							/>
						))}
					</div>
				</div>

				{/* Row 5 (Description and Certification) */}
				<div className="md:col-span-2 mt-4">
					<label className={labelClass} htmlFor="description">
						Description
					</label>
					{/* Using a simple textarea for brevity, replace with a full rich text editor if needed */}
					<textarea
						id="description"
						name="description"
						placeholder="Write here"
						value={formData.description}
						onChange={handleChange}
						className={`${inputClass} min-h-[100px]`}
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
						onChange={handleChange}
						className={`${inputClass} min-h-[100px]`}
					/>
				</div>
			</div>
		</div>
	);
};

export default StepOne;
