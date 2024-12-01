import { BURGER_CONSTRUCTOR_BUN } from "../constants";

describe('Modal', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
  });

  it('Проверка открытия и закрытия модального окна ингредиента', () => {
    cy.wait('@getIngredients');
    cy.get('[data-cy="ingredient-link"]')
      .filter(`:contains(${BURGER_CONSTRUCTOR_BUN})`)
      .find('a')
      .click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal"]').should('contain', `${BURGER_CONSTRUCTOR_BUN}`);
    cy.get('[data-cy="modal"]').find('button').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    cy.get('[data-cy="ingredient-link"]')
      .filter(`:contains(${BURGER_CONSTRUCTOR_BUN})`)
      .find('a')
      .click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal"]').should('contain', `${BURGER_CONSTRUCTOR_BUN}`);
    cy.get('[data-cy="modal-overlay"]').click(15, 15, { force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });
});
