import React, { useEffect, useState } from 'react';
import Popup from '../../Popup.jsx';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ImageUp } from 'lucide-react';
import Instructor from '../../../api/Instructor.js';
import { useAtomValue, useSetAtom } from 'jotai';
import {
	showAddPopupAtom,
	closeAllPopupsAtom,
} from '../../../Atoms/instructorAtoms.js';

const AddInstructorForm = () => {
	const showPopup = useAtomValue(showAddPopupAtom);
	const onClose = useSetAtom(closeAllPopupsAtom);

	const [image, setImage] = useState('');
	const [imagePreview, setImagePreview] = useState('');
	const [jobTitle, setJobTitle] = useState('');
	const [fullName, setFullName] = useState('');
	const [rate, setRate] = useState('');
	const [bio, setBio] = useState('');

	const queryClient = useQueryClient();

	const { data: jobTitles } = useQuery({
		queryKey: ['instructor', 'jobTitles'],
		queryFn: Instructor.getInstructorJobTitles,
	});

	useEffect(() => {
		if (showPopup) {
			// Clear fields for a new 'Add' form
			setImagePreview('');
			setImage('');
			setFullName('');
			setJobTitle('');
			setRate('');
			setBio('');
		}
	}, [showPopup]);

	const mutation = useMutation({
		mutationKey: ['saveInstructor'],
		mutationFn: (newInstructor) => Instructor.saveInstructor(newInstructor),
		onSuccess: async () => {
			onClose();
			await queryClient.invalidateQueries({ queryKey: ['instructors'] });
		},
		onError: (error) => {
			console.error('Mutation error:', error);
		},
	});

	const handleImageUpload = (e) => {
		setImagePreview(URL.createObjectURL(e.target.files[0]));
		setImage(e.target.files[0]);
	};

	const handleFullNameChange = (e) => {
		setFullName(e.target.value);
	};

	const handleJobTitleChange = (e) => {
		setJobTitle(e.target.value);
	};

	const handleRateChange = (e) => {
		setRate(e.target.value);
	};

	const handleBioChange = (e) => {
		setBio(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('FullName', fullName);
		formData.append('Bio', bio);
		formData.append('jobTitle', jobTitle);
		formData.append('Rate', rate);
		formData.append('Image', image);
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
					className="grid gap-3"
					encType="multipart/form-data">
					<div className="m-2">
						<input
							type="file"
							name="image"
							id="image"
							accept="image/*"
							className="hidden bg-gray-100 text-sm font-medium p-2 rounded-full focus:outline-blue-500"
							onChange={handleImageUpload}
							required
						/>
						<label htmlFor="image" title="upload image">
							{image ? (
								<img
									src={imagePreview}
									id="image"
									name="image"
									className="size-20 rounded cursor-pointer"
									alt="Uploaded preview"
								/>
							) : (
								<ImageUp
									className={`${
										imagePreview && 'hidden'
									} bg-[#F2F2F2] fill-indigo-500  rounded cursor-pointer`}
									size={80}
								/>
							)}
						</label>
					</div>
					<div className="flex flex-col justify-center">
						<label htmlFor="fullName" className="text-sm font-medium mb-2">
							Name
						</label>
						<input
							type="text"
							id="fullName"
							name="fullName"
							value={fullName}
							className="bg-gray-100 text-sm font-medium rounded-lg p-2 focus:outline-blue-500"
							placeholder="Write here"
							onChange={handleFullNameChange}
							required
						/>
					</div>
					<div className="grid grid-cols-2 gap-2">
						<div className="flex flex-col justify-center">
							<label htmlFor="jobTitle" className="text-sm font-medium mb-2">
								Job Title
							</label>
							<select
								name="jobTitle"
								id="jobTitle"
								value={jobTitle}
								className="bg-gray-100 text-sm font-medium cursor-pointer p-2 bordder-[#ccc] rounded-md hover:border-[#999] focus:outline-none focus:border-[#007bff] focus:shadow-md"
								onChange={handleJobTitleChange}
								required>
								<option
									value=""
									className="bg-white text-[#333]  text-sm font-medium cursor-pointer hover:bg-[#eee]">
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
						</div>
						<div className="flex flex-col justify-center">
							<label htmlFor="rate" className="text-sm font-medium mb-2">
								Rate
							</label>
							<input
								type="number"
								name="rate"
								id="rate"
								min="0"
								max="5"
								step="0.5"
								value={rate}
								className="bg-gray-100 text-sm font-medium rounded-lg p-2 focus:outline-blue-500"
								placeholder="Write here"
								onChange={handleRateChange}
								required
							/>
						</div>
					</div>
					<div className="flex flex-col">
						<label htmlFor="bio" className="text-sm font-medium mb-1">
							Bio
						</label>
						<textarea
							name="bio"
							id="bio"
							className="h-full bg-gray-100 text-sm font-medium rounded-2xl p-2 resize-none focus:outline-blue-500"
							value={bio}
							placeholder="Write here"
							onChange={handleBioChange}
							rows="5"
							cols="40"
							maxLength="500"
							required
							autoComplete="bio"
						/>
					</div>
					<div className="flex justify-center items-center">
						<button
							type="submit"
							className="w-3xs bg-gray-800  text-white text-2xl font-semibold p-2 rounded-2xl cursor-pointer hover:bg-gray-950 "
							disabled={mutation.isPending}>
							{mutation.isPending ? 'Submitting...' : 'Submit'}
						</button>
					</div>
					{mutation.isError && (
						<div className="bg-red-100 text-red-800 p-4 rounded-md">
							<p>Failed to add instructor data, Please try again later.</p>
						</div>
					)}
				</form>
			</Popup>
		</>
	);
};

export default AddInstructorForm;
