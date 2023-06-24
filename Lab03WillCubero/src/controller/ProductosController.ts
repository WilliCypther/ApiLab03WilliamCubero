import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Producto } from "../entity/Producto";

class ProductosController {
  // Método para obtener todos los productos
  static getProductos = async (req: Request, resp: Response) => {
    try {
      const productosRepo = AppDataSource.getRepository(Producto);

      // Obtener la lista de productos
      const listaProductos = await productosRepo.find();

      if (listaProductos.length == 0) {
        // No se encontraron productos
        return resp
          .status(404)
          .json({ mensaje: "Atencion usuario no se encontraron resultados" });
      }

      // Devolver la lista de productos encontrados
      return resp.status(200).json({ listaProductos });
    } catch (error) {
      // Error al obtener los productos
      return resp.status(400).json({ mensaje: error });
    }
  };

  // Método para obtener un producto por su código
  static getCodigo = async (req: Request, resp: Response) => {
    try {
      const Codigo_producto = parseInt(req.params["id"]);

      if (!Codigo_producto) {
        // No se proporcionó un ID válido
        return resp.status(404).json({ mensaje: "No se indica el ID" });
      }

      const productosRepo = AppDataSource.getRepository(Producto);
      let producto;

      try {
        // Buscar el producto por su código
        producto = await productosRepo.findOneOrFail({
          where: { Codigo_producto },
        });
      } catch (error) {
        // No se encontró el producto con el código proporcionado
        return resp
          .status(404)
          .json({ mensaje: "No se encontro el producto con ese ID" });
      }

      // Devolver el producto encontrado
      return resp.status(200).json({ producto });
    } catch (error) {
      // Error al obtener el producto
      return resp.status(400).json({ mensaje: error.error });
    }
  };
}

export default ProductosController;
