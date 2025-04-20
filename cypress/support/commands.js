// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('acceptCookiesIfVisible', () => {
    cy.get('body', { timeout: 5000 }).then(($body) => {
        if ($body.find('[data-testid="accept-button"]').length > 0) {
            cy.get('[data-testid="accept-button"]').should('be.visible').click({ force: true });
        }
    });
});

Cypress.Commands.add('selectOptionByPartialText', (selector, partialText) => {
    cy.get(selector).then($select => {
        const options = $select.find('option');
        let matchedValue;

        options.each((index, option) => {
            const text = option.textContent.trim();
            if (text.includes(partialText)) {
                matchedValue = option.value;
                return false; // break
            }
        });

        if (matchedValue) {
            cy.get(selector).select(matchedValue);
            cy.log(`Selected option: ${matchedValue}`);
        } else {
            throw new Error(`No option containing "${partialText}" found in ${selector}`);
        }
    });
});

