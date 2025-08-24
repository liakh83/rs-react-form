import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type FormData } from '../types/interface';

interface FormsState {
  submissions: FormData[];
  countries: string[];
}

const initialState: FormsState = {
  submissions: [],
  countries: [
    'Netherlands',
    'USA',
    'Germany',
    'Poland',
    'Japan',
    'China',
    'Russia',
    'Italy',
    'France',
  ],
};

export const sliceForms = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addSubmission: (state, action: PayloadAction<FormData>) => {
      state.submissions.push(action.payload);
    },
  },
});

export const { addSubmission } = sliceForms.actions;
