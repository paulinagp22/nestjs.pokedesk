import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // Configuración para servir archivos
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    // Referencia a la base de datos
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs-pokemon'),
    PokemonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
