import { IsString, IsNumber, Min, MaxLength, IsMongoId, IsArray, IsUrl, IsOptional } from "class-validator";

export class CreateTransformationDto {

    @IsString()
    @IsMongoId()
    character: string;
    
    @IsString()
    @MaxLength(50)
    name: string;

    @IsString()
    @MaxLength(1000)
    description: string;

    @IsArray()
    @IsMongoId({ each: true })
    sagas: string[];

    @IsUrl()
    @IsOptional()
    image?: string;

    @IsNumber()
    @Min(0)
    ki: number;

    @IsString()
    @IsOptional()
    slug?: string;
}
