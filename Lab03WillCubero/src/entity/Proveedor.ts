import { Column, Entity, PrimaryColumn, OneToMany } from "typeorm";
import { Producto } from "./Producto";

@Entity() // Indica que esta clase es una entidad de base de datos
export class Proveedor {
  @PrimaryColumn({ unique: true }) // Marca la propiedad como la clave primaria de la tabla y única
  Codigo_proveedor: number;

  @Column({ type: "varchar", length: 45, nullable: false }) // Define una columna de tipo cadena de texto con longitud máxima y no nula
  Nombres_proveedor: string;

  @Column({ type: "varchar", length: 45, nullable: false }) // Define una columna de tipo cadena de texto con longitud máxima y no nula
  Apellidos_proveedor: string;

  @Column({ type: "varchar", length: 100, nullable: false }) // Define una columna de tipo cadena de texto con longitud máxima y no nula
  Direccion_proveedor: string;

  @Column({ type: "varchar", length: 20, nullable: false }) // Define una columna de tipo cadena de texto con longitud máxima y no nula
  Provincia_proveedor: string;

  @Column({ nullable: false }) // Define una columna numérica no nula
  Telefono_proveedor: number;

  @OneToMany(() => Producto, (producto) => producto.proveedor) // Establece una relación de uno a muchos con la entidad Producto
  productos: Producto[];

//Guia para revision
  //@OneToMany(()=>Producto,(producto)=>producto.proveedor)
  //producto:Producto[]

}
