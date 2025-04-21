class TopTVShowsPage {

  clickShow(showName) {
    cy.contains('a', showName, { matchCase: false })
      .should('be.visible')
      .click({ force: true });
  }

  clickBreakingBad() {
    cy.contains('Breaking Bad').click();
  }

  goToPhotos() {
    cy.contains('Photos').click();
  }

  openPhotoGallery() {
    cy.get('[data-testid="mv-gallery-button"]')
      .should('be.visible')
      .click();
  }

  filterPhotosBy(partialName) {
    cy.get('[data-testid="image-chip-dropdown-test-id"]')
      .should('be.visible')
      .click();
    cy.get('select#Person-filter-select-dropdown', { timeout: 10000 })
      .scrollIntoView()
      .should('exist')
    cy.selectOptionByPartialText('select#Person-filter-select-dropdown', partialName);
    cy.get('button[aria-pressed="true"]')
      .should('be.visible')
    // Close the dropdown modal after selecting
    cy.get('button[title="Close Prompt"]')
      .should('be.visible')
      .click();
  }

  clickSecondPhoto() {
    cy.get("section[data-testid='sub-section-images'] img")
      .should('have.length.greaterThan', 1)
      .eq(1)
      .scrollIntoView()
      .should('be.visible')
      .click();
  }
}

export default new TopTVShowsPage();
