// Path: /vpn-app/src/features/practice/api/index.ts

import { BACKEND_ENDPOINT } from "@/src/common/constants";
import { Practice, PracticeUpdateReview } from "@/src/features/practice/types";

export const getPractices = async (): Promise<Practice[]> => {
    const response = await fetch(`${BACKEND_ENDPOINT}/practiceSession`);
    if (!response.ok)  throw new Error("Failed to fetch practices.");
    return response.json();
}

export const createPractice = async (newPractice: Practice): Promise<Practice> => {
    const response = await fetch(`${BACKEND_ENDPOINT}/practiceSession`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPractice),
    });
    if (!response.ok) throw new Error("Failed to create practice.");
    return response.json();
}

export const updatePracticeReview = async ({id, review}: PracticeUpdateReview): Promise<Practice> => {
    const response = await fetch(`${BACKEND_ENDPOINT}/practiceSession/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review }),
    });
    if (!response.ok) throw new Error("Failed to update practice review.");
    return response.json();
}

export const deletePractice = async (id: number): Promise<void> => {
    const response = await fetch(`${BACKEND_ENDPOINT}/practiceSession/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete practice.");
}
