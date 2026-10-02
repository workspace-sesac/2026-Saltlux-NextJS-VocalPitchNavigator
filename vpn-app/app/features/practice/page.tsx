// Path: /vpn-app/app/features/practice/page.tsx

"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMicStream } from "@/src/features/practice/hooks/useMicStream";
import { useAudioVisualizer } from "@/src/features/practice/hooks/useAudioStream";
import { usePracticeTimer } from "@/src/features/practice/hooks/usePracticeTimer";
import { usePracticeMutations } from "@/src/features/practice/hooks/usePracticeMutations";
import { Visualizer } from "@/src/features/practice/components/visualizer";
import { Reviewer } from "@/src/features/practice/components/reviewer";

export default function PracticePage() {
  const router = useRouter();
  const volumeRef = useRef<HTMLDivElement>(null);
  const pitchRef = useRef<HTMLDivElement>(null);

  const { isRecording, stream, micStreamStart, micStreamStop } = useMicStream();
  useAudioVisualizer(stream, volumeRef, pitchRef);
  
  const seconds = usePracticeTimer(isRecording);
  const { createPracticeMutation } = usePracticeMutations();

  const handleToggleRecording = () => {
    isRecording ? micStreamStop() : micStreamStart();
  };

  const handleSaveSession = async (reviewText: string) => {
    if (seconds === 0) {
      alert("연습 시간이 기록되지 않았습니다.");
      return;
    }

    if (isRecording) micStreamStop();

    try {
      await createPracticeMutation.mutateAsync({
        id: Date.now(),
        duration: seconds,
        review: reviewText,
        createdAt: new Date().toISOString(),
      });

      router.push("/");
    } catch {
      alert("연습 기록 저장에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col gap-6 mt-4 pb-10">
      <Link href="/" className="text-blue-600 hover:underline w-fit mb-2">
        ← 메인으로 돌아가기
      </Link>

      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2">
          {isRecording ? "🔴 현재 녹음 중" : "⚪ 연습 대기 중"}
        </h2>
        <p className="text-gray-500 mb-8 text-sm text-center">
          마이크 아이콘을 눌러 연습을 시작하세요.
        </p>

        <Visualizer pitchRef={pitchRef} volumeRef={volumeRef} seconds={seconds} />

        <button
          onClick={handleToggleRecording}
          className={`mt-6 flex items-center justify-center w-20 h-20 rounded-full font-bold text-white transition-all shadow-lg ${
            isRecording 
              ? "bg-red-500 hover:bg-red-600 animate-pulse" 
              : "bg-gray-900 hover:bg-black dark:bg-gray-100 dark:hover:bg-white dark:text-black"
          }`}>
          {isRecording ? "중지" : "시작"}
        </button>
      </div>

      <Reviewer onSave={handleSaveSession} isPending={createPracticeMutation.isPending} />
    </div>
  );
}
