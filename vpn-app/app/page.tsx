// Path: /vpn-app/app/page.tsx

"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Practice } from "@/src/features/practice/types";
import { getPractices } from "@/src/features/practice/api";
import { usePracticeMutations } from "@/src/features/practice/hooks/usePracticeMutations";
import { formatTimestamp } from "@/src/features/practice/utils/timeFormatter";

export default function Home() {
  const { data: practices, isLoading, isError } = useQuery<Practice[]>({
    queryKey: ["practices"],
    queryFn: getPractices,
  });

  const { deletePracticeMutation, updatePracticeMutation } = usePracticeMutations();

  const handleDelete = (id: number) => {
    if (window.confirm("이 연습 기록을 삭제하시겠습니까?")) {
      deletePracticeMutation.mutate(id);
    }
  };

  const handleEdit = (id: number, currentReview: string) => {
    const newReview = window.prompt("수정할 내용을 입력하세요:", currentReview);

    if (newReview !== null && newReview.trim() !== "") {
      updatePracticeMutation.mutate({ id, review: newReview });
    }
  };

  if (isLoading) return <div className="mt-8 text-center text-gray-500">데이터를 불러오는 중...</div>;
  if (isError) return <div className="mt-8 text-center text-red-500">데이터를 불러오는데 실패했습니다.</div>;

  return (
    <div className="mt-8 flex flex-col gap-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold">내 연습 기록</h2>
        <Link href="/features/practice" className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition">
          새 연습 시작하기
        </Link>
      </div>

      {!practices || practices.length === 0 ? (
        <div className="mt-12 flex flex-col items-center text-center text-gray-500 bg-white dark:bg-zinc-900 p-12 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
          <p className="mb-4 text-lg">아직 기록된 연습이 없습니다.</p>
          <p className="text-sm">버튼을 눌러 첫 발성 연습을 시작해보세요!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {[...practices].reverse().map((practice) => (
            <div key={practice.id} className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-3 group relative">
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex gap-4">
                  <span>📅 {new Date(practice.createdAt).toLocaleDateString()}</span>
                  <span>⏱️ {formatTimestamp(practice.duration)}</span>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(practice.id, practice.review)} className="text-blue-500 text-xs bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded transition">
                    수정
                  </button>
                  <button onClick={() => handleDelete(practice.id)} className="text-red-500 text-xs bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded transition">
                    삭제
                  </button>
                </div>
              </div>
              <p className="text-gray-800 dark:text-gray-200 mt-2 whitespace-pre-wrap">{practice.review}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
