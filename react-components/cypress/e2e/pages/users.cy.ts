describe('Users page', () => {
  beforeEach(() => {
    cy.visit('/users');
  });

  it('should contain a form', () => {
    cy.get('form').should('be.visible');
  });

  it('should submit form, add a card and preserve it when leaving page', () => {
    const name = 'Name';
    const lastName = 'Lastname';
    const email = 'test@example.com';
    const birthdate = '2000-01-01';
    const country = 'Latvia';
    const city = 'Riga';
    const zip = '10000';

    cy.get('[name="name"]').type(name);
    cy.get('[name="lastName"]').type(lastName);
    cy.get('[name="email"]').type(email);
    cy.get('[name="birthdate"]').type(birthdate);
    cy.get('[name="state"]').select(country);
    cy.get('[name="city"]').type(city);
    cy.get('[name="zip"]').type(zip);
    cy.get('[type="radio"][value="male"]+label').click();
    cy.get('[name="agree"]+label').click();
    cy.get('input[type="file"]').selectFile('public/test.jpg');
    cy.contains('button', /register/i).click();

    cy.get('[data-testid="user-card"]').within(() => {
      cy.contains(name).should('be.visible');
      cy.contains(lastName).should('be.visible');
      cy.contains(/male/i).should('be.visible');
      cy.contains(country).should('be.visible');
      cy.contains(city).should('be.visible');
      cy.contains(zip).should('be.visible');
      cy.get('img').should('be.visible');
    });

    cy.contains('a', /about us/i).click();
    cy.contains('a', /users/i).click();
    cy.get('[data-testid="user-card"]').should('have.length', 1);
  });

  it('should display validation errors', () => {
    cy.contains('button', /register/i).click();

    cy.contains(/name is required/i).should('be.visible');
    cy.contains(/last name is required/i).should('be.visible');
    cy.contains(/email is required/i).should('be.visible');
    cy.contains(/birth date is required/i).should('be.visible');
    cy.contains(/state is required/i).should('be.visible');
    cy.contains(/city is required/i).should('be.visible');
    cy.contains(/zip is required/i).should('be.visible');
    cy.contains(/image is required/i).should('be.visible');
  });
});
