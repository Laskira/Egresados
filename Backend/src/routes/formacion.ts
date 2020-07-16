import { Router } from "express";

import { 
    CrearFormacion,
    ObtenerFormacion,
    ObtenerFormaciones,
    EliminarFormacion,
    ActualizarFormacion
 } from "../controllers/formacion";
import { TokenValidation } from "../libs/verificarToken";

const RouterFormacion: Router = Router();

RouterFormacion.route("/")
  .post(TokenValidation, CrearFormacion)
  .get(TokenValidation, ObtenerFormaciones);

RouterFormacion.route("/:id")
   .delete(TokenValidation, EliminarFormacion)
   .put(TokenValidation, ActualizarFormacion)
   .get(TokenValidation, ObtenerFormacion);

export default RouterFormacion;