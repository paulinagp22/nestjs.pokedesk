import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
  // id: string; // Se comenta porque Mongoose crea un id automáticamente

  // Se añaden las propiedades para que sea unico y se pueda indexar
  @Prop({
    unique: true,
    index: true,
  })
  pokemonId: number;

  @Prop({
    unique: true,
    index: true,
  })
  name: string;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
