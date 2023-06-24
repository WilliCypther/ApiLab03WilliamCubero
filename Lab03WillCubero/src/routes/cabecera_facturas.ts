import { Router } from "express";
import Cabecera_facturaController from "../controller/Cabecera_facturaController";




const routes = Router();

routes.get('', Cabecera_facturaController.getCabecera_facturas);



export  default routes;