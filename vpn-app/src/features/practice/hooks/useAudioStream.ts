// Path: /vpn-app/src/features/practice/hooks/useAudioStream.ts

import { useEffect, useRef, RefObject } from "react";
import { VOCAL_ANALYSIS_CONFIG } from "@/src/features/practice/constants";
import { calculateVolume } from "@/src/features/practice/utils/rmsCalculator";
import { frequencyToNote } from "@/src/features/practice/utils/pitchCalculator";
import { AMDF } from "pitchfinder";

interface VisualizerRefs {
    audioContext: AudioContext | null;
    analyser: AnalyserNode | null;
    animation: number | null;
    pitchFinder: ((dataArray: Float32Array) => number | null) | null;
}

// TypeScript 호환성을 위한 Window 전역 인터페이스 확장
declare global {
    interface Window {
        webkitAudioContext: typeof AudioContext;
    }
}

export const useAudioVisualizer = (
    stream: MediaStream | null,
    volumeRef: RefObject<HTMLDivElement | null>,
    pitchRef: RefObject<HTMLDivElement | null>,
) => {
    const refs = useRef<VisualizerRefs>({
        audioContext: null,
        analyser: null,
        animation: null,
        pitchFinder: null
    });

    useEffect(() => {
        // 스트림 데이터가 없다면 리소스를 초기화하고, DOM을 기본 값으로 초기화
        if (!stream) {
            if (refs.current.animation) cancelAnimationFrame(refs.current.animation);
            if (refs.current.audioContext?.state !== "closed") {
                refs.current.audioContext?.close();
            }

            if (volumeRef.current) volumeRef.current.style.width = "0%";
            if (pitchRef.current) pitchRef.current.innerText = "";

            return;
        }

        // 스트림 데이터가 있다면 오디오 분석 파이프라인 수행
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = VOCAL_ANALYSIS_CONFIG.FFT_AUDIO_SAMPLES;

        const audioSource = audioContext.createMediaStreamSource(stream);
        audioSource.connect(analyser);

        refs.current.audioContext = audioContext;
        refs.current.analyser = analyser;
        refs.current.pitchFinder = AMDF({ sampleRate: audioContext.sampleRate });

        const dataArray = new Float32Array(analyser.fftSize);

        const updateDOM = () => {
            analyser.getFloatTimeDomainData(dataArray);

            const currentVolume = calculateVolume(dataArray);

            if (volumeRef.current) {
                volumeRef.current.style.width = `${currentVolume}%`;
            }

            const currentFrequency = refs.current.pitchFinder ? refs.current.pitchFinder(dataArray) : null;
            const currentPitch = currentFrequency && currentVolume > VOCAL_ANALYSIS_CONFIG.MINIMUM_THRESHOLD ? frequencyToNote(currentFrequency) : "";

            if (pitchRef.current) {
                pitchRef.current.innerText = currentPitch;
            }

            refs.current.animation = requestAnimationFrame(updateDOM);
        };

        updateDOM();

        return () => {
            if (refs.current.animation) cancelAnimationFrame(refs.current.animation);
            if (refs.current.audioContext?.state !== "closed") {
                refs.current.audioContext?.close();
            }
        };
    }, [stream, volumeRef, pitchRef]);
};