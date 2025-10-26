// features/auth/authSlice.ts
import { Candidate } from '@/lib/types/candidate';
import { Company } from '@/lib/types/company';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

type UserType = 'company' | 'candidate';

interface AuthState {
    isAuthenticated: boolean;
    user: (Omit<Company, 'password'> | Omit<Candidate, 'password'>) | null;
    userType: UserType | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    userType: null,
    loading: false,
    error: null,
};

// Thunk per il login Company
export const loginCompany = createAsyncThunk(
    'auth/loginCompany',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/auth/login-company', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || 'Login fallito');
            }

            return { user: data.user, userType: 'company' as UserType };
        } catch (error: any) {
            return rejectWithValue(error.message || 'Errore di connessione');
        }
    }
);

// Thunk per il login Candidate
export const loginCandidate = createAsyncThunk(
    'auth/loginCandidate',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/auth/login-candidate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || 'Login fallito');
            }

            return { user: data.user, userType: 'candidate' as UserType };
        } catch (error: any) {
            return rejectWithValue(error.message || 'Errore di connessione');
        }
    }
);

// Thunk per la registrazione Company
export const registerCompany = createAsyncThunk(
    'auth/registerCompany',
    async (userData: Omit<Company, 'id'>, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/auth/register-company', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || 'Registrazione fallita');
            }

            return { user: data.user, userType: 'company' as UserType };
        } catch (error: any) {
            return rejectWithValue(error.message || 'Errore di connessione');
        }
    }
);

// Thunk per la registrazione Candidate
export const registerCandidate = createAsyncThunk(
    'auth/registerCandidate',
    async (userData: Omit<Candidate, "id">, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/auth/register-candidate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || 'Registrazione fallita');
            }

            return { user: data.user, userType: 'candidate' as UserType };
        } catch (error: any) {
            return rejectWithValue(error.message || 'Errore di connessione');
        }
    }
);

// Thunk per verificare la sessione
export const checkSession = createAsyncThunk(
    'auth/checkSession',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/auth/session');
            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue('Sessione non valida');
            }

            return { user: data.user, userType: data.userType };
        } catch (error: any) {
            return rejectWithValue(error.message || 'Errore di connessione');
        }
    }
);

// Thunk per il logout
export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
            });

            if (!response.ok) {
                return rejectWithValue('Logout fallito');
            }

            return null;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Errore di connessione');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        resetAuth: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.userType = null;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        // Helper per gestire gli stati comuni
        const handlePending = (state: AuthState) => {
            state.loading = true;
            state.error = null;
        };

        const handleFulfilled = (
            state: AuthState,
            action: PayloadAction<{ user: any; userType: UserType }>
        ) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.userType = action.payload.userType;
            state.error = null;
        };

        const handleRejected = (state: AuthState, action: any) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.userType = null;
            state.error = action.payload as string;
        };

        // Login Company
        builder
            .addCase(loginCompany.pending, handlePending)
            .addCase(loginCompany.fulfilled, handleFulfilled)
            .addCase(loginCompany.rejected, handleRejected);

        // Login Candidate
        builder
            .addCase(loginCandidate.pending, handlePending)
            .addCase(loginCandidate.fulfilled, handleFulfilled)
            .addCase(loginCandidate.rejected, handleRejected);

        // Register Company
        builder
            .addCase(registerCompany.pending, handlePending)
            .addCase(registerCompany.fulfilled, handleFulfilled)
            .addCase(registerCompany.rejected, handleRejected);

        // Register Candidate
        builder
            .addCase(registerCandidate.pending, handlePending)
            .addCase(registerCandidate.fulfilled, handleFulfilled)
            .addCase(registerCandidate.rejected, handleRejected);

        // Check Session
        builder
            .addCase(checkSession.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkSession.fulfilled, handleFulfilled)
            .addCase(checkSession.rejected, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.userType = null;
            });

        // Logout
        builder
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.userType = null;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearError, resetAuth } = authSlice.actions;
export default authSlice.reducer;

// Selettori
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectUserType = (state: { auth: AuthState }) => state.auth.userType;
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;

// Selettori helper per verificare il tipo di utente
export const selectIsCompany = (state: { auth: AuthState }) => state.auth.userType === 'company';
export const selectIsCandidate = (state: { auth: AuthState }) => state.auth.userType === 'candidate';