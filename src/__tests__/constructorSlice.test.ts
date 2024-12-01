import {
  addIngredient,
  constructorSlice,
  initialState,
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient,
  resetConstructorState
} from '../services/features/constructorSlice';

const mockBun = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  id: 'bun-1'
};

const mockIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  id: 'ingredient-1'
};

const mockIngredientsNoBun = {
  bun: null,
  ingredients: [
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      id: 'id-1'
    },
    {
      _id: '643d69a5c3f7b9001cfa0945',
      name: 'Соус с шипами Антарианского плоскоходца',
      type: 'sauce',
      proteins: 101,
      fat: 99,
      carbohydrates: 100,
      calories: 100,
      price: 88,
      image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
      id: 'id-2'
    }
  ]
};

describe('constructorSlice', () => {
  it('should initialize correctly', () => {
    expect(constructorSlice.reducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  it('should add bun correctly', () => {
    const action = addIngredient(mockBun);
    const state = constructorSlice.reducer(initialState, action);
    expect(state.bun).toEqual({ ...mockBun, id: expect.any(String) });
  });

  it('should add ingredient correctly', () => {
    const action = addIngredient(mockIngredient);
    const state = constructorSlice.reducer(initialState, action);
    expect(state.ingredients).toEqual([
      { ...mockIngredient, id: expect.any(String) }
    ]);
  });

  it('should reset constructor state correctly', () => {
    const StateWithIngredients = {
      ...initialState,
      bun: mockBun,
      ingredients: mockIngredientsNoBun.ingredients
    };
    const action = resetConstructorState();
    const state = constructorSlice.reducer(StateWithIngredients, action);
    expect(state).toEqual(initialState);
  });

  it('should move ingredient up correctly', () => {
    const StateWithIngredients = {
      ...initialState,
      ingredients: mockIngredientsNoBun.ingredients
    };

    const action = moveIngredientUp(1);
    const state = constructorSlice.reducer(StateWithIngredients, action);

    expect(state.ingredients).toEqual([
      mockIngredientsNoBun.ingredients[1],
      mockIngredientsNoBun.ingredients[0]
    ]);
  });

  it('should move ingredient down correctly', () => {
    const StateWithIngredients = {
      ...initialState,
      ingredients: mockIngredientsNoBun.ingredients
    };

    const action = moveIngredientDown(0);
    const state = constructorSlice.reducer(StateWithIngredients, action);

    expect(state.ingredients).toEqual([
      mockIngredientsNoBun.ingredients[1],
      mockIngredientsNoBun.ingredients[0]
    ]);
  });

  it('should remove the ingredient correctly', () => {
    const action = removeIngredient(mockIngredientsNoBun.ingredients[0].id);
    const state = constructorSlice.reducer(mockIngredientsNoBun, action);

    expect(state.ingredients).toEqual([mockIngredientsNoBun.ingredients[1]]);
  });

  it('should not remove non exited ingredient', () => {
    const action = removeIngredient('non-existent-id');
    const state = constructorSlice.reducer(mockIngredientsNoBun, action);

    expect(state.ingredients).toEqual(mockIngredientsNoBun.ingredients);
  });
});
