import { test, expect } from '../src/fixtures/test.fixture';
import { PokemonService } from '../src/services/pokemon.service';
import { readPokemonExcel } from '../src/utils/excel.util';

const pokemonData = readPokemonExcel();

test.describe('Pokemon API - GET', () => {

  for (const pokemon of pokemonData) {

    // Test utilizando ID
    test(`Search Pokemon by ID - ${pokemon.id} (${pokemon.name})`, async ({ request }, testInfo) => {

      const pokemonService = new PokemonService(request);

      const startTime = Date.now();

      const response = await pokemonService.getPokemon(String(pokemon.id));

      const responseTime = Date.now() - startTime;

      const responseBody = await response.json();

      await testInfo.attach('pokemon-response-by-id.json', {
        body: JSON.stringify(responseBody, null, 2),
        contentType: 'application/json'
      });

      console.log(`Pokemon ID: ${pokemon.id}`);
      console.log(`Response time: ${responseTime} ms`);

      // Validar HTTP
      expect(response.status()).toBe(200);

      // Validar ID
      expect(responseBody.id).toBe(pokemon.id);

      // Validar Name
      expect(responseBody.name).toBe(pokemon.name);

      // Validar abilities
      expect(responseBody.abilities).toBeDefined();
      expect(Array.isArray(responseBody.abilities)).toBe(true);
      expect(responseBody.abilities.length).toBeGreaterThan(0);

      // Validar tiempo de respuesta
      expect(responseTime).toBeLessThan(10000);
    });

    // Test utilizando Name
    test(`Search Pokemon by Name - ${pokemon.name}`, async ({ request }, testInfo) => {

      const pokemonService = new PokemonService(request);

      const startTime = Date.now();

      const response = await pokemonService.getPokemon(pokemon.name);

      const responseTime = Date.now() - startTime;

      const responseBody = await response.json();

      await testInfo.attach('pokemon-response-by-name.json', {
        body: JSON.stringify(responseBody, null, 2),
        contentType: 'application/json'
      });

      console.log(`Pokemon Name: ${pokemon.name}`);
      console.log(`Response time: ${responseTime} ms`);

      // Validar HTTP
      expect(response.status()).toBe(200);

      // Validar ID
      expect(responseBody.id).toBe(pokemon.id);

      // Validar Name
      expect(responseBody.name).toBe(pokemon.name);

      // Validar abilities
      expect(responseBody.abilities).toBeDefined();
      expect(Array.isArray(responseBody.abilities)).toBe(true);
      expect(responseBody.abilities.length).toBeGreaterThan(0);

      // Validar tiempo de respuesta
      expect(responseTime).toBeLessThan(10000);
    });

  }

});