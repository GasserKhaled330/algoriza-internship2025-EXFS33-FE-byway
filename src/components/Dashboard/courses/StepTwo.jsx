import React from 'react';
import { useAtom } from 'jotai';
import { formDataAtom } from '../../../Atoms/courseAtoms';
import { Trash2, BadgePlus } from 'lucide-react';

const inputClass =
	'w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500';
const labelClass = 'block text-sm font-medium text-gray-700 mb-1';

const StepTwo = ({ isViewMode, isEditMode }) => {
	const [formData, setFormData] = useAtom(formDataAtom);
	const contents = formData.contents;

	const handleContentChange = (index, e) => {
		const { name, value } = e.target;

		const newContents = contents.map((content, i) => {
			if (i === index) {
				let newValue = value;
				if (name === 'lecturesCount' || name === 'durationInHours') {
					newValue = value === '' ? '' : Number(value);
				}
				return {
					...content,
					[name]: newValue,
				};
			}
			return content;
		});
		setFormData((prev) => ({ ...prev, contents: newContents }));
	};

	const handleAddContent = () => {
		setFormData((prev) => ({
			...prev,
			contents: [
				...prev.contents,
				{ name: '', lecturesCount: '', durationInHours: '' },
			],
		}));
	};

	const handleRemoveContent = (index) => {
		const newContents = contents.filter((_, i) => i !== index);
		setFormData((prev) => ({ ...prev, contents: newContents }));
	};

	return (
		<div>
			<h2 className="text-xl font-semibold mb-4">Add Content</h2>

			<div className="space-y-6">
				{contents.map((content, index) => (
					<div
						key={index}
						className="border border-gray-200 p-4 rounded-lg bg-gray-50 relative">
						{!isViewMode && contents.length > 1 && (
							<button
								type="button"
								className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition cursor-pointer"
								onClick={() => handleRemoveContent(index)}>
								<Trash2 size={20} />
							</button>
						)}

						<div className="mb-4">
							<label htmlFor="name" className={labelClass}>
								Name
							</label>
							<input
								id="name"
								name="name"
								type="text"
								placeholder="Write here"
								value={content.name}
								onChange={(e) =>
									isViewMode ? undefined : handleContentChange(index, e)
								}
								readOnly={isViewMode}
								className={inputClass}
								required={isEditMode}
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<label htmlFor="lectures-count" className={labelClass}>
									Lectures Number
								</label>
								<input
									id="lectures-count"
									name="lecturesCount"
									type="number"
									placeholder="Write here"
									value={content.lecturesCount}
									onChange={(e) =>
										isViewMode ? undefined : handleContentChange(index, e)
									}
									readOnly={isViewMode}
									className={inputClass}
									min="1"
									required={isEditMode}
								/>
							</div>
							<div>
								<label htmlFor="duration-in-hours" className={labelClass}>
									Time (Hours)
								</label>
								<input
									id="duration-in-hours"
									name="durationInHours"
									type="number"
									placeholder="Write here"
									value={content.durationInHours}
									onChange={(e) =>
										isViewMode ? undefined : handleContentChange(index, e)
									}
									readOnly={isViewMode}
									className={inputClass}
									min="1"
									required={isEditMode}
								/>
							</div>
						</div>
					</div>
				))}
				{!isViewMode && (
					<button
						type="button"
						className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-100 transition cursor-pointer"
						onClick={handleAddContent}>
						<BadgePlus className="mr-2" size={16} />
						Add Another Content
					</button>
				)}
			</div>
		</div>
	);
};

export default StepTwo;
