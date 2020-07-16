import { Router } from "express";

import {
   CrearAprendiz,
   ObtenerAprendices,
   ObtenerAprendizId,
   EliminarAprendiz,
   ActualizarAprendiz,
   ActualizarHojaVidaAprendiz,
   ObtenerPdf
} from "../controllers/aprendices";
import multer from "../libs/multer";
import { TokenValidation } from "../libs/verificarToken";

const RouterAprendiz: Router = Router();

RouterAprendiz.route("/")
   .get(TokenValidation, ObtenerAprendices)
   .post(multer.single('HojaVida'), TokenValidation, CrearAprendiz);

RouterAprendiz.route("/:id")
   .get(TokenValidation, ObtenerAprendizId)
   .delete(TokenValidation, EliminarAprendiz)
   .put(TokenValidation, ActualizarAprendiz);

RouterAprendiz.route("/hoja/:id")
  .put(
     multer.single("HojaVida"), 
  ActualizarHojaVidaAprendiz, 
  TokenValidation);

export default RouterAprendiz;