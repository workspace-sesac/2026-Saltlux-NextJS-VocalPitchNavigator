// /app/src/features/practice/components/visualizer/Visualizer.tsx

import { RefObject } from "react";
import { formatTimestamp } from "../../utils/timeFormatter";

interface VisualizerProps {
  pitchRef: RefObject<HTMLDivElement | null>;
  volumeRef: RefObject<HTMLDivElement | null>;
  seconds: number;
}

export default function Visualizer({ pitchRef, volumeRef, seconds }: VisualizerProps) {
  return (
    <div className="w-full max-w-xs mb-8 flex flex-col items-center gap-4">
      <div
        ref={pitchRef}
        className="text-5xl font-black text-gray-800 min-w-[3ch] text-center tracking-tighter"
      >
        --
      </div>
      <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
        <div
          ref={volumeRef}
          className="h-full bg-blue-500 transition-all duration-75 ease-linear"
          style={{ width: "0%" }}
        />
      </div>
      <div className="text-4xl font-mono font-bold text-blue-600 tracking-wider mt-4">
        {formatTimestamp(seconds)}
      </div>
    </div>
  );
};
