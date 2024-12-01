describe('Modal', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000/');
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
  });

  it('Проверка открытия и закрытия модального окна ингредиента', () => {
    cy.wait('@getIngredients');
    cy.get('[data-cy="ingredient-link"]')
      .filter(':contains("Краторная булка N-200i")')
      .find('a')
      .click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal"]').should('contain', 'Краторная булка N-200i');
    cy.get('[data-cy="modal"]').find('button').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    cy.get('[data-cy="ingredient-link"]')
      .filter(':contains("Краторная булка N-200i")')
      .find('a')
      .click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal"]').should('contain', 'Краторная булка N-200i');
    cy.get('[data-cy="modal-overlay"]').click(15, 15, { force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });
});
