class MoviePage {
    rateMovieWithStars(stars) {
        cy.contains('IMDb RATING').scrollIntoView();
        cy.contains('Rate').click();

        cy.get('.ipc-starbar__rating').within(() => {
            cy.get('button').eq(stars - 1).click({ force: true });
        });

        cy.get('.ipc-rating-prompt__rating-container > .ipc-btn').click();
    }
}

export default new MoviePage();
