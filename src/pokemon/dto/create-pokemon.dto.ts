import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreatePokemonDto {
  @IsInt()
  @IsPositive()
  @Min(1)
  pokemonId: number;

  @IsString()
  @MinLength(1)
  name: string;
}
