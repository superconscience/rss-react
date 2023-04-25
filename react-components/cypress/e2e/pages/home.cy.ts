describe('Home page', () => {
  const cardSelector = '[data-testid="product-card"]';
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render cards', () => {
    cy.get(cardSelector).should('have.length.above', 1);
  });

  it('should display "no items found" if nothing has been found', () => {
    cy.get('input').type('try to find me{enter}');
    cy.contains(/no items found/i).should('be.visible');
  });

  it('should find and render clickable cards', () => {
    cy.get('input').type('iphone{enter}');
    cy.get(cardSelector).should('have.length.above', 1);
    cy.contains(/iphone 9/i).click();
    cy.contains(/An apple mobile which is nothing like apple/i).should('be.visible');
  });

  it('should preserve search input value and found cards when leaving page', () => {
    const search = 'macbook';

    cy.debug();
    cy.get('input').type(`${search}{enter}`);
    cy.contains('a', /about us/i).click();
    cy.contains('a', /home/i).click();
    cy.get(cardSelector).should('have.length', 1);
    cy.get('input').should('have.value', search);
  });
});
