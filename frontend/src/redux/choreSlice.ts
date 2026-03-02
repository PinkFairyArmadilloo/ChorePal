import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Chore } from '../types';

// ─── State shape ──────────────────────────────────────────────────────────────

interface ChoresState {
  chores: Chore[];
  loading: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ChoresState = {
  chores: [],
  loading: false,
  status: 'idle',
  error: null,
};

// ─── Thunks ───────────────────────────────────────────────────────────────────

export const fetchChores = createAsyncThunk<Chore[]>(
  'chores/fetchChores',
  async () => {
    const response = await fetch('http://localhost:3000/chores');
    if (!response.ok) throw new Error('Failed to fetch chores');
    const data = (await response.json()) as Chore[];
    return data.map((chore) => ({
      ...chore,
      status: chore.isCompleted ? ('Completed' as const) : ('Pending' as const),
    }));
  }
);

export const addChore = createAsyncThunk<Chore, Omit<Chore, '_id' | 'status'>>(
  'chores/addChore',
  async (newChore) => {
    const choreWithStatus = { ...newChore, isCompleted: false, status: 'Pending' as const };
    const response = await fetch('http://localhost:3000/chores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(choreWithStatus),
    });
    if (!response.ok) throw new Error('Failed to add chore');
    const data = (await response.json()) as Chore;
    return {
      ...data,
      status: data.isCompleted ? ('Completed' as const) : ('Pending' as const),
    };
  }
);

export const completeChore = createAsyncThunk<Chore, Chore>(
  'chores/completeChore',
  async (chore) => {
    const choreWithCompleteStatus: Chore = {
      ...chore,
      isCompleted: true,
      status: 'Completed',
    };
    const response = await fetch(`http://localhost:3000/chores/${chore._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(choreWithCompleteStatus),
    });
    if (!response.ok) throw new Error('Failed to complete chore');
    return choreWithCompleteStatus;
  }
);

export const deleteChore = createAsyncThunk<string, string>(
  'chores/deleteChore',
  async (choreId) => {
    const response = await fetch(`http://localhost:3000/chores/${choreId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete chore');
    return choreId;
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const choreSlice = createSlice({
  name: 'chores',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChores.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchChores.fulfilled, (state, action: PayloadAction<Chore[]>) => {
        state.loading = false;
        state.status = 'succeeded';
        state.chores = action.payload;
      })
      .addCase(fetchChores.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.error.message ?? 'Unknown error';
      })
      .addCase(addChore.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addChore.fulfilled, (state) => {
        state.loading = false;
        state.status = 'succeeded';
      })
      .addCase(addChore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Unknown error';
      })
      .addCase(completeChore.fulfilled, (state, action: PayloadAction<Chore>) => {
        state.status = 'succeeded';
        const updated = action.payload;
        state.chores = state.chores.map((c) =>
          c._id === updated._id ? updated : c
        );
      })
      .addCase(deleteChore.fulfilled, (state, action: PayloadAction<string>) => {
        state.chores = state.chores.filter((c) => c._id !== action.payload);
      });
  },
});

export default choreSlice.reducer;
