import { IsArray, IsEnum, IsInt, IsMongoId, IsOptional, IsString, MaxLength, Min } from "class-validator";
import { ArcType } from "../enum/arcs.enum";

export class CreateSagaDto {

    @IsString()
    @MaxLength(120)
    title: string;

    @IsOptional()
    @IsString()
    slug?: string;

    @IsEnum(ArcType)
    arcType: ArcType;

    @IsOptional()
    @IsInt()
    @Min(0)
    order?: number;

    @IsOptional()
    @IsString()
    @MaxLength(1000)
    summary?: string;

    @IsOptional()
    @IsArray()
    @IsMongoId({ each: true })
    characters?: string[];
}