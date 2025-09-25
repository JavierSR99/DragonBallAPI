import { IsString, IsNumber, Min, MaxLength, IsMongoId, IsArray, IsUrl, IsOptional, IsBoolean } from "class-validator";

export class CreateCharacterDto {

    @IsString()
    name: string;

    @IsNumber()
    @Min(0)
    baseKI: number;

    @IsNumber()
    @IsOptional()
    @Min(0)
    totalKI?: number;

    @IsMongoId()
    @IsOptional()
    race?: string;

    @IsString()
    @MaxLength(1000)
    description: string;

    @IsArray()
    @IsMongoId({each: true})
    sagas: string[];

    @IsMongoId()
    @IsOptional()
    originPlanet?: string;

    @IsBoolean()
    isVillain: boolean;

    @IsOptional()
    @IsUrl()
    image?: string;

    @IsOptional()
    @IsString()
    slug?: string;
}
