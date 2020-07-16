import { Request, Response } from "express";

//Modelos
import Fichas, { IFicha } from "../models/fichas";
import Formaciones from "../models/formaciones";
import Sedes from "../models/sedes"
import { mensaje } from "interfaces";
import { Promise } from "mongoose";

//Crear Ficha
export async function CrearFicha(req: Request, res: Response) {
  let NewFicha: IFicha = req.body;
 
  const Formacion = await Formaciones.findById(NewFicha.IdFormacion);
  const Sede = await Sedes.findById(NewFicha.IdSede);
  if (!Formacion || !Sede) {
    var mensaje: mensaje = {
      icon: "error",
      titulo: "Error",
      mensaje: "Esta formación o sede de aprendizaje ha sido borrada",
    };
    return res.status(400).json(mensaje);
  }

  NewFicha.Formacion = { Nombre: Formacion.Nombre, Tipo: Formacion.Tipo, Id: Formacion._id };

  NewFicha.Sede = {Nombre: Sede.Nombre, Id: Sede._id};
  await Fichas.create(NewFicha)
    .then((Ficha) => {
      var mensaje: mensaje = {
        icon: "success",
        titulo: "Se guardo exitosamente",
        mensaje: "El registro de la ficha " + Ficha.Numero,
      };

      return res.status(200).json(mensaje);
    })

    .catch((err) => {
      var mensaje: mensaje = {
        icon: "error",
        titulo: "Error",
        mensaje: "Esta ficha ya se encuentra registrada"
      };
      return res.status(400).json(mensaje);
    });
}

//Mostrar fichas con excepcion
export async function ObtenerFichas(req: Request, res: Response) {
  await Fichas.find()
    .sort({ Numero: 1 })
    .then((Ficha) => {
      return res.status(200).json(Ficha);
    })

    .catch((err) => {
      var mensaje: mensaje = {
        icon: "error",
        titulo: "Oops",
        mensaje: "Se ha presentado un error",
      };
      return res.status(400).json(mensaje);
    });
}

//Mostrar fichas
export async function ShowFichas(req: Request, res: Response) {

  await Fichas.find({_id: {$ne: '5efe91d17e391c1ff0c56f49'}})
    .sort({ Numero: 1 })
    .then((Ficha) => {
      return res.status(200).json(Ficha);
    })

    .catch((err) => {
      var mensaje: mensaje = {
        icon: "error",
        titulo: "Oops",
        mensaje: "Se ha presentado un error",
      };
      return res.status(400).json(mensaje);
    });
}


//Mostrar un ficha
export async function ObtenerFicha(req: Request, res: Response) {
  await Fichas.findById(req.params.id)
    .then((Ficha) => {
      return res.status(200).json(Ficha);
    })

    .catch((err) => {
      var mensaje: mensaje = {
        icon: "error",
        titulo: "Oops",
        mensaje: "Se ha presentado un error",
      };
      return res.status(400).json(mensaje);
    });
}

//Eliminar ficha
export async function EliminarFicha(req: Request, res: Response) {
  const { id } = req.params;

  await Fichas.findByIdAndRemove(id)
    .then((Ficha) => {
      var mensaje: mensaje = {
        icon: "success",
        titulo: "Eliminación exitosa",
        mensaje: "Se ha borrado el registro",
      };

      return res.status(200).json(mensaje);
    })

    .catch((err) => {
      var mensaje: mensaje = {
        icon: "error",
        titulo: "Oops",
        mensaje: "Se ha presentado un error",
      };
      return res.status(400).json(mensaje);
    });
}

//Actualizar ficha
export async function ActualizarFicha(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const UpFicha: IFicha = req.body;

  const Ficha = await Fichas.findByIdAndUpdate(
    id,

    UpFicha,
    { new: true }
  );
  return res.json(Ficha);
}
