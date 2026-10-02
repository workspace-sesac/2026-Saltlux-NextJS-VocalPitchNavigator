// Path: /vpn-app/src/features/practice/hooks/usePracticeTimer.ts

import { useState, useEffect, useRef } from "react";

export const usePracticeTimer = (isRecording: boolean) => {
    const [seconds, setSeconds] = useState<number>(0);
    const startTimeRef = useRef<number>(0);
    const elapsedRef = useRef<number>(0); 

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isRecording) {
            startTimeRef.current = Date.now() - (elapsedRef.current * 1000);

            interval = setInterval(() => {
                const newElapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
                elapsedRef.current = newElapsed;
                setSeconds(newElapsed);
            }, 200);
        } else {
            if (interval) clearInterval(interval);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRecording]);

    return seconds;
};
