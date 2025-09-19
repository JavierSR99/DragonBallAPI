import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SagasService } from './sagas.service';
import { CreateSagaDto } from './models/dto/create-saga.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { SlugField } from 'src/common/decorators/slug-field.decorator';

@Controller('sagas')
export class SagasController {

  //#region CONSTRUCTOR
  constructor(private readonly _ss: SagasService) {}
  //#endregion

  //#region POST METHODS
  @Post('create')
  create(
    @SlugField('title') slug: string,
    @Body() dto: CreateSagaDto
  ) {
    if (!dto.slug) {
      dto.slug = slug;
    }
    return this._ss.create(dto)
  }
  //#endregion

  //#region GET METHODS
  @Get(':id')
  findOneById(@Param('id', ParseObjectIdPipe) id: string) {
    return this._ss.findById(id);
  }
  //#endregion

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
