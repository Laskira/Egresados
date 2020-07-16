import { Request, Response } from 'express';

//Modelos
import Formaciones, { IFormacion } from '../models/formaciones';
import { mensaje } from '../interfaces';

//Crear Formación
export async function CrearFormacion(req: Request, res: Response) {

  const NewFormacion: IFormacion = req.body

  await Formaciones.create(NewFormacion).then((Formacion) => {
    var mensaje: mensaje = {
      icon: "success",
      titulo: "Se guardo exitosamente",
      mensaje: "El registro de " + Formacion.Nombre
    };
    return res.status(200).json(mensaje);
  })

     .catch((err) => {
      var mensaje: mensaje = {
        icon: "error",
        titulo: "Error",
        mensaje: "Este programa de formación ya se encuentra registrado"
      };
      return res.status(400).json(mensaje);
     })
}

//Buscar Formacion
export async function ObtenerFormacion(
  req: Request,
  res: Response
) {

  await Formaciones.findById(req.params.id).then((Formacion) => {
    return res.status(200).json(Formacion);
  })

  .catch((err) => {
    var mensaje: mensaje = {
      icon: "error",
      titulo: "Oops",
      mensaje: "Se ha presentado un error"
    };
    return res.status(400).json(mensaje);
  });

}

//Buscar Formaciones
export async function ObtenerFormaciones(
  req: Request,
  res: Response
) {

  await Formaciones.find()
    .sort({ Nombre: 'asc' }).then((Formacion) => {
      return res.status(200).json(Formacion);
    })

    .catch((err) => {
      var mensaje: mensaje = {
        icon: "error",
        titulo: "Oops",
        mensaje: "Se ha presentado un error"
      };
      return res.status(400).json(mensaje);
    });

}

//Eliminar Formacion
export async function EliminarFormacion(
  req: Request,
  res: Response
) {
  const { id } = req.params;

  await Formaciones.findByIdAndRemove(id).then((Sede) => {
    var mensaje: mensaje = {
      icon: "success",
      titulo: "Eliminación exitosa",
      mensaje: "Se ha borrado el registro"
    };
  
    return res.status(200).json(mensaje);
  })
    
     .catch((err) => {
      var mensaje: mensaje = {
        icon: "error",
        titulo: "Oops",
        mensaje: "Se ha presentado un error"
      };
      return res.status(400).json(mensaje);
     });
}

//Actualizar formacion
export async function ActualizarFormacion(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const UpFormacion = req.body;

  const Formacion = await Formaciones.findByIdAndUpdate(
    id,
    
     UpFormacion
    ,
    { new: true }
  );

  return res.json(Formacion)
}
