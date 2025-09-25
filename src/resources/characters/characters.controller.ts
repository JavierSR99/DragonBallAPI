import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './models/dto/create-character.dto';
import { UpdateCharacterDto } from './models/dto/update-character.dto';
import { SlugField } from 'src/common/decorators/slug-field.decorator';

@Controller('characters')
export class CharactersController {
  constructor(private readonly _cs: CharactersService) {}

  @Post('create')
  create(
    @Body() dto: CreateCharacterDto,
    @SlugField('name') slug: string
  ) {
    if (!dto.slug) {
      dto.slug = slug;
    }

    return this._cs.create(dto);
  }

  // @Get()
  // findAll() {
  //   return this.charactersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.charactersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCharacterDto: UpdateCharacterDto) {
  //   return this.charactersService.update(+id, updateCharacterDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.charactersService.remove(+id);
  // }
}
