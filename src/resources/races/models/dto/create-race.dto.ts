import { MaxLength, IsString, IsOptional, IsUrl, IsMongoId } from "class-validator";

export class CreateRaceDto {
    @IsString()
    @MaxLength(50)
    name: string;

    @IsString()
    @MaxLength(1000)
    @IsOptional()
    description?: string;

    @IsString()
    @IsMongoId()
    planet: number;

    @IsString()
    @IsOptional()
    @IsUrl()
    image?: string;

    @IsString()
    @IsOptional()
    slug?: string;
}