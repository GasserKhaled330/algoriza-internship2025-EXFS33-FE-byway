import React from 'react';

const Popup = ({show, onClose, children}) => {
    if(!show) {
        return null;
    }
    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                {children} {/* This is where your form will go */}
            </div>
        </div>
    );
};

export default Popup;