import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type CharacterDocument = HydratedDocument<Character>

@Schema({timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true }})
export class Character {

    @Prop({ required: true, trim: true })
    name: string;

    @Prop({ type: Number, required: true, min: 0 })
    baseKI: number;

    @Prop({ type: Number, required: false, min: 0, default: 0 })
    totalKI: number;

    @Prop({ type: Types.ObjectId, ref: 'Race' })
    race: Types.ObjectId;

    @Prop({required: true, trim: true})
    description: string;

    @Prop({ required: true, type: [Types.ObjectId], ref: 'Saga', default: [] })
    sagas: Types.ObjectId[];

    @Prop({ type: Types.ObjectId, ref: 'Planet' })
    originPlan: Types.ObjectId;

    @Prop({ type: Boolean, default: false })
    isVillain: boolean;

    @Prop({ trim: true })
    image?: string;

    @Prop({ required: true, unique: true, index: true })
    slug: string;

}

export const CharacterSchema = SchemaFactory.createForClass(Character);

CharacterSchema.virtual('transformations', {
    ref: 'Transformations',
    localField: '_id',
    foreignField: 'character',
    justOne: false,
    options: { sort: { order: 1, _id: 1 }, select: '-__v' }
});