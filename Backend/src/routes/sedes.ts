import { Router } from "express";

import {
    CrearSede,
    ObtenerSede,
    EliminarSede,
    ActualizarSede
} from "../controllers/sedes";
import { TokenValidation } from "../libs/verificarToken";

const RouterSedes: Router = Router();

RouterSedes.route("/")
  .post(TokenValidation, CrearSede)
  .get(TokenValidation, ObtenerSede);

RouterSedes.route("/:id")
  .delete(TokenValidation, EliminarSede)
  .put(TokenValidation, ActualizarSede);

export default RouterSedes;