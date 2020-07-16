import { Request, Response } from 'express';

//Modelos
import Trabajos, {ITrabajos} from '../models/trabajos';
import Aprendiz from '../models/aprendices'
import { mensaje } from 'interfaces';
import aprendices from '../models/aprendices';

//Registrar Trabajo
export async function RegistrarTrabajo(req: Request, res: Response) {

    const NewTrabajo: ITrabajos = req.body;

    const Aprendices = await Aprendiz.findById(NewTrabajo.IdAprendiz);
    if (!Aprendices) {
        var mensaje: mensaje = {
            icon: "error",
            titulo: "Error",
            mensaje: "Este no esta registrado",
          };
          return res.status(400).json(mensaje);
    }
 
    NewTrabajo.Aprendiz = {
        Documento: Aprendices.Documento,
        Nombres: Aprendices.Nombres,
        Id: Aprendices._id
    };

    await Trabajos.create(NewTrabajo).then((Trabajo) => {
      var mensaje: mensaje = {
        icon: "success",
        titulo: "Se registro exitosamente",
        mensaje: "El empleo del egresado sena"
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

//Obtener trabajos de un egresado
export async function ObtenerTrabajos(
    req: Request,
    res: Response
  ) {
    await Trabajos.find().then((Trabajo) => {
      return res.status(200).json(Trabajo);
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

 
//Eliminar trabajo
export async function EliminarTrabajo(
    req: Request,
    res: Response
  ) {
    const { id } = req.params;
  
    await Trabajos.findByIdAndRemove(id).then((Trabajo) => {
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

  //Actulizar empleo
  export async function ActualizarEmpleo(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { id } = req.params;
    const UpTrabajo: ITrabajos = req.body;
  
    const Trabajo = await Trabajos.findByIdAndUpdate(
      id,
      
        UpTrabajo
      ,
      { new: true }
    );
  
    return res.json(Trabajo);
   }

   
//Buscar Trabajo
export async function ObtenerTrabajo(
  req: Request,
  res: Response
) {
  await Trabajos.findById(req.params.id).then((Trabajo) => {
    return res.status(200).json(Trabajo);
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
