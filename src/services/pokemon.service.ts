import { APIRequestContext } from '@playwright/test';

export class PokemonService {

  constructor(
    private readonly request: APIRequestContext
  ) {}

  async getPokemon(identifier: string) {

    return await this.request.get(
      `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(identifier)}`
    );
  }
}