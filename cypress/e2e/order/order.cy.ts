describe('Order', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    }).as('getUserData');

    cy.intercept('POST', 'api/orders', {
      fixture: 'order.json'
    }).as('postOrder');

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');

    cy.visit('http://localhost:4000/');
  });

  afterEach(() => {
    window.localStorage.removeItem('refreshToken');
    cy.clearCookie('accessToken');
  });

  it('проверка оформления заказа', () => {
    cy.wait('@getIngredients');
    cy.get('[data-cy="ingredient-link"]')
      .filter(':contains("Краторная булка N-200i")')
      .find('button')
      .click();
    cy.get('[data-cy="ingredient-link"]')
      .filter(':contains("Биокотлета из марсианской Магнолии")')
      .find('button')
      .click();
    cy.get('[data-cy="burger-constructor"]')
      .find('button')
      .contains('Оформить заказ')
      .click();
    cy.wait('@getUserData');
    cy.wait('@postOrder');
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal"]').should('contain', '61036');
    cy.get('[data-cy="modal"]').find('button').click();
    cy.get('[data-cy="modal"]').should('not.exist');
    cy.get('[data-cy="no-buns-top"]').should('exist');
    cy.get('[data-cy="no-buns-bottom"]').should('exist');
    cy.get('[data-cy="no-ingredients"]').should('exist');
  });
});
