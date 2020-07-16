import { Request, Response } from 'express';

//Modelos
import Sedes, { ISede } from '../models/sedes';
import { mensaje } from 'interfaces';

//Crear Sede
export async function CrearSede(req: Request, res: Response) {

  const NewSede: ISede = req.body

  await Sedes.create(NewSede).then((Sede) => {
    var mensaje: mensaje = {
      icon: "success",
      titulo: "Se guardo exitosamente",
      mensaje: "El registro del " + Sede.Nombre
    };
    return res.status(200).json(mensaje);
  })

    .catch((err) => {
      var mensaje: mensaje = {
        icon: "error",
        titulo: "Error",
        mensaje: "Esta sede ya se encuentra registrada"
      };
      return res.status(400).json(mensaje);
    });
}

//Buscar Sede
export async function ObtenerSede(
  req: Request,
  res: Response
) {
  await Sedes.findById(req.params.id).then((Sede) => {
    return res.status(200).json(Sede);
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

//Listar sedes
export async function ObtenerSedes(
  req: Request,
  res: Response
) {

  await Sedes.find()
    .sort({ Nombre: 'asc' }).then((Sede) => {
      return res.status(200).json(Sede);
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


//Eliminar Sede
export async function EliminarSede(
  req: Request,
  res: Response
) {
  const { id } = req.params;

  await Sedes.findByIdAndRemove(id).then((Sede) => {
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

//Actualizar Sede
export async function ActualizarSede(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const UpSede: ISede = req.body;

  const Sede = await Sedes.findByIdAndUpdate(
    id,
    
      UpSede
    ,
    { new: true }
  );

  return res.json(Sede);
 }