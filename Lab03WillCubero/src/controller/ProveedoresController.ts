import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Proveedor } from "../entity/Proveedor";

class ProveedoresController {
  // Método para obtener todos los proveedores
  static getProveedores = async (req: Request, resp: Response) => {
    try {
      // Obtener el repositorio de Proveedor
      const proveedoresRepo = AppDataSource.getRepository(Proveedor);

      // Obtener la lista de proveedores
      const listaProveedores = await proveedoresRepo.find();

      // Verificar si no se encontraron proveedores
      if (listaProveedores.length == 0) {
        // Devolver un mensaje de error con código de estado 404
        return resp
          .status(404)
          .json({ mensaje: "Atencion usuario no se encontraron resultados" });
      }

      // Devolver la lista de proveedores con código de estado 200
      return resp.status(200).json({ listaProveedores });
    } catch (error) {
      // Manejo de errores: devolver un mensaje de error con código de estado 400
      return resp.status(400).json({ mensaje: error });
    }
  };

  // Método para obtener un proveedor por su ID
  static getProveedor = async (req: Request, resp: Response) => {
    try {
      const Codigo_proveedor = parseInt(req.params["id"]);

      // Verificar si no se proporcionó un ID
      if (!Codigo_proveedor) {
        // Devolver un mensaje de error con código de estado 404
        return resp.status(404).json({ mensaje: "No se indica el ID" });
      }

      // Obtener el repositorio de Proveedor
      const productosRepo = AppDataSource.getRepository(Proveedor);
      let proveedor;

      try {
        // Buscar el proveedor por su ID
        proveedor = await productosRepo.findOneOrFail({
          where: { Codigo_proveedor },
        });
      } catch (error) {
        // Devolver un mensaje de error con código de estado 404 si no se encontró el proveedor
        return resp
          .status(404)
          .json({ mensaje: "No se encontro el proveedor con ese ID" });
      }

      // Devolver el proveedor encontrado con código de estado 200
      return resp.status(200).json({ proveedor });
    } catch (error) {
      // Manejo de errores: devolver un mensaje de error con código de estado 400
      return resp.status(400).json({ mensaje: error.error });
    }
  };
}

export default ProveedoresController;
