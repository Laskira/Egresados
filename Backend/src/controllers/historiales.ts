import { Request, Response } from "express";
import path from "path";
import fs from "fs-extra";

//Modelos
import Historial, { IHistorial } from "../models/historiales";
import Aprendiz from "../models/aprendices";
import Administrador from "../models/administradores";
import { mensaje } from "interfaces";

//Crear Historial
export async function CrearHistorial(req: Request, res: Response) {
  const NewHistorial: IHistorial = req.body;
  NewHistorial.Pruebas = req.file.path;

  const aprendiz = await Aprendiz.findById(NewHistorial.IdAprendizD);
  const admin = await Administrador.findById(NewHistorial.IdAdmin);

  // Aprendiz Validation
  if (!aprendiz) {
    var mensaje: mensaje = {
      icon: "error",
      titulo: "Error",
      mensaje: "Este aprendiz no se encuentra registrado",
    };
    return res.status(400).json(mensaje);
  }

  // Admin Validation
  if (!admin) {
    var mensaje: mensaje = {
      icon: "error",
      titulo: "Error",
      mensaje: "Este usuario no se encuentra registrado",
    };
    return res.status(400).json(mensaje);
  }

  NewHistorial.AprendizD = { Documento: aprendiz.Documento, Id: aprendiz._id };
  NewHistorial.Admin = {
    Documento: admin.Documento,
    Nombres: admin.Nombres,
    P_Apellido: admin.P_Apellido,
    S_Apellido: admin.S_Apellido,
    Id: admin._id
  };

  await Historial.create(NewHistorial)
    .then((HistorialN) => {
      var mensaje: mensaje = {
        icon: "success",
        titulo: "Guardado exitoso",
        mensaje: "Usted ha registrado un historial de seguimiento",
      };
      return res.status(200).json(mensaje);
    })

    .catch((err) => {
      fs.unlink(path.resolve(req.file.path));
      var mensaje: mensaje = {
        icon: "error",
        titulo: "Oops",
        mensaje: "Ha ocurrido un error",
      };
      return res.status(400).json(mensaje);
    });
}

//Buscar Historiales
export async function ObtenerHistoriales(
  req: Request,
  res: Response
): Promise<Response> {
  const Historiales = await Historial.find();
  return res.json(Historiales);
}

//Buscar Historial
export async function ObtenerHistorial(req: Request, res: Response) {
  await Historial.findById(req.params.id)
    .then((HistorialN) => {
      return res.status(200).json(HistorialN);
    })

    .catch((err) => {
      var mensaje: mensaje = {
        icon: "error",
        titulo: "Oops",
        mensaje: "Se ha presentado un error",
      };
      return res.status(400).json(mensaje);
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

//Eliminar Historial
export async function EliminarHistorial(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;

  const Historiales = await Historial.findByIdAndRemove(id);

  if (Historiales) {
    await fs.unlink(path.resolve(Historiales.Pruebas));
  }

  var mensaje: mensaje = {
    icon: "success",
    titulo: "Se elimino exitosamente",
    mensaje: "El historial de seguimiento",
  };

  return res.status(200).json(mensaje);
}

//Buscar Historiales de un aprendiz
export async function ObtenerHistorialAprendiz(
  req: Request,
  res: Response
) {
  const { id } = req.params;
  const aprendiz = await Aprendiz.findById(id);
  if (aprendiz) {
    const historial = await Historial.find({IdAprendizD: {$eq: id}});
    return res.json(historial);
  } else {
    var mensaje: mensaje = {
      icon: "error",
      titulo: "Oops",
      mensaje: "Se ha presentado un error",
    };
    return res.json(mensaje);
  }
}

//Actualizar Historial
export async function ActualizarHistorial(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const UpHistorial = req.body;

  const Historiales = await Historial.findByIdAndUpdate(id, UpHistorial, {
    new: true,
  });

  return res.json(Historiales);
}

//Actualizar Pruebas
export async function ActualizarPruebaHistorial(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const historial = await Historial.findById(id);

  if (historial) {
    await fs.unlink(path.resolve(historial.Pruebas));
  }

  const Historiales = await Historial.findByIdAndUpdate(
    id,
    {
      Pruebas: req.file.path,
    },
    { new: true }
  );
  return res.json(Historiales);
}
