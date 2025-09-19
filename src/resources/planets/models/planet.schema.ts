import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type PlanetDocument = HydratedDocument<Planet>;

@Schema({ timestamps: true, versionKey: false, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Planet {
    @Prop({ required: true, trim: true, unique: true})
    name: string;

    @Prop({ type: String })
    description?: string;

    @Prop({ type: String })
    image?: string;

    @Prop({ type: [Types.ObjectId], ref: 'Saga' })
    whenDestroyed: Types.ObjectId[];
}

export const PlanetSchema = SchemaFactory.createForClass(Planet);

PlanetSchema.virtual('isDestroyed').get(function (this: Planet) {
  return Array.isArray(this.whenDestroyed) && this.whenDestroyed.length > 0;
});