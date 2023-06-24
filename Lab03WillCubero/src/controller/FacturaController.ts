import { Request, Response } from "express";
import { Detalle_factura } from "../entity/Detalle_factura";
import { AppDataSource } from "../data-source";
import { Cabecera_factura } from "../entity/Cabecera_factura";

class FacturaController {
  static getAll = async (req: Request, resp: Response) => {
    // Obtener el repositorio de Cabecera_factura
    const CabeRepo = AppDataSource.getRepository(Cabecera_factura);
    // Obtener el repositorio de Detalle_factura
    const DetFacRepo = AppDataSource.getRepository(Detalle_factura);
    try {
      // Obtener la lista de Cabecera_factura
      const ListaCabeRepo = await CabeRepo.find();
      // Obtener la lista de Detalle_factura
      const ListaDetFacRepo = await DetFacRepo.find();
      // Verificar si no existen registros en ninguna de las listas
      if (ListaCabeRepo.length == 0 && ListaDetFacRepo.length == 0) {
        // Si no hay registros, devolver un mensaje de error con código de estado 404
        return resp.status(404).json({ mensaje: 'Atencion Usuario no existe ninguna factura' })
      }
      // Si hay registros, devolver las listas de Cabecera_factura y Detalle_factura con código de estado 200
      return resp.status(200).json([ListaCabeRepo, ListaDetFacRepo]);
    } catch (error) {
      // Manejo de errores: devolver un mensaje de error con código de estado 400
      return resp.status(400).json({ mensaje: error.error });
    }
  }
}

export default FacturaController;
