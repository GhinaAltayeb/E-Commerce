import React, { useEffect, useState } from "react";

function useDebounce(value, delay = 1000) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeId = setTimeout(() => { 
            setDebouncedValue(value)
        }, delay);

        return () => clearTimeout(timeId);
    }, [value,delay]);

    return debouncedValue;
}

export default useDebounce;
