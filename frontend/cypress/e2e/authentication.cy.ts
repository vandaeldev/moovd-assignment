describe('authentication', () => {
  beforeEach(() => {
    cy.visit('auth');
    cy.task('user:clear');
  });

  it('should display login form by default', () => {
    cy.dataCy('auth-form').as('authForm').should('exist');
    cy.get('@authForm').children().should('have.length', 3);
    cy.dataCy('auth-title').contains('Welcome back!');
    cy.dataCy('auth-submit').contains('Login');
    cy.dataCy('auth-toggle').contains('Don\'t have an account yet?');
  });

  it('should not be possible to submit the login form while it\'s invalid', () => {
    cy.dataCy('auth-submit').as('authSubmit').should('be.disabled');
    cy.dataCy('auth-username').type('user');
    cy.get('@authSubmit').should('be.disabled');
    cy.dataCy('auth-password').type('pass');
    cy.get('@authSubmit').should('be.disabled');
  });

  it('should be possible to switch to the signup form', () => {
    cy.dataCy('auth-toggle').as('authToggle').click();
    cy.dataCy('auth-form').children().should('have.length', 4);
    cy.dataCy('auth-title').contains('Join us:');
    cy.dataCy('auth-submit').contains('Sign Up');
    cy.get('@authToggle').contains('I have an account');
  });

  it('should be possible to submit the signup form with nonexisting user credentials', () => {
    cy.signup();
    cy.testAuthenticated();
  });

  it('should not be possible to submit the signup form with existing user credentials', () => {
    cy.task('user:create', { email: Cypress.env('EMAIL'), username: Cypress.env('USERNAME'), password: Cypress.env('PASSWORD') });
    cy.signup();
    cy.testUnauthenticated();
  });
  cy
  it('should not be possible to login with invalid credentials', () => {
    cy.login('wronguser', 'wrongpass');
    cy.testUnauthenticated();
  });

  it('should be possible to login with valid credentials', () => {
    cy.task('user:create', { email: Cypress.env('EMAIL'), username: Cypress.env('USERNAME'), password: Cypress.env('PASSWORD') });
    cy.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD'));
    cy.testAuthenticated();
  });

  it('should be possible to logout', () => {
    cy.task('user:create', { email: Cypress.env('EMAIL'), username: Cypress.env('USERNAME'), password: Cypress.env('PASSWORD') });
    cy.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD'));
    cy.dataCy('logout').click();
    cy.testUnauthenticated();
  });
})
