describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render cards', () => {
    cy.get('[data-testid="product-card"]').should('have.length', 100);
  });

  // it('should have "Not found" text if nothing was found', () => {
  //   cy.get('input').type('some nonexistent data{enter}');
  //   cy.get('h1').should('include.text', 'not found');
  // });

  // it('should find existent data and render clickable cards', () => {
  //   cy.get('input').type('cats{enter}');
  //   cy.get('[data-testid="card"]').should('have.length.above', 1);
  //   cy.contains('My little Princess').click();
  //   cy.contains('Uploaded').should('be.visible');
  //   cy.contains('Tags').should('be.visible');
  // });

  // it('should save input and cards state between pages', () => {
  //   const query = 'some nonexistent data';

  //   cy.get('input').type(`${query}{enter}`);
  //   cy.get('[data-testid="header-link-about"]').click();
  //   cy.get('[data-testid="header-link-home"]').click();
  //   cy.get('h1').should('include.text', 'not found');
  //   cy.get('input').should('have.value', query);
  // });
});
