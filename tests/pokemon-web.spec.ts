import { test, expect } from '../src/fixtures/test.fixture';
import { readPokemonExcel } from '../src/utils/excel.util';
import { PokemonPage } from '../src/pages/pokemon.page';
import { validateImage } from '../src/utils/image-validator';

// Leer Excel una sola vez
const pokemonList = readPokemonExcel();

test.describe('Challenge - Automatización Web Pokémon', () => {

  // Generar un test por cada registro del Excel
  for (const pokemon of pokemonList) {

    test(`Validar Pokémon: ${pokemon.name}`, async ({ page }) => {

      const pokemonPage = new PokemonPage(page);

      // Ingresar a Wikipedia
      await pokemonPage.openPokemon(pokemon.name);

      // Validar título
      await pokemonPage.validateTitle(pokemon.name);

      console.log(`Título validado: ${pokemon.name}`);

      // Obtener autor del dibujo
      // y descargar la imagen
      const imagePath =
        await pokemonPage.downloadPokemonImage(pokemon.name);

      // Validar extensión y tamaño
      validateImage(imagePath);

      console.log(`Imagen validada: ${pokemon.name}`);

    });

  }

  // Registrar finalización de cada test
  test.afterEach(async ({}, testInfo) => {

    console.log('--------------------------------');

    console.log(
      'Test finalizado:',
      testInfo.title
    );

    console.log(
      'Fecha y hora:',
      new Date().toLocaleString()
    );

    console.log(
      'Estado:',
      testInfo.status
    );

    console.log('--------------------------------');

  });

});