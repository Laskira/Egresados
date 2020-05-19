import { Router } from "express";

import {
    CrearAdmin,
    IniciarSesion,
    Perfil,
    ActualizarPerfil,
    EliminarCuenta,
    VerCuentas
} from "../controllers/administradores";
import { TokenValidation } from "../libs/verificarToken";

const RouterAdministracion: Router = Router();

RouterAdministracion.route("/")
  .post(CrearAdmin)
  .get(TokenValidation, Perfil);

RouterAdministracion.route("/:id")
  .put(TokenValidation, ActualizarPerfil)
  .delete(TokenValidation, EliminarCuenta);

RouterAdministracion.route("/acceder").post(IniciarSesion);

RouterAdministracion.route("/cuentas").get(TokenValidation, VerCuentas);

export default RouterAdministracion;