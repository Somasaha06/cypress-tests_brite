class SearchPage {
    clickFirstResult(name) {
        cy.contains(name).first().click();
    }
}

export default new SearchPage();
