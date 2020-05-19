import { model, Schema, Document } from 'mongoose';

const Sedes = new Schema({
    Nombre: {
        type: String,
        unique: true,
        required: true
    }
});

export interface ISede extends Document {
    Nombre: string;
}

export default model<ISede>("Sede", Sedes);