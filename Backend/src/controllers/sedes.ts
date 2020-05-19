import { Request, Response } from 'express';

//Modelos
import Sedes, { ISede } from '../models/sedes';
import { mensaje } from 'interfaces';

//Crear Sede
export async function CrearSede(req: Request, res: Response) {
  const { Nombre } = req.body;

  const NewSede = { Nombre };

  const Sede: ISede = new Sedes(NewSede);

  await Sede.save(function (err) {
    if (err) {
      var mensaje: mensaje = {
        icon: "error",
        titulo: "Error",
        mensaje: "Esta sede ya se encuentra registrada"
      };
      return res.status(400).json(mensaje);
    }

    var mensaje: mensaje = {
      icon: "success",
      titulo: "Se guardo exitosamente",
      mensaje: "El registro de " + Nombre
    };

    return res.status(200).json(mensaje);
  });
}

//Buscar Sede
export async function ObtenerSede(
  req: Request,
  res: Response
): Promise<Response> {

  const Sede = await Sedes.find().exec();
  return res.json(Sede);
  
}

//Eliminar Sede
export async function EliminarSede(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;

  await Sedes.findByIdAndRemove(id);

  var mensaje: mensaje = {
    icon: "success",
    titulo: "Eliminación exitosa",
    mensaje: "Se ha borrado el registro"
  };


  return res.status(200).json(mensaje);
}

//Actualizar Sede
export async function ActualizarSede(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const { Nombre } = req.body;

  const Sede = await Sedes.findByIdAndUpdate(
    id,
    {
      Nombre
    },
    { new: true }
  );

  return res.json(Sede);
}
