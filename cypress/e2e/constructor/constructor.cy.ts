import { BURGER_CONSTRUCTOR_BUN, BURGER_CONSTRUCTOR_INGREDIENT } from "../constants";

describe('Order', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
  });

  it('Добавление булки из списка ингредиентов в конструктор', () => {
    cy.wait('@getIngredients');
    cy.get('[data-cy="ingredient-link"]')
      .filter(`:contains(${BURGER_CONSTRUCTOR_BUN})`)
      .find('button')
      .click();
    cy.get('[data-cy="burger-bun-top"]').contains(BURGER_CONSTRUCTOR_BUN);
  });

  it('Добавление ингредиента из списка в конструктор', () => {
    cy.wait('@getIngredients');
    cy.get('[data-cy="ingredient-link"]')
      .filter(`:contains(${BURGER_CONSTRUCTOR_INGREDIENT})`)
      .find('button')
      .click();
    cy.get('[data-cy="burger-constructor-ingredient"]').contains(
      BURGER_CONSTRUCTOR_INGREDIENT
    );
  });
});
