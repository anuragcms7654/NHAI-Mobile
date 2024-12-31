import { useState, useEffect, useCallback } from 'react';

const useCountdown = (initialTime) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    const reset = useCallback(() => {
        setTimeLeft(initialTime);
    }, [initialTime]);

    const restart = useCallback(() => {
        setTimeLeft(initialTime);
    }, [initialTime]);

    useEffect(() => {
        if (timeLeft <= 0) {
            return;
        }

        // Update the timer every second
        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);

    const formattedTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return { 
        timeLeft,    // Return the raw timeLeft for comparison
        formattedTime: formattedTime(),   // Return the formatted string
        reset,       // Expose reset function
        restart      // Expose restart function
    };
};

export default useCountdown;
