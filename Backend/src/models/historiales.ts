import { model, Schema, Document } from 'mongoose';

const Historial = new Schema({
    Aprendiz: {
        type: Schema.Types.ObjectId,
        ref: "Aprendiz"
    },
    Administrador: {
        type: Schema.Types.ObjectId,
        ref: "Administracion"
    },
    MedioComunicacion: {
        type: String,
        required: true
    },
    Comentarios: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

export interface IHistorial extends Document {
    Aprendiz: object;
    Administrador: object;
    MedioComunicacion: string;
    Comentarios: string;
}

export default model<IHistorial>("Historial", Historial);