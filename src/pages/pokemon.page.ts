import { Page, expect } from '@playwright/test';
import { saveImage } from '../utils/image-manager';

export class PokemonPage {

  constructor(private page: Page) {}

  async openPokemon(pokemonName: string) {

    await this.page.goto(
      `https://en.wikipedia.org/wiki/${encodeURIComponent(pokemonName)}`,
      { waitUntil: 'domcontentloaded' }
    );

  }

  async validateTitle(pokemonName: string) {

    const title = this.page.locator('#firstHeading');

    await expect(title).toHaveText(
      new RegExp(`^${pokemonName}$`, 'i')
    );

  }

  async downloadPokemonImage(pokemonName: string) {
    const caption = await this.page
      .locator('table.infobox figcaption')
      .innerText();
    const artist = caption.match(/\bby\s+(.+)$/i)?.[1]?.trim();

    if (!artist) {
      throw new Error(`No se encontró el autor del dibujo de ${pokemonName}`);
    }

    console.log(`Dibujante de ${pokemonName}: ${artist}`);

    await this.page.goto(
      `https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=${encodeURIComponent(pokemonName)}`,
      { waitUntil: 'domcontentloaded' }
    );

    const imageResult = this.page.locator('a[href*="/wiki/File:"]').first();
    await expect(imageResult).toBeVisible();
    await imageResult.click();

    const filePreview = this.page.locator('#file .mw-thumbnail-link');
    await expect(filePreview).toBeVisible();

    const [response] = await Promise.all([
      this.page.waitForResponse(response => {
        const contentType = response.headers()['content-type'] || '';

        return response.request().isNavigationRequest()
          && response.status() === 200
          && contentType.toLowerCase().startsWith('image/');
      }),
      filePreview.click()
    ]);

    const contentType = (response.headers()['content-type'] || '')
      .split(';')[0]
      .trim()
      .toLowerCase();

    const extensionMap: Record<string, string> = {
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'image/svg+xml': '.svg'
    };

    const extension = extensionMap[contentType];

    if (!extension) {
      throw new Error(
        `Formato de imagen no soportado: ${contentType}`
      );
    }

    const imageBuffer = await response.body();

    return saveImage(
      pokemonName,
      imageBuffer,
      extension
    );

  }
}