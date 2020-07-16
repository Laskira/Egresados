import { Router } from "express";

import {
    CrearSede,
    ObtenerSedes,
    ObtenerSede,
    EliminarSede,
    ActualizarSede
} from "../controllers/sedes";
import { TokenValidation } from "../libs/verificarToken";

const RouterSedes: Router = Router();

RouterSedes.route("/")
  .post(TokenValidation, CrearSede)
  .get(TokenValidation, ObtenerSedes);

RouterSedes.route("/:id")
  .delete(TokenValidation, EliminarSede)
  .put(TokenValidation, ActualizarSede)
  .get(TokenValidation, ObtenerSede);

export default RouterSedes;