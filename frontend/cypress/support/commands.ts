declare namespace Cypress {
  interface Chainable<Subject = any> {
    dataCy(selector: string, options?: Parameters<typeof cy.get>[1]): Chainable<JQuery<HTMLElement>>;
    dataCyLike(selector: string, options?: Parameters<typeof cy.get>[1]): Chainable<JQuery<HTMLElement>>;
    login(username: string, password: string): Chainable<Subject>;
    signup(): Chainable<Subject>;
    testAuthenticated(): Chainable<Subject>;
    testUnauthenticated(): Chainable<Subject>;
  }
}

Cypress.Commands.add('dataCy', (selector, options) => cy.get(`[data-cy="${selector}"]`, options));
Cypress.Commands.add('dataCyLike', (selector, options) => cy.get(`[data-cy*="${selector}"]`, options));

Cypress.Commands.add('login', (username, password) => {
  cy.visit('auth');
  cy.dataCy('auth-username').type(username);
  cy.dataCy('auth-password').type(password);
  cy.dataCy('auth-submit').click();
});
Cypress.Commands.add('signup', () => {
  cy.visit('auth');
  cy.dataCy('auth-toggle').click();
  cy.dataCy('auth-email').type(Cypress.env('EMAIL'));
  cy.dataCy('auth-username').type(Cypress.env('USERNAME'));
  cy.dataCy('auth-password').type(Cypress.env('PASSWORD'));
  cy.dataCy('auth-submit').click();
});

Cypress.Commands.add('testAuthenticated', () => {
  const url = Cypress.config().baseUrl?.replace(/\/(?!.*\1)$/, '');
  cy.url().should('eq', `${url}/activity`);
  cy.getAllSessionStorage().then(storage => {
    expect(storage[url]).to.have.keys('token', 'isLoggedIn');
  });
  cy.dataCy('logout').should('exist');
});
Cypress.Commands.add('testUnauthenticated', () => {
  const url = Cypress.config().baseUrl?.replace(/\/(?!.*\1)$/, '');
  cy.url().should('eq', `${url}/auth`);
  cy.getAllSessionStorage().then(storage => {
    expect(storage).to.not.have.key(url);
  });
  cy.dataCy('logout').should('not.exist');
});
