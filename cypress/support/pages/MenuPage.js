class MenuPage {
    goToTopBoxOffice() {
      cy.contains('Box Office').click();
    }
  
    goToTopTVShows() {
      cy.contains('Top 250 TV Shows').click();
    }
  
    goToBornToday() {
        cy.contains('a', 'Born Today').click({ force: true });

    }
  }
  
  export default new MenuPage();
  