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
    Sexo: {
        type: String,
        required: true
    },
    Telefono: {
        type: Number,
        required: true
    },
    Correo: {
        type: String,
        required: true,
        unique: true
    },
    Direccion: {
        type: String,
        required: true
    },
    FichaTecnica: {
        Numero: {
            type: Schema.Types.String,
            required: false
        },
        Id: {type: Schema.Types.ObjectId,
        ref: "Ficha"}
    },
    FichaTecnologica: {
        Numero: {
            type: Schema.Types.String,
            required: false
        },
       Id: {type: Schema.Types.ObjectId,
        ref: "Ficha"}
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
    Sexo: string;
    Telefono: number;
    Correo: string;
    Direccion: string;
    FichaTecnica?: { Numero: number; Id: string };
    IdFichaTecnica: object;
    FichaTecnologica?: { Numero: number; Id: string };
    IdFichaTecnologica: object;
    Practicas: string;
    HojaVida: string;
}

export default model<IAprendiz>("Aprendiz", Aprendiz);