import { model, Schema, Document } from 'mongoose';

const Formaciones = new Schema({
    Nombre: {
        type: String,
        unique: true,
        required: true
    },
    Tipo: {
        type: String,
        required: true
    }
});

export interface IFormacion extends Document {
    Nombre: string;
    Tipo: string;
}

export default model<IFormacion>("Formacion", Formaciones);