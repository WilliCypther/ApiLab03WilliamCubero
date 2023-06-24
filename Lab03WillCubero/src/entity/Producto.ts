import { Column, Entity, PrimaryColumn, ManyToOne, OneToMany } from "typeorm";
import { Proveedor } from "./Proveedor";
import { Detalle_factura } from "./Detalle_factura";

@Entity() // Indica que esta clase es una entidad de base de datos
export class Producto {
  @PrimaryColumn() // Marca la propiedad como la clave primaria de la tabla
  Codigo_producto: number;

  @Column({ type: "varchar", length: 200, nullable: false }) // Define una columna de tipo cadena de texto con longitud máxima y no nula
  Descripcion_producto: string;

  @Column({ nullable: false }) // Define una columna numérica no nula
  Precio_producto: number;

  @Column({ nullable: false }) // Define una columna numérica no nula
  Stock_maximo_producto: number;

  @Column({ nullable: false }) // Define una columna numérica no nula
  Stock_minimo_producto: number;

  @ManyToOne(() => Proveedor, (proveedor) => proveedor.productos) // Establece una relación de muchos a uno con la entidad Proveedor
  proveedor: Proveedor;

  @OneToMany(() => Detalle_factura, (detalle_factura) => detalle_factura.producto) // Establece una relación de uno a muchos con la entidad Detalle_factura
  detalle_factura: Detalle_factura[];
}
