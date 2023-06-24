import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Cliente } from "../entity/Cliente";

class ClientesController {
  // Método para obtener todos los clientes
  static getClientes = async (req: Request, resp: Response) => {
    try {
      // Obtener el repositorio de clientes
      const clientesRepo = AppDataSource.getRepository(Cliente);

      // Obtener la lista de clientes
      const listaClientes = await clientesRepo.find();

      // Verificar si la lista de clientes está vacía
      if (listaClientes.length == 0) {
        // Si está vacía, devolver un mensaje de error con código de estado 404
        return resp.status(404).json({ mensaje: 'Atencion Usuario no se encontraron los resultados requeridos' });
      }

      // Si la lista de clientes no está vacía, devolver la lista de clientes con código de estado 200
      return resp.status(200).json({ listaClientes });

    } catch (error) {
      // Manejo de errores: devolver un mensaje de error con código de estado 400
      return resp.status(400).json({ mensaje: error });
    }
  }

  // Método para obtener un cliente específico por su ID
  static getCliente = async (req: Request, resp: Response) => {
    try {
      // Obtener el ID del cliente de los parámetros de la solicitud
      const Ruc_cliente = parseInt(req.params["id"]);

      // Verificar si se proporcionó un ID válido
      if (!Ruc_cliente) {
        // Si no se proporcionó un ID válido, devolver un mensaje de error con código de estado 404
        return resp.status(404).json({ mensaje: ' ID no encontrado' })
      }

      // Obtener el repositorio de clientes
      const clientesRepo = AppDataSource.getRepository(Cliente);
      let cliente;

      try {
        // Intentar encontrar el cliente en el repositorio usando el ID proporcionado
        cliente = await clientesRepo.findOneOrFail({ where: { Ruc_cliente } })
      } catch (error) {
        // Si no se encontró el cliente, devolver un mensaje de error con código de estado 404
        return resp.status(404).json({ mensaje: '¡Atencion Usuario! no se encontro el cliente con el ID proporcionado' })
      }

      // Si se encontró el cliente, devolver el cliente encontrado con código de estado 200
      return resp.status(200).json({ cliente })
    } catch (error) {
      // Manejo de errores: devolver un mensaje de error con código de estado 400
      return resp.status(400).json({ mensaje: error.error });
    }
  }
}

export default ClientesController;
