import { Router } from "express";

import {
  CrearHistorial,
  ObtenerHistoriales,
  ObtenerHistorial,
  EliminarHistorial,
  ActualizarHistorial,
  ActualizarPruebaHistorial,
  ObtenerHistorialAprendiz,
} from "../controllers/historiales";
import multer from "../libs/multer";
import { TokenValidation } from "../libs/verificarToken";

const RouterHistorial: Router = Router();
RouterHistorial.route("/")
  .get(ObtenerHistoriales)
  .post(multer.single("Pruebas"), TokenValidation, CrearHistorial);

RouterHistorial.route("/:id")
  .get(TokenValidation, ObtenerHistorial)
  .delete(TokenValidation, EliminarHistorial)
  .put(TokenValidation, ActualizarHistorial);

RouterHistorial.route("/show/:id").get(ObtenerHistorialAprendiz);

RouterHistorial.route("/prueba/:id").put(
  multer.single("Pruebas"),
  ActualizarPruebaHistorial,
  TokenValidation
);

export default RouterHistorial;
