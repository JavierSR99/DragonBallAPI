import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';

@Injectable()
export class RefCheckService {

    private dedupeValid(ids: string[]) {
        const unique = Array.from(new Set(ids ?? [])).filter(Boolean);
        const valid: string[] = [];
        const invalid: string[] = [];
        for (const id of unique) (Types.ObjectId.isValid(id) ? valid : invalid).push(id);

        return { valid, invalid };
    }

    /**
    * Devuelve los IDs que NO existen. (Opcional: incluye inválidos)
    */
    async missingIds(model: Model<any>, ids: string[], { includeInvalid = true } = {}): Promise<string[]> {
        const {  valid, invalid } = this.dedupeValid(ids);
        if (!valid.length && !invalid.length) return [];

        const found = await model.find({ _id: { $in: valid } }).select('_id').lean();
        const foundSet = new Set(found.map((d: any) => String(d._id)));
        const missing = valid.filter((id) => !foundSet.has(id));

        return includeInvalid ? [...invalid, ...missing] : missing;
    }

    /**
    * True/false de existencia por ID. Lanza 400 si el ID es inválido (estricto).
    */
    async exists(model: Model<any>, id: string): Promise<boolean> {
        if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido');
        const doc = await model.exists({ _id: id });
        return !!doc;
    }

    /**
    * Obtiene el documento o lanza 404 si no existe. Lanza 400 si el ID es inválido.
    */
    async getOrThrow<T>(model: Model<T>, id: string, entityName = 'Recurso'): Promise<T> {
        if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido');
        const doc = await model.findById(id);
        if (!doc) throw new NotFoundException(`${entityName} no encontrado`);
        return doc as unknown as T;
    }

    /**
    * Lanza 400 con el listado de IDs inexistentes/ inválidos.
    */
    async ensureAllExist(model: Model<any>, ids: string[]): Promise<string[]> {
        const missing = await this.missingIds(model, ids, { includeInvalid: false });
        return missing.length ? missing : [];
    }
}
