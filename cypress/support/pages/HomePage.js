class HomePage {
  open() {
    cy.visit('https://www.imdb.com');
  }

  search(term) {
    cy.get('input[name="q"]').type(`${term}{enter}`);
  }

  openMenu() {
    cy.get('#imdbHeader-navDrawerOpen').click();
  }
}

export default new HomePage();
