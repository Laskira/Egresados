import { model, Schema, Document } from 'mongoose';

const Administrador = new Schema({
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
    Password: {
        type: String,
        required: true
    }
});

export interface IAdministracion extends Document {
    Documento: string;
    Nombres: string;
    P_Apellido: string;
    S_Apellido: string;
    Password: string;
}

export default model<IAdministracion>("Administracion", Administrador);