import React from 'react';
import { createPortal } from 'react-dom';
const Popup = ({ show, onClose, children }) => {
	if (!show) {
		return null;
	}
	return createPortal(
		<div className="popup-overlay" onClick={onClose}>
			<div className="popup-content" onClick={(e) => e.stopPropagation()}>
				<button className="close-button" onClick={onClose}>
					&times;
				</button>
				{children}
			</div>
		</div>,
		document.getElementById('popup-root')
	);
};

export default Popup;
