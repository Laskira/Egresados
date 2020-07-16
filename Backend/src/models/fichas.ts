import { model, Schema, Document } from "mongoose";

const Fichas = new Schema({
  Numero: {
    type: Number,
    unique: true,
    required: true,
  },
  Formacion: {
    Nombre: {
      type: Schema.Types.String,
      required: true
    },
    Tipo: {
      type: Schema.Types.String,
      required: true
    },
    Id: { type: Schema.Types.ObjectId, ref: "Formacion" }
  },
  Sede: {
    Nombre: {
        type: Schema.Types.String,
        required: true
      },
      Id: { type: Schema.Types.ObjectId, ref: "Sede" }
  },
  InicioFormacion: {
    type: Date,
    require: true,
  },
  FinLectiva: {
    type: Date,
    require: true,
  },
  FinFormacion: {
    type: Date,
    require: true,
  },
  Instructor: {
    type: String,
    required: true,
  }
});

export interface IFicha extends Document {
  Numero: number;
  Formacion?: { Nombre: string; Tipo: string; Id: string };
  IdFormacion: object;
  Sede?: {Nombre: string; Id: string};
  IdSede: object;
  InicioFormacion: Date;
  FinLectiva: Date;
  FinFormacion: Date;
  Instructor: string;
}

export default model<IFicha>("Ficha", Fichas);
