// /app/src/features/practice/components/reviewer/Reviewer.tsx

import { useState } from "react";

interface ReviewerProps {
  onSave: (review: string) => void;
  isPending: boolean;
}

export default function Reviewer({ onSave, isPending }: ReviewerProps) {
  const [review, setReview] = useState<string>("");

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
      <label className="font-bold text-gray-800">연습 후기</label>
      <textarea
        className="w-full bg-gray-50 p-4 rounded-xl border border-gray-200 outline-none focus:border-blue-400 focus:bg-white transition h-32 resize-none"
        placeholder="연습 후기를 작성해보세요."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <button
        onClick={() => onSave(review)}
        disabled={isPending}
        className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition disabled:bg-gray-300"
      >
        {isPending ? "저장 중..." : "기록 저장하기"}
      </button>
    </div>
  );
};
