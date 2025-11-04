import React, { useState } from 'react';
import Popup from '../../Popup.jsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ImageUp, Star } from 'lucide-react';
import Instructor from '../../../api/Instructor.js';
import { useAtomValue, useSetAtom } from 'jotai';
import {
	instructorJobTitlesAtom,
	showAddPopupAtom,
	closeAllPopupsAtom,
} from '../../../Atoms/instructorAtoms.js';
import Spinner from '../../Common/Spinner.jsx';
import toast from 'react-hot-toast';

const validateForm = (formData) => {
	const errors = {};

	if (!formData.image) errors.image = 'image is required.';
	if (!formData.fullName) errors.fullName = 'instructor Name is required.';
	if (!formData.jobTitle) errors.jobTitle = 'instructor job title is required.';
	if (!formData.rate) errors.rate = 'Rate is required.';
	if (!formData.bio) errors.bio = 'instructor bio is required.';

	return errors;
};

const AddInstructorForm = () => {
	const jobTitles = useAtomValue(instructorJobTitlesAtom);
	const showPopup = useAtomValue(showAddPopupAtom);
	const onClose = useSetAtom(closeAllPopupsAtom);
	const initalFormData = {
		fullName: '',
		jobTitle: '',
		rate: 0,
		bio: '',
		image: '',
		imagePreview: '',
	};
	const [form, setForm] = useState(initalFormData);
	const [errors, setErrors] = useState({});

	const queryClient = useQueryClient();

	const reset = () => {
		setForm(initalFormData);
	};

	const mutation = useMutation({
		mutationKey: ['saveInstructor'],
		mutationFn: (newInstructor) => Instructor.saveInstructor(newInstructor),
		onSuccess: async () => {
			onClose();
			reset();
			await queryClient.invalidateQueries({ queryKey: ['instructors'] });
			toast.success(
				<p className="text-sm font-medium">
					instructor data saved successfully.
				</p>
			);
		},
		onError: () => {
			toast.error(
				<p className="text-sm font-medium">
					Failed to save instructor data, Please try again later.
				</p>
			);
		},
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === 'image') {
			setForm((prev) => ({
				...prev,
				[name]: e.target.files[0],
				['imagePreview']: URL.createObjectURL(e.target.files[0]),
			}));
		} else {
			setForm((prev) => ({ ...prev, [name]: value }));
		}
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
	};

	const handleRateChange = (rate) => {
		setForm((prev) => ({ ...prev, rate }));
		setErrors((prev) => ({ ...prev, ['rate']: undefined }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const validationErrors = validateForm(form);
		setErrors(validationErrors);
		if (Object.keys(validationErrors).length > 0) return;

		const formData = new FormData();
		formData.append('FullName', form.fullName);
		formData.append('Bio', form.bio);
		formData.append('jobTitle', form.jobTitle);
		formData.append('Rate', form.rate);
		formData.append('Image', form.image);
		mutation.mutate(formData);
	};

	if (!showPopup) return null;

	return (
		<>
			<Popup show={showPopup} onClose={onClose}>
				<h2 className="text-lg font-medium text-[#202637] mb-4">
					Add Instructor
				</h2>
				<form
					onSubmit={handleSubmit}
					className="grid gap-3 w-full"
					encType="multipart/form-data">
					<div className="mb-2">
						<input
							type="file"
							name="image"
							id="image"
							accept="image/*"
							className="hidden bg-gray-100 text-sm font-medium p-2 rounded-full focus:outline-blue-500"
							onChange={handleChange}
						/>
						<label htmlFor="image" title="upload image">
							{form.image ? (
								<img
									src={form.imagePreview}
									className="size-20 rounded cursor-pointer"
									alt="Uploaded preview"
								/>
							) : (
								<ImageUp
									className={`${
										form.imagePreview && 'hidden'
									} bg-[#F2F2F2] fill-indigo-500  rounded cursor-pointer`}
									size={80}
								/>
							)}
						</label>
						{errors.image && (
							<p className="text-red-500 text-xs mt-1">{errors.image}</p>
						)}
					</div>
					<div className="flex flex-col justify-center">
						<label htmlFor="fullName" className="text-sm font-medium mb-2">
							Name
						</label>
						<input
							type="text"
							id="fullName"
							name="fullName"
							value={form.fullName}
							className={`bg-gray-100 border ${
								errors.fullName ? 'border-red-500' : 'border-gray-300'
							} text-sm font-medium rounded-lg p-3 focus:outline-blue-500 focus:border-blue-500 transition duration-150`}
							placeholder="Write here"
							onChange={handleChange}
						/>
						{errors.fullName && (
							<p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
						)}
					</div>
					<div className="flex justify-between items-center gap-4">
						<div className="flex flex-col justify-center grow">
							<label htmlFor="jobTitle" className="text-sm font-medium mb-2">
								Job Title
							</label>
							<select
								name="jobTitle"
								id="jobTitle"
								value={form.jobTitle}
								className="bg-gray-100 text-sm font-medium cursor-pointer p-2 bordder-[#ccc] rounded-md hover:border-[#999] focus:outline-none focus:border-[#007bff] focus:shadow-md"
								onChange={handleChange}>
								<option
									value=""
									className="bg-white text-[#333] text-sm font-medium cursor-pointer hover:bg-[#eee]">
									Choose
								</option>
								{jobTitles?.map((item) => (
									<option
										key={item}
										value={item}
										className="bg-white text-[#333] text-sm font-medium  cursor-pointer hover:bg-[#eee]">
										{item}
									</option>
								))}
							</select>
							{errors.jobTitle && (
								<p className="text-red-500 text-xs mt-1">{errors.jobTitle}</p>
							)}
						</div>
						<div className="flex flex-col">
							<label className="text-sm font-medium mb-2">Rate</label>
							<div className="flex items-center py-2 space-x-1">
								{[1, 2, 3, 4, 5].map((star) => (
									<Star
										key={star}
										className={`w-6 h-6 cursor-pointer ${
											form.rate >= star
												? 'text-yellow-400 fill-yellow-400 '
												: 'text-gray-300'
										}`}
										onClick={() => handleRateChange(star)}
									/>
								))}
							</div>
							{errors.rate && (
								<p className="text-red-500 text-xs mt-1">{errors.rate}</p>
							)}
						</div>
					</div>
					<div className="flex flex-col">
						<label htmlFor="bio" className="text-sm font-medium mb-1">
							Bio
						</label>
						<textarea
							name="bio"
							id="bio"
							className="min-h-[50px] max-h-[100px] bg-gray-100 text-sm font-medium rounded p-2 resize-y focus:outline-blue-500"
							value={form.bio}
							placeholder="Write here"
							onChange={handleChange}
							maxLength="500"
							autoComplete="bio"
						/>
						{errors.bio && (
							<p className="text-red-500 text-xs mt-1">{errors.bio}</p>
						)}
					</div>
					<div className="flex justify-center items-center">
						<button
							type="submit"
							className="w-1/2 bg-gray-800  text-white text-xl font-medium p-2 rounded-2xl cursor-pointer hover:bg-gray-950 "
							disabled={mutation.isPending}>
							{mutation.isPending ? (
								<p className="flex justify-center items-center">
									<Spinner width={24} height={24} />
									<span className="ml-2">Adding...</span>
								</p>
							) : (
								'Add'
							)}
						</button>
					</div>
				</form>
			</Popup>
		</>
	);
};

export default AddInstructorForm;
