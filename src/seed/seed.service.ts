import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokemonResponse } from './interfaces/pokemon-response.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    const { data } = await this.axios.get<PokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=50',
    );

    const pokemons = data.results.map(({ name, url }) => {
      const segments = url.split('/');
      const pokemonId = +segments[segments.length - 2];

      return {
        pokemonId,
        name,
      };
    });

    return pokemons;
  }
}
