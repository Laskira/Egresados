import { Router } from "express";

import {
    CrearFicha,
    ObtenerFicha,
    ObtenerFichas,
    EliminarFicha,
    ActualizarFicha,
    ShowFichas
} from "../controllers/fichas";
import { TokenValidation } from "../libs/verificarToken";

const RouterFichas: Router = Router();

RouterFichas.route("/")
    .post(TokenValidation, CrearFicha)
    .get(TokenValidation, ObtenerFichas);

RouterFichas.route("/mostrar").get(TokenValidation, ShowFichas);
 
RouterFichas.route("/:id")
   .delete(TokenValidation, EliminarFicha)
   .put(TokenValidation, ActualizarFicha)
   .get(TokenValidation, ObtenerFicha);

export default RouterFichas;