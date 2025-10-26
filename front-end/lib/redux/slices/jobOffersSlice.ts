import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { JobDescription, Quiz } from '@/lib/types/index';

// Stato iniziale
interface JobOffersState {
    jobOffers: JobDescription[];
    quizzes: Quiz[];
    isLoading: boolean;
    error: string | null;
    lastFetched: number | null;
}

const initialState: JobOffersState = {
    jobOffers: [],
    quizzes: [],
    isLoading: false,
    error: null,
    lastFetched: null,
};

// Thunk asincrono per recuperare job offers e quiz
export const fetchJobOffers = createAsyncThunk(
    'jobOffers/fetchJobOffers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/job-offers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Errore nel recupero delle offerte');
            }

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || 'Errore sconosciuto');
            }

            return {
                jobOffers: data.data.jobOffers,
                quizzes: data.data.quizzes,
            };
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('Errore sconosciuto nel recupero delle offerte');
        }
    }
);

// Slice
const jobOffersSlice = createSlice({
    name: 'jobOffers',
    initialState,
    reducers: {
        // Action per pulire gli errori
        clearError: (state) => {
            state.error = null;
        },
        // Action per resettare lo stato
        resetJobOffers: (state) => {
            state.jobOffers = [];
            state.quizzes = [];
            state.isLoading = false;
            state.error = null;
            state.lastFetched = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Pending
            .addCase(fetchJobOffers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            // Fulfilled
            .addCase(fetchJobOffers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.jobOffers = action.payload.jobOffers;
                state.quizzes = action.payload.quizzes;
                state.lastFetched = Date.now();
                state.error = null;
            })
            // Rejected
            .addCase(fetchJobOffers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Errore nel caricamento';
            });
    },
});

// Export actions
export const { clearError, resetJobOffers } = jobOffersSlice.actions;

// Selectors
export const selectJobOffers = (state: { jobOffers: JobOffersState }) => state.jobOffers.jobOffers;
export const selectQuizzes = (state: { jobOffers: JobOffersState }) => state.jobOffers.quizzes;
export const selectIsLoading = (state: { jobOffers: JobOffersState }) => state.jobOffers.isLoading;
export const selectError = (state: { jobOffers: JobOffersState }) => state.jobOffers.error;
export const selectLastFetched = (state: { jobOffers: JobOffersState }) => state.jobOffers.lastFetched;

// Selector per ottenere un quiz specifico per job description
export const selectQuizByJobId = (state: { jobOffers: JobOffersState }, jobDescriptionId: string) => {
    return state.jobOffers.quizzes.find(quiz => quiz.job_description_id === jobDescriptionId);
};

// Export reducer
export default jobOffersSlice.reducer;