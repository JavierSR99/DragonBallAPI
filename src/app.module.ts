import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './resources/auth/auth.module';
import { UsersModule } from './resources/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SagasModule } from './resources/sagas/sagas.module';
import { PlanetsModule } from './resources/planets/planets.module';
import { RacesModule } from './resources/races/races.module';
import { CharactersModule } from './resources/characters/characters.module';
import { TransformationsModule } from './resources/transformations/transformations.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DB_URI!),
    // UsersModule,
    SagasModule,
    PlanetsModule,
    RacesModule,
    CharactersModule,
    TransformationsModule,
    SharedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
