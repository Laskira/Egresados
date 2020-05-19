import {Request, Response} from 'express';

//Modelos
import Formaciones, { IFormacion } from '../models/formaciones';
import { mensaje } from '../interfaces';

//Crear Formación
export async function CrearFormacion(req: Request, res: Response) {
    const { Nombre, Tipo } = req.body;

    const NewFormacion = { Nombre, Tipo };

    const Formacion: IFormacion = new Formaciones(NewFormacion);

    await Formacion.save(function(err) {
      if (err) {
        var mensaje: mensaje = {
          icon: "error",
          titulo: "Error",
          mensaje: "Este programa de formación ya se encuentra registrado"
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

//Buscar Formacion
export async function ObtenerFormacion(
  req: Request,
  res: Response
): Promise<Response> {

  const Formacion = await Formaciones.find().exec();
  return res.json(Formacion);
  
}

//Eliminar Formacion

