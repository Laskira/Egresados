import { model, Schema, Document } from 'mongoose';

const Historial = new Schema({
    AprendizD: {
        Documento: {
            type: Schema.Types.String,
        required: true},
        Id: {type: Schema.Types.ObjectId,
        ref: "Aprendiz"}
    },
    Admin: {
        Documento: {
            type: Schema.Types.String,
        required: true},
        Nombres: {
            type: Schema.Types.String,
            required: true
        },
        P_Apellido: {
            type: Schema.Types.String,
            required: true
        },
        S_Apellido: {
            type: Schema.Types.String,
            required: true
        },
        Id: {type: Schema.Types.ObjectId,
        ref: "Administracion"}
    },
    MedioComunicacion: {
        type: String,
        required: true
    },
    Comentarios: {
        type: String,
        required: false
    },
    Pruebas: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export interface IHistorial extends Document {
    AprendizD?: {Documento: string; Id: string};
    IdAprendizD: object;
    Admin?: {
        Documento: string; 
        Nombres: string;
        P_Apellido: string;
        S_Apellido: string; 
        Id: string};
    IdAdmin: object;
    MedioComunicacion: string;
    Comentarios: string;
    Pruebas: string;
}

export default model<IHistorial>("Historial", Historial);