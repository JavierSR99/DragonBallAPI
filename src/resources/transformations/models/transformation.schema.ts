import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";

export type TransformationDocument = HydratedDocument<Transformation>

@Schema({ timestamps: true })
export class Transformation {

    @Prop({ required: true, type: Types.ObjectId, ref: 'Character', index: true })
    character: Types.ObjectId;

    @Prop({ required: true, trim: true })
    name: string;

    @Prop({ trim: true })
    description: string;

    @Prop({ type: [Types.ObjectId], ref: 'Saga', default: [] })
    sagas: Types.ObjectId[];

    @Prop({trim: true})
    image? : string;

    @Prop({ type: Number, min: 0, required: true })
    ki: number;

    @Prop({ required: true, index: true })
    slug: string;
}

export const TransformationSchema = SchemaFactory.createForClass(Transformation);

TransformationSchema.index({ character: 1, name: 1 }, { unique: true });
TransformationSchema.index({ character: 1, slug: 1 }, { unique: true });