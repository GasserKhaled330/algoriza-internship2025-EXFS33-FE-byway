import React from 'react';
import { useAtom } from 'jotai';
import { formDataAtom } from '../../../Atoms/courseAtoms';
import { Trash2, BadgePlus } from 'lucide-react';

const inputClass =
	'w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500';
const labelClass = 'block text-sm font-medium text-gray-700 mb-1';

const StepTwo = () => {
	const [formData, setFormData] = useAtom(formDataAtom);
	const contents = formData.contents;

	const handleContentChange = (index, e) => {
		const { name, value } = e.target;
		const newContents = contents.map((content, i) => {
			if (i === index) {
				return {
					...content,
					[name]:
						name === 'lecturesNumber' || name === 'time'
							? Number(value)
							: value,
				};
			}
			return content;
		});
		setFormData((prev) => ({ ...prev, contents: newContents }));
	};

	const handleAddContent = () => {
		setFormData((prev) => ({
			...prev,
			contents: [...prev.contents, { name: '', lecturesNumber: 0, time: 0 }],
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
						{/* Remove Button */}
						{contents.length > 1 && (
							<button
								type="button"
								className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition"
								onClick={() => handleRemoveContent(index)}>
								<Trash2 className="w-5 h-5" />
							</button>
						)}

						{/* Content Name */}
						<div className="mb-4">
							<label className={labelClass}>Name</label>
							<input
								name="name"
								type="text"
								placeholder="Write here"
								value={content.name}
								onChange={(e) => handleContentChange(index, e)}
								className={inputClass}
								required
							/>
						</div>

						{/* Lectures Number and Time */}
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className={labelClass}>Lectures Number</label>
								<input
									name="lecturesNumber"
									type="number"
									placeholder="Write here"
									value={content.lecturesNumber}
									onChange={(e) => handleContentChange(index, e)}
									className={inputClass}
									min="0"
									required
								/>
							</div>
							<div>
								<label className={labelClass}>Time (Hours)</label>
								<input
									name="time"
									type="number"
									placeholder="Write here"
									value={content.time}
									onChange={(e) => handleContentChange(index, e)}
									className={inputClass}
									min="0"
									required
								/>
							</div>
						</div>
					</div>
				))}

				{/* Add Another Content Button */}
				<button
					type="button"
					className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-100 transition cursor-pointer"
					onClick={handleAddContent}>
					<BadgePlus className="w-4 h-4 mr-2" />
					Add Another Content
				</button>
			</div>
		</div>
	);
};

export default StepTwo;
