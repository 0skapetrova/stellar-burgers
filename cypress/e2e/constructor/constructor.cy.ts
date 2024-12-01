describe('Order', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000/');
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
  });

  it('Добавление булки из списка ингредиентов в конструктор', () => {
    cy.wait('@getIngredients');
    cy.get('[data-cy="ingredient-link"]')
      .filter(':contains("Краторная булка N-200i")')
      .find('button')
      .click();
    cy.get('[data-cy="burger-bun-top"]').contains('Краторная булка N-200i');
  });

  it('Добавление ингредиента из списка в конструктор', () => {
    cy.wait('@getIngredients');
    cy.get('[data-cy="ingredient-link"]')
      .filter(':contains("Биокотлета из марсианской Магнолии")')
      .find('button')
      .click();
    cy.get('[data-cy="burger-constructor-ingredient"]').contains(
      'Биокотлета из марсианской Магнолии'
    );
  });
});
