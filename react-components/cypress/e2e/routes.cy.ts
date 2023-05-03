describe('Routes', () => {
  it('should correctly render pages by routes', () => {
    cy.visit('/');
    cy.get('[data-testid="home-page"]').should('be.visible');

    const links = [
      { text: /about us/i, href: '/about' },
      { text: /users/i, href: '/users' },
    ];

    links.forEach(({ text, href }) => {
      cy.contains('a', text).should('be.visible');
      cy.contains('a', text).click();
      cy.url().should('include', href);
    });
  });

  it('should render 404 for invalid routes', () => {
    cy.visit('/invalid');
    cy.contains(/page not found/i).should('be.visible');
  });
});
