import { Router } from "express";
import FacturaController from "../controller/FacturaController";




const routes = Router();

routes.get('', FacturaController.getAll);
routes.delete("/:id", FacturaController.deleteAll);
//routes.post('/factura', FacturaController.addAll);
routes.post('', FacturaController.addAll);
routes.get('/:Numero',FacturaController.getById);
routes.put("/:numero", FacturaController.update);

// /:id
//routes.delete("/Factura/:id", FacturaController.deleteAll);
//routes.delete('',FacturaController.deleteAll);




export  default routes;