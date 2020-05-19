import { Router } from "express";
const router = Router();

// Importar Rutas
import RouterSedes from "./sedes";
import RouterFormacion from "./formacion";
import RouterFichas from './fichas';
import RouterAdministracion from './administradores';

// Usar Rutas
router.use("/sedes", RouterSedes);
router.use("/formacion", RouterFormacion);
router.use("/fichas", RouterFichas);
router.use("/admin", RouterAdministracion)

export default router;