import { Body, Controller, Post } from '@nestjs/common';
import { RacesService } from './races.service';
import { CreateRaceDto } from './models/dto/create-race.dto';
import { SlugField } from 'src/common/decorators/slug-field.decorator';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

@Controller('races')
export class RacesController {
  constructor(private readonly _rs: RacesService) {}

  @Post('create')
  create(
    @Body() dto: CreateRaceDto,
    @SlugField('name') slug: string
  ) {

    if (!dto.slug) {
      dto.slug = slug;
    }
    
    return this._rs.create(dto);
  }

}
