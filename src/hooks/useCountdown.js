import { useState, useEffect, useCallback } from 'react';

const useCountdown = (initialTime) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    // Reset the countdown timer to the initial time without restarting it
    const reset = useCallback(() => {
        setTimeLeft(initialTime);
    }, [initialTime]);

    // Restart the countdown, which also resets it to initial time
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

        // Cleanup interval on component unmount or timer change
        return () => clearInterval(interval);
    }, [timeLeft]);

    // Function to format the time remaining as MM:SS
    const formattedTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    // Return the formatted time as a string and the reset/restart functions
    return { 
        formattedTime: formattedTime(),  // Return the formatted string directly
        reset,   // Expose reset function to reset the countdown
        restart  // Expose restart function to restart the countdown
    };
};

export default useCountdown;
