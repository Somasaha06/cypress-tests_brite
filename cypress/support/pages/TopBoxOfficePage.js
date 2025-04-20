class TopBoxOfficePage {
    clickSecondMovie() {
        cy.get('.ipc-metadata-list-summary-item')
            .eq(1)
            .find('a')
            .first()
            .click({ force: true });
    }
}

export default new TopBoxOfficePage();
