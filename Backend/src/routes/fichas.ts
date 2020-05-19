import { Router } from "express";

import {
    CrearFicha,
    ObtenerFicha
} from "../controllers/fichas";
import { TokenValidation } from "../libs/verificarToken";

const RouterFichas: Router = Router();

RouterFichas.route("/")
    .post(TokenValidation, CrearFicha)
    .get(TokenValidation, ObtenerFicha);

export default RouterFichas;