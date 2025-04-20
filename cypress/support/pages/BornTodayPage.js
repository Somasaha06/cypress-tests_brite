class BornTodayPage {
    clearSearch() {
        cy.get('[data-testid="chip-list-test-id"]').click();
    }

    selectBirthdayOption(optionText) {
        cy.contains('Birthday').click();
        cy.get('[name="birthday-input"]').click();
        cy.get('[name="birthday-input"]')
            .should('be.visible')
            .then(($input) => {
                const nativeInput = $input[0];
                nativeInput.value = optionText;

                // Trigger events manually
                nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
                nativeInput.dispatchEvent(new Event('change', { bubbles: true }));
            });
        // Simulate Enter keypress on body to trigger validation
        cy.get('body').type('{enter}');

        cy.contains('span', 'See results')
            .should('be.visible')
            .click();
    }

    clickThirdLink(n) {
        cy.get('.ipc-metadata-list .ipc-metadata-list-summary-item')
            .eq(n)
            .find('a')
            .first() // select the first one
            .scrollIntoView()
            .should('be.visible')
            .click();
    }
    selectBirthDate(day, month, year) {
        const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        cy.contains('Birth date').click();

        cy.get('[data-testid="birthDate-start"]')
            .invoke('removeAttr', 'type') // allow typing into the input
            .clear()
            .type(`${formattedDate}{enter}`, { force: true })
            .trigger('change');


        // Click "See results" once input is updated
        cy.contains('button', 'See results').should('be.enabled').click();
    }


    clickFirstLinkInDescription(n) {
        cy.get('.ipc-metadata-list .ipc-metadata-list-summary-item')
            .eq(n)
            .find('a')
            .first() // select the first one
            .scrollIntoView()
            .should('be.visible')
            .click();
    }
}

export default new BornTodayPage();
