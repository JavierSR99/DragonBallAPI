import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { convert } from 'url-slug';

@Injectable()
export class SlugPipe implements PipeTransform {

    constructor(private readonly fieldName: string = 'value') {}

    transform(value: any): string {
        if (typeof value !== 'string' || !value.trim()) {
            throw new BadRequestException(
                `Error con el campo '${this.fieldName}'`,
            );
        }

        let slug = convert(value);

        slug = slug
        .replace(/--+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 80);

        return slug;
    }
}