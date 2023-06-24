import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Cabecera_factura } from "../entity/Cabecera_factura";

class Cabecera_facturaController {
  // Este Método sirve para obtener las cabeceras de facturas
  static getCabecera_facturas = async (req: Request, resp: Response) => {
    try {
      // Lo que logro realizar es para Obtener el repositorio de facturas
      const facturasRepo = AppDataSource.getRepository(Cabecera_factura);

      //  Lo que realizo es poder Obtener la lista de facturas
      const listaFacturas = await facturasRepo.find();

      // Lo que realizo en esta linea de codigo es Verificar si la lista de facturas está vacía
      if (listaFacturas.length == 0) {
        // En esta linea en tonces si  está vacía, devolver un mensaje de error con código de estado 404
        return resp.status(404).json({ mensaje: '¡ATENCION! Lo siento pero no se encontró resultados esperados' });
      }

      // Si la lista de facturas no está vacía, devolver la lista de facturas con código de estado 200
      return resp.status(200).json({ listaFacturas });

    } catch (error) {
      // Manejo de errores: devolver un mensaje de error con código de estado 400
      return resp.status(400).json({ mensaje: error });
    }
  }
}


export default Cabecera_facturaController;