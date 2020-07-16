import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs-extra';

//Modelos
import Aprendiz, { IAprendiz } from '../models/aprendices';
import Fichas from '../models/fichas'
import { mensaje } from 'interfaces';

//Agregar Aprendiz
export async function CrearAprendiz(req: Request, res: Response) {
    let NewAprendiz: IAprendiz = req.body;
    NewAprendiz.HojaVida = req.file.path;

    const Tecnica = await Fichas.findById(NewAprendiz.IdFichaTecnica);
    const Tecnologica = await Fichas.findById(NewAprendiz.IdFichaTecnologica);
    
    if (!Tecnica || !Tecnologica) {
        var mensaje: mensaje = {
            icon: "error",
            titulo: "Error",
            mensaje: "Esta ficha de formación ha sido borrada"
          };
          return res.status(400).json(mensaje);
    }

    NewAprendiz.FichaTecnica = { Numero: Tecnica.Numero, Id: Tecnica._id };
    NewAprendiz.FichaTecnologica = { Numero: Tecnologica.Numero, Id: Tecnologica._id };

    await Aprendiz.create(
        NewAprendiz
    ).then((AprendizN) => {
      
        var mensaje: mensaje = {
            icon: "success",
            titulo: "Registración exitosa",
            mensaje: "Usted ha registrado un aprendiz exitosamente"
        };
        return res.status(200).json(mensaje);
    })

      .catch((err) => {
        fs.unlink(path.resolve(req.file.path));
        var mensaje: mensaje = {
            icon: "error",
            titulo: "Error",
            mensaje: "El documento o correo ingresado ya se encuentra registrado"
        };
        return res.status(400).json(err);
      })
}

//Buscar Aprendices
export async function ObtenerAprendices(
    req: Request,
    res: Response
) {
    await Aprendiz.find()
    .sort({ Nombres: 'asc' }).then((AprendizN) => {
      return res.status(200).json(AprendizN);
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

//Buscar Aprendiz
export async function ObtenerAprendizId(
    req: Request,
    res: Response
) {
    await Aprendiz.findById(req.params.id).then((AprendizN) => {
        return res.status(200).json(AprendizN);
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

// Ver pdf
export async function ObtenerPdf(
    req: Request,
    res: Response
) {
    const {id} = req.params;
    const pdf = await Aprendiz.findById(id);
    if (pdf) {
      const aprendiz =  await Aprendiz.find();
      return res.status(200).json(aprendiz);
    }
}

//Eliminar Aprendiz
export async function EliminarAprendiz(
    req: Request,
    res: Response
): Promise<Response> {
    const { id } = req.params;

    const Aprendices = await Aprendiz.findByIdAndRemove(id);

    let name: string = "";
    if (Aprendices) {
        name = Aprendices.Nombres
        await fs.unlink(path.resolve(Aprendices.HojaVida));
    }

    var mensaje: mensaje = {
        icon: "success",
        titulo: "Se elimino exitosamente",
        mensaje: "El registro del aprendiz " + name
    }

    return res.status(200).json(mensaje);

}

//Actualizar Aprendiz
export async function ActualizarAprendiz(
    req: Request,
    res: Response
): Promise<Response> {
    const { id } = req.params;
    const UpAprendiz = req.body;

    const Aprendices = await Aprendiz.findByIdAndUpdate(
        id,
        
            UpAprendiz
        ,
        { new: true }
    );

    return res.json(Aprendices);
}

//Actualizar Hoja de Vida
export async function ActualizarHojaVidaAprendiz(
    req: Request,
    res: Response
): Promise<Response> {
    const { id } = req.params;
    const aprendiz = (await Aprendiz.findById(id)) as IAprendiz;

    if (aprendiz) {
        await fs.unlink(path.resolve(aprendiz.HojaVida));
    }
    const Aprendices = await Aprendiz.findByIdAndUpdate(
        id,
        {
            HojaVida: req.file.path
        },
        { new: true }
    );

    return res.json(Aprendices);
}



// Descargar Hoja de vida
/*export async function DownloadPdf(req: Request, res: Response) {

    const { id } = req.params;
    const aprendiz = (await Aprendiz.findById(id)) as IAprendiz;



    const filepath = path.join(__dirname,'../uploads') +'/'+ req.body.filename;
    res.sendFile(filepath);
}*/