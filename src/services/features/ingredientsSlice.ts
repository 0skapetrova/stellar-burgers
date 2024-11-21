import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getIngredientsData = createAsyncThunk(
  'ingredients/getIngredients',
  async () => {
    const data = await getIngredientsApi();
    return data;
  }
);

interface IIngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
}

export const initialState: IIngredientsState = {
  ingredients: [],
  isLoading: false
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients: (state, action: PayloadAction<TIngredient[]>): void => {
      state.ingredients = action.payload;
    }
  },
  selectors: {
    getIngredientsState: (state: IIngredientsState) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngredientsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { setIngredients } = ingredientsSlice.actions;
export const { getIngredientsState } = ingredientsSlice.selectors;
