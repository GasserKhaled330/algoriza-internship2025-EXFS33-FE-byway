import { useState, useEffect } from 'react';

export function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Set a timer to update the debounced value
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Clean up the timer if the value changes or the component unmounts
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]); // Rerun effect when value or delay changes

    return debouncedValue;
}