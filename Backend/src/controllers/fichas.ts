import { Request, Response } from 'express';

//Modelos
import Fichas, { IFicha } from '../models/fichas';
import { mensaje } from 'interfaces';
import { Promise } from 'mongoose';

//Crear Ficha
export async function CrearFicha(req: Request, res: Response) {
    const { Numero, Formacion, Sede, InicioFormacion, FinLectiva, FinFormacion, Instructor } = req.body;

    const NewFicha = { Numero, Formacion, Sede, InicioFormacion, FinLectiva, FinFormacion, Instructor }

    const Ficha: IFicha = new Fichas(NewFicha);

    await Ficha.save(function (err) {
        if (err) {
            var mensaje: mensaje = {
                icon: "error",
                titulo: "Error",
                mensaje: "Esta ficha ya se encuentra registrada"
            };
            return res.status(400).json(mensaje);
        }

        var mensaje: mensaje = {
            icon: "success",
            titulo: "Se guardo exitosamente",
            mensaje: "El registro de la ficha " + Numero
        };

        return res.status(200).json(mensaje);
    });
}

//Mostrar fichas
export async function ObtenerFicha(
    req: Request,
    res: Response
): Promise<Response> {
    const Ficha  = await Fichas.find().populate('Formacion').populate('Sede').exec();
    return res.json(Ficha);
}

//