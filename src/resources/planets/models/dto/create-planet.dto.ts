import { IsArray, IsOptional, IsString, IsUrl, MaxLength, IsMongoId } from 'class-validator';

export class CreatePlanetDto {
    @IsString()
    @MaxLength(50)
    name: string;

    @IsOptional()
    @IsString()
    @MaxLength(1000)
    description?: string;

    @IsOptional()
    @IsUrl()
    image?: string;

    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    whenDestroyed?: string[];
}
