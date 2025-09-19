import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { CreatePlanetDto } from './models/dto/create-planet.dto';
import { UpdatePlanetDto } from './models/dto/update-planet.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { imageMulterMemoryOptions } from 'src/common/utils/multer.util';
import { persistImageBuffer } from 'src/common/utils/image-save.util';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('planets')
export class PlanetsController {
  constructor(private readonly _ps: PlanetsService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('image', imageMulterMemoryOptions()))
  create(
    @Body() dto: CreatePlanetDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    return this._ps.create(dto, file);
  }

  @Get(':id')
  findPlanetById(@Param('id', ParseObjectIdPipe) id: string) {
    return this._ps.findById(id);
  }

  // @Get()
  // findAll() {
  //   return this.planetsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.planetsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePlanetDto: UpdatePlanetDto) {
  //   return this.planetsService.update(+id, updatePlanetDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.planetsService.remove(+id);
  // }
}
