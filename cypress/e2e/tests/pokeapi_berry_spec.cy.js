import { requestBerryById, requestBerryByName, requestBerryFlavor, findMostPotentBerry, validateBerryPotency } from '../../support/berryHelper';
describe('PokeAPI Berry Endpoint Tests', () => {

    // Test 1a: Valid ID for berry
    it('Should return berry data for valid ID', () => {
      requestBerryById(1).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.exist;
      });
    });
  
    // Test 1b: Invalid ID for berry
    it('Should return 404 for invalid berry ID', () => {
      cy.request({
        url: 'https://pokeapi.co/api/v2/berry/99999/',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  
    // Test 2a: Valid name for berry
    it('Should return berry data for valid name', () => {
      requestBerryByName('cheri').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.id).to.exist;
      });
    });
  
    // Test 2b: Invalid name for berry
    it('Should return 404 for invalid berry name', () => {
      cy.request({
        url: 'https://pokeapi.co/api/v2/berry/not-a-berry/',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  
    // Test 3a: Valid flavor - spicy
    it('Finds the most potent spicy berry and validates its data', () => {
      const flavorUrl = 'https://pokeapi.co/api/v2/berry-flavor/spicy/';
      
      // Request for spicy flavor
      requestBerryFlavor('spicy').then((flavorRes) => {
        expect(flavorRes.status).to.eq(200);
  
        const berryNames = flavorRes.body.berries.map(b => b.berry.name);
        cy.log(`Found ${berryNames.length} spicy berries`);
  
        findMostPotentBerry(berryNames).then((mostPotent) => {
          cy.log(`Most potent spicy berry: ${mostPotent.name} (potency: ${mostPotent.potency})`);
  
          // Validate the potency of the most potent berry
          validateBerryPotency(mostPotent.name, mostPotent.potency);
        });
      });
    });
  
  });