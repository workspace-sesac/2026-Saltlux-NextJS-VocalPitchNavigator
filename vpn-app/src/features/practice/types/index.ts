// Path: /vpn-app/src/features/practice/types/index.ts

export interface Practice {
    id: number;
    duration: number;
    review: string;
    createdAt: string;
}

export interface PracticeUpdateReview {
    id: number;
    review: string;
}
