import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type RaceDocument = HydratedDocument<Race>;

@Schema({timestamps: true})
export class Race {
    @Prop({required: true, trim: true, unique: true})
    name: String;

    @Prop({trim: true})
    description?: string;

    @Prop({ type: Types.ObjectId, ref: 'Planets' })
    planet: string;

    @Prop({unique: true, index: true})
    slug: string;
}

export const RaceSchema = SchemaFactory.createForClass(Race);
RaceSchema.index({slug: 1}, { unique: true });