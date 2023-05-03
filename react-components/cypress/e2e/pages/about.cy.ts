describe('About us page', () => {
  beforeEach(() => {
    cy.visit('/about');
  });

  it('should render the page', () => {
    cy.contains(/ロレム・イプサムとは？/i).should('be.visible');
  });
});
