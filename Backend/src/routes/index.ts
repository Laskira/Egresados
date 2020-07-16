import { Router } from "express";
const router = Router();

// Importar Rutas
import RouterAdministracion from './administradores';
import RouterSedes from "./sedes";
import RouterFormacion from "./formacion";
import RouterFichas from './fichas';
import RouterAprendiz from './aprendices';
import RouterHistorial from './historiales';
import RouterTrabajos from './trabajos';

// Usar Rutas
router.use("/admin", RouterAdministracion);
router.use("/sedes", RouterSedes);
router.use("/formacion", RouterFormacion);
router.use("/fichas", RouterFichas);
router.use("/aprendiz", RouterAprendiz);
router.use("/historial", RouterHistorial);
router.use("/trabajos", RouterTrabajos);

export default router;