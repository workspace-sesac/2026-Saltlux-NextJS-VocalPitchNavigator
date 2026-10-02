// Path: /vpn-app/src/features/practice/hooks/usePracticeMutations.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Practice, PracticeUpdateReview } from "@/src/features/practice/types"
import { createPractice, updatePracticeReview, deletePractice } from "@/src/features/practice/api";

export const usePracticeMutations = () => {
    const queryClient = useQueryClient();

    const createPracticeMutation = useMutation({
        mutationFn: createPractice,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["practices"] });
        }
    });

    const updatePracticeMutation = useMutation({
        mutationFn: updatePracticeReview,
        onMutate: async (practiceUpdatedReview: PracticeUpdateReview) => {
            await queryClient.cancelQueries({ queryKey: ["practices"] });

            const previousPractices = queryClient.getQueryData<Practice[]>(["practices"]);

            queryClient.setQueryData<Practice[]>(["practices"], (oldPractices) => 
                oldPractices?.map((practice) => 
                    practice.id === practiceUpdatedReview.id ? { ...practice, review: practiceUpdatedReview.review } : practice
                )
            );

            return { previousPractices };
        },
        onError: (err, practiceUpdatedReview, context) => {
            if (context?.previousPractices) {
                queryClient.setQueryData<Practice[]>(["practices"], context.previousPractices);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["practices"] });
        }
    });

    const deletePracticeMutation = useMutation({
        mutationFn: deletePractice,
        onMutate: async (deletedId) => {
            await queryClient.cancelQueries({ queryKey: ["practices"] });
            const previousPractices = queryClient.getQueryData<Practice[]>(["practices"]);

            queryClient.setQueryData<Practice[]>(["practices"], (old) =>
                old?.filter((session) => session.id !== deletedId)
            );

            return { previousPractices };
        },
        onError: (err, newTodo, context) => {
            if (context?.previousPractices) {
                queryClient.setQueryData(["practices"], context.previousPractices);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["practices"] });
        }
    });

    return { createPracticeMutation, updatePracticeMutation, deletePracticeMutation };
};
