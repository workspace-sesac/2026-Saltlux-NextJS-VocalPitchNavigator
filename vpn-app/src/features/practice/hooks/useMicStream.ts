// Path: /vpn-app/src/features/practice/hooks/useMicStream.ts

import { useState, useEffect, useRef, useCallback } from "react";

export const useMicStream = () => {
    const [isRecording, setIsRecording] = useState<boolean>(false);

    const streamRef = useRef<MediaStream | null>(null); // Stream 객체는 Rerendering이 필요 없으므로 useRef로 관리
    const micStreamStart = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            streamRef.current = stream;
            setIsRecording(true);
        } catch (error) {
            console.error("Mic stream start failed:", error);
            alert("Mic access is required to use this feature.");
            setIsRecording(false);
        }
    }, []);

    const micStreamStop = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
        setIsRecording(false);
    }, []);

    useEffect(() => {
        return () => micStreamStop();
    }, [micStreamStop]);

    return { isRecording, stream: streamRef.current, micStreamStart, micStreamStop };
};