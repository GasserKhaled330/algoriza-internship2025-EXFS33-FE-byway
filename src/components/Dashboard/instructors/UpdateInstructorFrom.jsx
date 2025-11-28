import React, { useState, useEffect } from 'react';
import { ImageUp, Star } from 'lucide-react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Instructor from '../../../api/Instructor.js';
import {
	instructorJobTitlesAtom,
	selectedInstructorIdAtom,
	showUpdatePopupAtom,
	closeAllPopupsAtom,
} from '../../../Atoms/instructorAtoms.js';
import Popup from '../../Popup.jsx';
import Spinner from '../../Common/Spinner.jsx';
import Loader from '../../Common/Loader.jsx';
import toast from 'react-hot-toast';

const UpdateInstructorFrom = () => {
	const [{ data: jobTitles }] = useAtom(instructorJobTitlesAtom);
	const instructorId = useAtomValue(selectedInstructorIdAtom);
	const showPopup = useAtomValue(showUpdatePopupAtom);
	const onClose = useSetAtom(closeAllPopupsAtom);

	const [image, setImage] = useState('');
	const [imagePreview, setImagePreview] = useState('');
	const [jobTitle, setJobTitle] = useState('');
	const [fullName, setFullName] = useState('');
	const [rate, setRate] = useState('');
	const [bio, setBio] = useState('');

	const queryClient = useQueryClient();

	const {
		data: instructor,
		isPending,
		isFetching,
	} = useQuery({
		queryKey: ['instructor', instructorId],
		queryFn: () => Instructor.getInstructor(instructorId),
		enabled: !!instructorId && showPopup,
	});

	useEffect(() => {
		if (showPopup && instructor) {
			setImagePreview(instructor?.imagePath);
			setFullName(instructor?.fullName);
			setJobTitle(instructor?.jobTitle);
			setRate(instructor?.rate);
			setBio(instructor?.bio);
		}
	}, [showPopup, instructor]);

	const mutation = useMutation({
		mutationKey: ['saveInstructor'],
		mutationFn: (updatedInstructor) =>
			Instructor.saveInstructor(updatedInstructor),
		onSuccess: async () => {
			onClose();
			await Promise.all([
				queryClient.invalidateQueries({ queryKey: ['instructors'] }),
				queryClient.invalidateQueries({
					queryKey: ['instructor', instructorId],
				}),
			]);

			toast.success(
				<p className="text-sm font-medium">
					instructor data updated successfully
				</p>
			);
		},
		onError: (error) => {
			toast.error(
				<p className="text-sm font-medium">
					{error.response?.data.detail ||
						'Failed to update instructor data, Please try again later.'}
				</p>
			);
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

	const handleRateChange = (rate) => {
		setRate(rate);
	};

	const handleBioChange = (e) => {
		setBio(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('Id', instructorId);
		formData.append('FullName', fullName);
		formData.append('Bio', bio);
		formData.append('jobTitle', jobTitle);
		formData.append('Rate', rate);
		if (image) {
			formData.append('Image', image);
		}
		mutation.mutate(formData);
	};

	if (!showPopup) return null;
	if (isPending || isFetching) {
		return <Loader />;
	}
	return (
		<Popup show={showPopup} onClose={onClose}>
			<h2 className="text-lg font-medium text-[#202637] mb-4">
				Update Instructor
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
					/>
					<label htmlFor="image" title="upload image">
						{image || imagePreview ? (
							<img
								src={imagePreview}
								id="image"
								name="image"
								className="size-30 rounded cursor-pointer object-fill"
								alt="Uploaded preview"
								loading="lazy"
							/>
						) : (
							<ImageUp
								className={`${
									imagePreview && 'hidden'
								} bg-[#F2F2F2] fill-indigo-500  rounded cursor-pointer`}
								size={120}
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
							onChange={handleJobTitleChange}>
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
						<div className="flex items-center py-2 space-x-1">
							{[1, 2, 3, 4, 5].map((star) => (
								<Star
									key={star}
									className={`w-6 h-6 cursor-pointer ${
										rate >= star
											? 'text-yellow-400 fill-yellow-400 '
											: 'text-gray-300'
									}`}
									onClick={() => handleRateChange(star)}
								/>
							))}
						</div>
					</div>
				</div>
				<div className="flex flex-col">
					<label htmlFor="bio" className="text-sm font-medium mb-1">
						Bio
					</label>
					<textarea
						name="bio"
						id="bio"
						className=" min-h-[50px] max-h-[100px] bg-gray-100 text-sm font-medium rounded p-2 resize-y focus:outline-blue-500"
						value={bio}
						placeholder="Write here"
						onChange={handleBioChange}
						maxLength="500"
						autoComplete="bio"
					/>
				</div>
				<div className="flex justify-center items-center">
					<button
						type="submit"
						className="w-1/2 bg-gray-800  text-white text-xl font-medium p-2 rounded-2xl cursor-pointer hover:bg-gray-950"
						disabled={mutation.isPending}>
						{mutation.isPending ? (
							<p className="flex justify-center items-center">
								<Spinner width={24} height={24} />
								<span className="ml-2">Updating...</span>
							</p>
						) : (
							'Update'
						)}
					</button>
				</div>
			</form>
		</Popup>
	);
};

export default UpdateInstructorFrom;
