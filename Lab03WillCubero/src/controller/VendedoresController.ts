import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Vendedor } from "../entity/Vendedor";

class VendedoresController {
  // Método para obtener todos los vendedores
  static getVendedores = async (req: Request, resp: Response) => {
    try {
      // Obtener el repositorio de Vendedor
      const vendedoresRepo = AppDataSource.getRepository(Vendedor);

      // Obtener la lista de vendedores
      const listaVendedores = await vendedoresRepo.find();

      // Verificar si no se encontraron vendedores
      if (listaVendedores.length == 0) {
        // Devolver un mensaje de error con código de estado 404
        return resp
          .status(404)
          .json({ mensaje: "Atencion usuario no se encontraron resultados" });
      }

      // Devolver la lista de vendedores con código de estado 200
      return resp.status(200).json({ listaVendedores });
    } catch (error) {
      // Manejo de errores: devolver un mensaje de error con código de estado 400
      return resp.status(400).json({ mensaje: error });
    }
  };

  // Método para obtener un vendedor por su ID
  static getVendedor = async (req: Request, resp: Response) => {
    try {
      const Codigo_vendedor = parseInt(req.params["id"]);

      // Verificar si no se proporcionó un ID
      if (!Codigo_vendedor) {
        // Devolver un mensaje de error con código de estado 404
        return resp.status(404).json({ mensaje: "No se indica el ID" });
      }

      // Obtener el repositorio de Vendedor
      const vendedoresRepo = AppDataSource.getRepository(Vendedor);
      let vendedor;

      try {
        // Buscar el vendedor por su ID
        vendedor = await vendedoresRepo.findOneOrFail({
          where: { Codigo_vendedor },
        });
      } catch (error) {
        // Devolver un mensaje de error con código de estado 404 si no se encontró el vendedor
        return resp
          .status(404)
          .json({ mensaje: "No se encontro el vendedor con ese ID" });
      }

      // Devolver el vendedor encontrado con código de estado 200
      return resp.status(200).json({ vendedor });
    } catch (error) {
      // Manejo de errores: devolver un mensaje de error con código de estado 400
      return resp.status(400).json({ mensaje: error.error });
    }
  };
}

export default VendedoresController;
