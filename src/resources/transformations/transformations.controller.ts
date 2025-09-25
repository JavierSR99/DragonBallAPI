import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransformationsService } from './transformations.service';
import { CreateTransformationDto } from './models/dto/create-transformation.dto';
import { UpdateTransformationDto } from './models/dto/update-transformation.dto';
import { SlugField } from 'src/common/decorators/slug-field.decorator';

@Controller('transformations')
export class TransformationsController {
  constructor(private readonly transformationsService: TransformationsService) {}

  @Post('create')
  create(
    @Body() dto: CreateTransformationDto,
    @SlugField('name') slug: string
  ) {

    if (!dto.slug) dto.slug = slug;

    return this.transformationsService.create(dto);
  }

  // @Get()
  // findAll() {
  //   return this.transformationsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.transformationsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTransformationDto: UpdateTransformationDto) {
  //   return this.transformationsService.update(+id, updateTransformationDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.transformationsService.remove(+id);
  // }
}
