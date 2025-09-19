import { Body } from "@nestjs/common";
import { SlugPipe } from "../pipes/slug.pipe";

export const SlugField = (property = 'title') =>
    Body(property, new SlugPipe(property));