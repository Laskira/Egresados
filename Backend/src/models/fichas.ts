import { model, Schema, Document } from 'mongoose';

const Fichas = new Schema({
    Numero: {
        type: Number,
        unique: true,
        required: true
    },
    Formacion: {
        type: Schema.Types.ObjectId,
        ref: "Formacion"
    },
    Sede: {
        type: Schema.Types.ObjectId,
        ref: "Sede"
    },
    InicioFormacion: {
        type: Date,
        require: true
    },
    FinLectiva: {
        type: Date,
        require: true
    },
    FinFormacion: {
        type: Date,
        require: true
    },
    Instructor: {
        type: String,
        required: true
    }
});

export interface IFicha extends Document {
    Numero: number;
    Formacion: object;
    Sede: object;
    InicioFormacion: Date;
    FinLectiva: Date;
    FinFormacion: Date;
   
    Instructor: string;
}

export default model<IFicha>("Ficha", Fichas);