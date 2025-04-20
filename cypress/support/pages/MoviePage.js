class MoviePage {
    rateMovieWithFiveStars() {
        cy.contains('IMDb RATING').scrollIntoView();
        cy.contains('Rate').click();
        cy.get('.ipc-starbar__rating')  // Locate the star rating section
            .within(() => {
                // Click on the 5th star
                cy.get('button').eq(4).click({ force: true });

            });
        // Click the "Rate" button that is a span with that class
        cy.get('.ipc-rating-prompt__rating-container > .ipc-btn').click();
    }
}

export default new MoviePage();
