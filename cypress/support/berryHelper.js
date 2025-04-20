export function requestBerryById(id) {
    return cy.request(`https://pokeapi.co/api/v2/berry/${id}/`);
}

export function requestBerryByName(name) {
    return cy.request(`https://pokeapi.co/api/v2/berry/${name}/`);
}

export function requestBerryFlavor(flavor) {
    return cy.request(`https://pokeapi.co/api/v2/berry-flavor/${flavor}/`);
}

export function findMostPotentBerry(spicyBerries) {
    const berryDetails = [];

    // Use cy.wrap() to ensure the chain is handled correctly
    return cy.wrap(spicyBerries).each((name) => {
        requestBerryByName(name).then((res) => {
            const spicyFlavor = res.body.flavors.find(f => f.flavor.name === 'spicy');
            if (spicyFlavor && typeof spicyFlavor.potency === 'number') {
                berryDetails.push({
                    name: res.body.name,
                    potency: spicyFlavor.potency
                });
            }
        });
    }).then(() => {
        // After looping over all berries, we check if berryDetails has any valid berries
        if (berryDetails.length === 0) {
            throw new Error('No valid berries with spicy potency found.');
        }
        // Return the most potent berry
        return berryDetails.reduce((max, b) => (b.potency > max.potency ? b : max));
    });
}

export function validateBerryPotency(berry, potency) {
    return cy.request(`https://pokeapi.co/api/v2/berry/${berry}/`).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.name).to.eq(berry);
        const spicyFlavor = res.body.flavors.find(f => f.flavor.name === 'spicy');
        expect(spicyFlavor?.potency).to.eq(potency);
    });
}
