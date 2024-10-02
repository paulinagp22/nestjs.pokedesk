import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException({
          message: `Pokemon already exists ${JSON.stringify(error.keyValue)}`,
        });
      }
      throw new InternalServerErrorException({
        message: `Can´t create pokemon - Check server logs`,
      });
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    if (!isNaN(Number(+term))) {
      pokemon = await this.pokemonModel.findOne({ pokemonId: term });
    }

    // Mongo ObjectId
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    // Pokemon Name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLocaleLowerCase(),
      });
    }

    // ERRORS
    if (!pokemon) {
      throw new NotFoundException(`Pokemon with term ${term} not found`);
    }

    // Success
    return pokemon;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return updatePokemonDto;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
