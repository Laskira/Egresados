import { Router } from "express";

import { 
    CrearFormacion,
    ObtenerFormacion
 } from "../controllers/formacion";
import { TokenValidation } from "../libs/verificarToken";

const RouterFormacion: Router = Router();

RouterFormacion.route("/")
  .post(TokenValidation, CrearFormacion)
  .get(TokenValidation, ObtenerFormacion);

export default RouterFormacion;