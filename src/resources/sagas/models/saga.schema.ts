import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { ArcType } from "./enum/arcs.enum";
import convert from "url-slug";

export type SagaDocument = HydratedDocument<Saga>;

@Schema({ timestamps: true, versionKey: false })
export class Saga {
    @Prop({ required: true, trim: true, unique: true })
    title: string;

    @Prop({
        required: true, unique: true, lowercase: true, index: true, 
        default: function (this: Saga) {
            return this.title ? convert((this.title)) : undefined;
        }
    })
    slug: string;

    @Prop({ type: String, enum: Object.values(ArcType), requirred: true, index: true })
    arcType: ArcType;

    @Prop({ type: [Types.ObjectId], ref: 'Character', default: [] })
    characters: Types.ObjectId[];

    @Prop({ type: Number, index: true })
    order?: number;

    @Prop({ type: String })
    summary?: string;
}

export const SagaSchema = SchemaFactory.createForClass(Saga);

// Índices de búsqueda de texto
SagaSchema.index({ title: 'text', summary: 'text' });
