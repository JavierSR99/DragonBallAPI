import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransformationsService } from './transformations.service';
import { CreateTransformationDto } from './dto/create-transformation.dto';
import { UpdateTransformationDto } from './dto/update-transformation.dto';

@Controller('transformations')
export class TransformationsController {
  constructor(private readonly transformationsService: TransformationsService) {}

  @Post()
  create(@Body() createTransformationDto: CreateTransformationDto) {
    return this.transformationsService.create(createTransformationDto);
  }

  @Get()
  findAll() {
    return this.transformationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transformationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransformationDto: UpdateTransformationDto) {
    return this.transformationsService.update(+id, updateTransformationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transformationsService.remove(+id);
  }
}
