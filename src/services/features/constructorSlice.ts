import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

interface IConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

export const initialState: IConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients?.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>): void => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const position = action.payload;
      if (position > 0) {
        const ingredient = state.ingredients[position];
        state.ingredients.splice(position, 1);
        state.ingredients.splice(position - 1, 0, ingredient);
      }
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const position = action.payload;
      if (position < state.ingredients.length - 1) {
        const ingredient = state.ingredients[position];
        state.ingredients.splice(position, 1);
        state.ingredients.splice(position + 1, 0, ingredient);
      }
    },
    resetConstructorState: (state) => initialState
  },
  selectors: {
    getConstructorItems: (state) => state
  }
});

export const { getConstructorItems } = constructorSlice.selectors;
export const {
  addIngredient,
  removeIngredient,
  moveIngredientDown,
  moveIngredientUp,
  resetConstructorState
} = constructorSlice.actions;
