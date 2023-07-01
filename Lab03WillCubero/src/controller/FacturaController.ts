import { Request, Response
 } from "express";
import { Detalle_factura 
} from "../entity/Detalle_factura";
import { AppDataSource 
} from "../data-source";
import { Cabecera_factura 
} from "../entity/Cabecera_factura";
import { Factura 
} from "../entity/Factura";
import { Producto 
} from "../entity/Producto";

class FacturaController {
  //----------------- Metodo de Obtener las facturas --------------------------------//

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
        return resp
          .status(404)
          .json({ mensaje: "¡ATENCION USUARIO! no existe ninguna factura" });
      }
      // Si hay registros, devolver las listas de Cabecera_factura y Detalle_factura con código de estado 200
      return resp.status(200).json([ListaCabeRepo, ListaDetFacRepo]);
    } catch (error) {
      // Manejo de errores: devolver un mensaje de error con código de estado 400
      return resp.status(400).json({ mensaje: error.error });
    }
  };

  //

  //----------------- Metodo de eliminacion de facturas --------------------------------//

  // Este Método es para eliminar todas las facturas
  /**
   * Elimina lógicamente una factura.
   * Se debe proporcionar el ID de la factura a eliminar.
   * Realiza validaciones de reglas de negocio necesarias antes de eliminar la factura.
   */
  static deleteAll = async (req: Request, resp: Response) => {
    try {
      const id = parseInt(req.params["id"]);
      if (!id) {
        // Verificar si no se proporcionó un ID válido
        return resp
          .status(404)
          .json({
            mensaje: "¡USUARIO! Debe indicar el ID de la factura a eliminar",
          });
      }

      const facturaRepo = AppDataSource.getRepository(Factura);

      // Buscar la factura en la base de datos utilizando el ID proporcionado
      const factura = await facturaRepo.findOne({ where: { id: id } });
      if (!factura) {
        // Verificar si no se encontró la factura con el ID proporcionado
        return resp
          .status(404)
          .json({
            mensaje: "¡ATENCION USUARIO! No se encuentra la factura con ese ID",
          });
      }

      // Verificar si la factura ya está eliminada lógicamente
      if (factura.eliminada) {
        return resp
          .status(400)
          .json({
            mensaje: "¡ATENCION USUARIO! La factura ya ha sido eliminada",
          });
      }

      // Realizar las operaciones adicionales de validación y reglas de negocio aquí
      // Establecer el campo "eliminada" en true para la factura
      factura.eliminada = true;
      await facturaRepo.save(factura);

      return resp
        .status(200)
        .json({
          mensaje: "¡ATENCION USUARIO! La factura se eliminó correctamente",
        });
    } catch (error) {
      // Manejo de errores: devolver un mensaje de error
      return resp
        .status(400)
        .json({ mensaje: "¡ATENCION USUARIO! No se pudo eliminar la factura" });
    }
  };

  //----------------- Metodo de AddAll de facturas --------------------------------//

  static addAll = async (req: Request, resp: Response) => {
    try {
      // Se necesita obtener los datos del cuerpo de la solicitud
      const {
        Numero, // Número de la factura
        Fecha, // Fecha de la factura
        Ruc_Cliente, // RUC del cliente
        Estado, // Estado de la factura
        Codigo_vendedor, // Código del vendedor
        Cantidad, // Cantidad de productos
        Codigo_producto, // Código del producto

        // El req.body acceder a los
        //datos enviados en el cuerpo de una solicitud HTTP y utilizarlos en el servidor
      } = req.body;

      // Luego se realiza la Comprobaciones de validez de los datos recibidos
      if (!Numero) {
        return resp
          .status(404)
          .json({ mensaje: "¡ATENCION USUARIO! Debe indicar el Numero" });
      }
      if (!Estado) {
        return resp
          .status(404)
          .json({ mensaje: "¡ATENCION USUARIO! Debe indicar el estado" });
      }
      if (!Fecha) {
        return resp
          .status(404)
          .json({ mensaje: " ¡ATENCION USUARIO! Debe indicar la fecha" });
      }
      if (!Ruc_Cliente) {
        return resp
          .status(404)
          .json({ mensaje: " ¡ATENCION USUARIO! Debe indicar el Ruc_Cliente" });
      }
      if (!Codigo_vendedor) {
        return resp
          .status(404)
          .json({ mensaje: "¡ATENCION USUARIO! Debe indicar el vendedor" });
      }
      if (Cantidad < 0) {
        return resp
          .status(404)
          .json({
            mensaje: "¡ATENCION USUARIO! Debe indicar la Cantidad mayor que 0",
          });
      }
      if (!Codigo_producto) {
        return resp
          .status(404)
          .json({
            mensaje: "¡ATENCION USUARIO! Debe indicar el Codigo del Productos",
          });
      }

      // Realizo los repositorios de las entidades para Obtener Cabecera_factura y Detalle_factura
      const LaCabceraRepo = AppDataSource.getRepository(Cabecera_factura);
      const ElDetalleRepo = AppDataSource.getRepository(Detalle_factura);

      let LaFacturaCab, EsteFacturaDet, productosCab;

      // Verificar si la factura ya existe en la base de datos
      LaFacturaCab = await LaCabceraRepo.findOne({ where: { Numero } });
      EsteFacturaDet = await ElDetalleRepo.findOne({
        where: { numero: Numero },
      });

      if (LaFacturaCab && EsteFacturaDet) {
        return resp
          .status(404)
          .json({
            mensaje:
              "¡ATENCION USUARIO! La factura ya existe en la base de datos",
          });
      }

      // Obtener el repositorio de la entidad Producto
      const productosD = AppDataSource.getRepository(Producto);

      // Convertir el Codigo_producto a un número entero
      const Codigo_Producto = parseInt(req.params["Codigo_producto"]);

      try {
        // Buscar el producto por su Codigo_producto en la base de datos
        productosCab = await productosD.findOneOrFail({
          where: { Codigo_producto: Codigo_producto },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({
            mensaje: "¡ATENCION USUARIO! No se encontro el producto con ese ID",
          });
      }

      // Crear nuevas instancias de las entidades Cabecera_factura y Detalle_factura
      let LaCabeceraFactura = new Cabecera_factura();
      let ElDetalledelaFactura = new Detalle_factura();

      // Asignar los valores a las propiedades de la Cabecera_factura y Detalle_factura
      LaCabeceraFactura.Numero = Numero;
      LaCabeceraFactura.Fecha = Fecha;
      LaCabeceraFactura.Fecha = Estado;
      LaCabeceraFactura.cliente = Ruc_Cliente;
      LaCabeceraFactura.vendedor = Codigo_vendedor;

      ElDetalledelaFactura.numero = Numero;
      ElDetalledelaFactura.cantidad = Cantidad;
      ElDetalledelaFactura.producto = Codigo_producto;

      // Guardar las instancias en la base de datos
      await LaCabceraRepo.save(LaCabeceraFactura);
      await ElDetalleRepo.save(ElDetalledelaFactura);

      return resp
        .status(200)
        .json({ mensaje: "¡ATENCION USUARIO! Producto Creado" });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  //----------------- Metodo de getById de facturas --------------------------------//

  static getById = async (req: Request, resp: Response) => {
    const Detalle_Factura = Cabecera_factura;
    let Numero;
    //Ponemos ecepxiones
    try {
      //Extraemos el id, en fomrato Int
      Numero = parseInt(req.params["numero"]);
      if (!Numero) {
        return resp.status(404).json({ mensaje: "No se indica el ID" });
      }
      //Hacemos la instancia del repositorio
      let LaFacturaCab, ElFacturaDet;

      // Podemos utilizar tambien el trycatch, y asi nos ahorramos el if
      try {
        //Utilizamos el findOneOrFail, para que cree una exepcion en caso de que no
        // Encuentre
        const LaCabceraRepo = AppDataSource.getRepository(Cabecera_factura);
        const ElDetalleRepo = AppDataSource.getRepository(Detalle_Factura);

        LaFacturaCab = await LaCabceraRepo.findOneOrFail({ where: { Numero } });
        ElFacturaDet = await ElDetalleRepo.findOneOrFail({ where: { Numero } });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontro la factura con ese ID" });
      }

      return resp.status(200).json({ LaFacturaCab, ElFacturaDet });
    } catch (error) {
      //En posible error, lo que hacemos es devolver el error
      return resp.status(400).json({ mensaje: error.error });
    }
  };

  //----------------- Metodo de update  de facturas --------------------------------//

  static update = async (req, resp) => {
    try {
      // Obtener el parámetro "Numero" de la solicitud y convertirlo a un número entero
      const Numero = parseInt(req.params["Numero"]);

      // Verificar si se proporcionó un número válido
      if (!Numero) {
        return resp.status(404).json({ mensaje: "No se indica el ID" });
      }

      // Obtener el repositorio de la entidad "Cabecera_factura"
      const detalles = AppDataSource.getRepository(Cabecera_factura);
      let detalle;

      try {
        // Buscar la factura con el número indicado y cargar la relación "detalle_factura"
        detalle = await detalles.findOneOrFail({
          where: { Numero: Numero },
          relations: {
            detalle_factura: true,
          },
        });

        // Extraer los valores de "Cod_Producto" y "cantidad" del cuerpo de la solicitud
        const {
          detalle: [Cod_Producto, cantidad],
        } = req.body;

        // Buscar el producto a actualizar por su código
        const productoToUpdate = await detalle.findOneBy({
          Cod_Pro: Cod_Producto,
        });

        // Actualizar las propiedades del producto con los nuevos valores
        productoToUpdate.Cod_Pro = Cod_Producto;
        productoToUpdate.cantidad = cantidad;

        // Guardar el producto actualizado en la base de datos
        await detalles.save(productoToUpdate);

        // Retornar una respuesta exitosa con un mensaje indicando que la factura ha sido actualizada
        return resp.status(200).json({ mensaje: "Factura actualizada" });
      } catch (error) {
        // Retornar una respuesta de error si no se encuentra la factura con el ID indicado
        return resp
          .status(404)
          .json({ mensaje: "No se encontró factura con ese ID" });
      }
    } catch (error) {
      // Retornar una respuesta de error si ocurre algún error durante la ejecución
      return resp.status(404).json({ mensaje: error });
    }
  };
}
export default FacturaController;
