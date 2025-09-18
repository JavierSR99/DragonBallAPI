import { PartialType } from '@nestjs/mapped-types';
import { CreateTransformationDto } from './create-transformation.dto';

export class UpdateTransformationDto extends PartialType(CreateTransformationDto) {}
