import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SagasService } from './sagas.service';
import { CreateSagaDto } from './models/dto/create-saga.dto';
import { UpdateSagaDto } from './models/dto/update-saga.dto';
import { SlugPipe } from 'src/common/pipes/slug.pipe';

@Controller('sagas')
export class SagasController {
  constructor(private readonly sagasService: SagasService) {}

  @Post('create')
  create(
    @Body('title', new SlugPipe('título')) slug: string,
    @Body() dto: CreateSagaDto
  ) {
    if (!dto.slug) {
      dto.slug = slug;
    }
    return this.sagasService.create(dto)
  }

  // @Get()
  // findAll() {
  //   return this.sagasService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.sagasService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSagasDto: UpdateSagaDto) {
  //   return this.sagasService.update(+id, updateSagasDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.sagasService.remove(+id);
  // }
}
