class ActorPage {
  expandUpcoming() {
    cy.contains('Upcoming').click();
  }

  clickFirstCompletedMovie() {
    cy.get('body').then(($body) => {
      const completedElements = $body.find(':contains("Completed")');

      if (completedElements.length > 0) {
        cy.wrap(completedElements.first()).click();
      } else {
        cy.log('No "Completed" tag found in the Upcoming section.');
      }
    });
  }
}

export default new ActorPage();
