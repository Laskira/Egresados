import { Request, Response } from 'express';
import { encryptPassword, validateEncrypt } from '../libs/password';
import jwt from 'jsonwebtoken';

//Modelos
import  Administrador, { IAdministracion } from '../models/administradores';
import { mensaje } from 'interfaces';

//Crear Admin
export async function CrearAdmin(req: Request, res: Response) {
    const {Documento, Nombres, P_Apellido, S_Apellido, Password} = req.body;
    
    const NewAdmin = {Documento, Nombres, P_Apellido, S_Apellido, Password};

    const Administracion: IAdministracion = new Administrador(NewAdmin);

    Administracion.Password = await encryptPassword(Password);

    await Administracion.save(function (err) {
        if (err) {
            var mensaje: mensaje = {
                icon: "error",
                titulo: "Error",
                mensaje: "El documento ingresado ya se encuentra registrado"
            };
            return res.status(400).json(mensaje);
        }

        var mensaje: mensaje = {
            icon: "success",
            titulo: "Registrado exitosamente",
            mensaje: "Usted ha sido registrado exitosamente"
        };
        return res.status(200).json(mensaje);
    });

}

//Iniciar sesión
export async function IniciarSesion(
    req: Request, 
    res: Response
): Promise<Response> {
    const {Password, Documento} = req.body;

    const User = await Administrador.findOne({Documento: Documento});

    //Comprobación de Documento
    if(!User) {
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

    if(!passwordCorrecta) {
        var mensaje: mensaje = {
            icon: "error",
            titulo: "Error",
            mensaje: "La contraseña ingresada no coincide con el usuario"
        };
        return res.status(400).json(mensaje);
    }

    //Saludo
    var saludo: any = "Bienvenido " + User.Nombres

    const token: string = jwt.sign(
        {_id: User._id},
        process.env.TOKEN_SECRET || 'TokenTest'
    );

    return res.status(200).json({token, saludo});
}

//Perfil
export async function Perfil(req: Request, res: Response){
    const User = await Administrador.findById(req.url, {Password: 0});
    if(!User)
     return res.status(400).json("El usuario no se encuentra registrado")

    return res.json(User);
}

//Actualizar perfil
export async function ActualizarPerfil(
    req: Request,
    res: Response
): Promise<Response> {
    const {id} = req.params;
    const {Nombres, P_Apellido, S_Apellido, Password} = req.body;
    const UpdateUser = {Nombres, P_Apellido, S_Apellido, Password};

    UpdateUser.Password = await encryptPassword(Password);

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
    if(User) {
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
): Promise<Response> {
    const Users = await Administrador.find();

    Users.splice(0, 1);

    return res.json(Users);
}