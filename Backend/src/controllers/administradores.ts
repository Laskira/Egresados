import { Request, Response } from 'express';
import { encryptPassword, validateEncrypt } from '../libs/password';
import jwt from 'jsonwebtoken';

//Modelos
import Administrador, { IAdministracion } from '../models/administradores';
import { mensaje } from 'interfaces';

//Crear Admin
export async function CrearAdmin(req: Request, res: Response) {

    const NewAdmin: IAdministracion = req.body;

    NewAdmin.Password = await encryptPassword(NewAdmin.Password);

    await Administrador.create(NewAdmin).then((Admin) => {
        var mensaje: mensaje = {
            icon: "success",
            titulo: "Registrado exitosamente",
            mensaje: "Usted ha sido registrado exitosamente"
        };
        return res.status(200).json(mensaje);
    })

        .catch((err) => {
            var mensaje: mensaje = {
                icon: "error",
                titulo: "Error",
                mensaje: "El documento ingresado ya se encuentra registrado"
            };
            return res.status(400).json(mensaje);
        })

}

//Iniciar sesión
export async function IniciarSesion(
    req: Request,
    res: Response
): Promise<Response> {
    const { Password, Documento } = req.body;

    const User = await Administrador.findOne({ Documento: Documento });

    //Comprobación de Documento
    if (!User) {
        var mensaje: mensaje = {
            icon: "errror",
            titulo: "Error",
            mensaje: "El usuario ingresado no se encuentra registrado"
        }

        return res.status(400).json(mensaje);
    }

    //Comprobación de contraseña
    const passwordCorrecta: boolean = await validateEncrypt(
        Password,
        User.Password
    );

    if (!passwordCorrecta) {
        var mensaje: mensaje = {
            icon: "error",
            titulo: "Error",
            mensaje: "La contraseña ingresada no coincide con el usuario"
        };
        return res.status(400).json(mensaje);
    }

    const token: string = jwt.sign(
        { _id: User._id },
        process.env.TOKEN_SECRET || 'TokenTest'
    );

    return res.status(200).json({ token });
}

//Perfil
export async function Perfil(req: Request, res: Response): Promise<Response> {
    const User = await Administrador.findById(req.url, { Password: 0 });
    if (!User)
        return res.status(400).json("El usuario no se encuentra registrado")

    return res.json(User);
}

//Actualizar perfil
export async function ActualizarPerfil(
    req: Request,
    res: Response
): Promise<Response> {
    const { id } = req.params;
    const UpdateUser = req.body;

    UpdateUser.Password = await encryptPassword(UpdateUser.Password);

    const UpdateAcount = await Administrador.findByIdAndUpdate(id, UpdateUser, {
        new: true
    });

    return res.json(UpdateAcount);
}

//Eliminar cuenta
export async function EliminarCuenta(
    req: Request,
    res: Response
): Promise<Response> {
    const { id } = req.params;
    const User = await Administrador.findByIdAndRemove(id);

    let nombre: string = "";
    if (User) {
        nombre = User.Nombres;
    }

    var mensaje: mensaje = {
        icon: "success",
        titulo: "Se ha eliminado exitosamente",
        mensaje: "La cuenta de " + nombre
    };

    return res.status(200).json(mensaje);
}

//Ver cuentas
export async function VerCuentas(
    req: Request,
    res: Response
) {
    await Administrador.find()
    .sort({Documento: 1})
    .then((Admin) => {
        return res.status(200).json(Admin);
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