// Path: /vpn-app/src/features/practice/utils/rmsCalculator.ts

export const calculateVolume = (audioBuffer: Float32Array): number => {
    let sumSquares = 0;

    for (const amplitude of audioBuffer) {
        sumSquares += amplitude * amplitude;
    }

    const rootMeanSquare = Math.sqrt(sumSquares / audioBuffer.length);

    return Math.min(Math.round(rootMeanSquare * 100), 100);
}
