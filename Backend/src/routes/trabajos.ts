import { Router } from "express";

import {
    RegistrarTrabajo,
    ObtenerTrabajos,
    EliminarTrabajo,
    ActualizarEmpleo,
    ObtenerTrabajo
} from '../controllers/trabajos';
import { TokenValidation } from "../libs/verificarToken";

const RouterTrabajos: Router = Router();

RouterTrabajos.route("/")
 .post(TokenValidation, RegistrarTrabajo)
 .get(TokenValidation, ObtenerTrabajos);

RouterTrabajos.route("/:id")
  .delete(TokenValidation, EliminarTrabajo)
  .put(TokenValidation, ActualizarEmpleo)
  .get(TokenValidation, ObtenerTrabajo);

export default RouterTrabajos;