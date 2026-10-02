// Path: /vpn-app/src/features/practice/utils.pitchCalculator.ts

import { VOCAL_ANALYSIS_CONFIG, CHROMATIC_SCALE_NOTES } from "@/src/features/practice/constants";

export const frequencyToNote = (frequency: number): string => {
    if (!frequency || frequency < 0) return "";

    // 주파수를 MIDI 음계로 변환하는 수식
    const midiNote = Math.round(12 * Math.log2(frequency / VOCAL_ANALYSIS_CONFIG.MAXIMUM_FREQUENCY) + 69);
    if (midiNote < 0 || midiNote > 127) return "";

    const currentNote = CHROMATIC_SCALE_NOTES[midiNote % 12];
    const currentOctave = Math.floor(midiNote / 12) - 1;

    return `${currentOctave}옥타브 ${currentNote}`;
}
