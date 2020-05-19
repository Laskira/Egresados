import { model, Schema, Document } from 'mongoose';

const Aprendiz = new Schema({
    Documento: {
        type: String,
        unique: true,
        required: true
    },
    Nombres: {
        type: String,
        required: true
    },
    P_Apellido: {
        type: String,
        required: true
    },
    S_Apellido: {
        type: String,
        required: true
    },
    Telefono: {
        type: Number,
        required: true
    },
    Correo: {
        type: String,
        required: true
    },
    Direccion: {
        type: String,
        required: true
    },
    Ficha: {
        type: Schema.Types.ObjectId,
        ref: "Ficha"
    },
    Practicas: {
        type: String,
        required: true
    },
    HojaVida: {
        type: String,
        required: true
    }
});

export interface IAprendiz extends Document {
    Documento: string;
    Nombres: string;
    P_Apellido: string;
    S_Apellido: string;
    Telefono: number;
    Correo: string;
    Direccion: string;
    Ficha: string;
    Practicas: string;
    HojaVida: string;
}

export default model<IAprendiz>("Aprendiz", Aprendiz);