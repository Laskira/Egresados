import { model, Schema, Document } from 'mongoose';

const Trabajos = new Schema({
    Aprendiz: {
        Documento: {
            type: Schema.Types.String,
        required: true},
        Id: {type: Schema.Types.ObjectId,
            ref: "Aprendiz"}
    },
    Empresa: {
        type: String,
        required: true
    },
    EntradaEmpresa: {
        type: Date,
    require: true
    },
    TipoContrato: {
        type: String,
        required: true
    },
    Cargo: {
        type: String,
        required: true
    },
    Comentarios: {
        type: String,
        required: false
    }
},{
    timestamps: true
});

export interface ITrabajos extends Document {
   Aprendiz?: {Documento: string, Id: string, Nombres: string};
   IdAprendiz: object;
   Empresa: string;
   EntradaEmpresa: Date;
   TipoContrato: string;
   Cargo: string;
   Comentarios: string;
}

export default model<ITrabajos>("Trabajo", Trabajos);