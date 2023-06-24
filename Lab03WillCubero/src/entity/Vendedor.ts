import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Cabecera_factura } from "./Cabecera_factura";

@Entity() // Indica que esta clase es una entidad de base de datos
export class Vendedor {
  @PrimaryColumn({ unique: true }) // Marca la propiedad como la clave primaria de la tabla y única
  Codigo_vendedor: number;

  @Column({ type: "varchar", length: 45, nullable: false }) // Define una columna de tipo cadena de texto con longitud máxima y no nula
  Nombres_vendedor: string;

  @Column({ type: "varchar", length: 45, nullable: false }) // Define una columna de tipo cadena de texto con longitud máxima y no nula
  Apellidos_vendedor: string;

  @Column({ type: "varchar", length: 100, nullable: false }) // Define una columna de tipo cadena de texto con longitud máxima y no nula
  Direccion_vendedor: string;

  @Column({ nullable: false }) // Define una columna numérica no nula
  Telefono_vendedor: number;

  @Column({ nullable: false }) // Define una columna numérica no nula
  Celular_vendedor: number;

  @OneToMany(() => Cabecera_factura, (cabecera_factura) => cabecera_factura.vendedor) // Establece una relación de uno a muchos con la entidad Cabecera_factura
  cabecera_facturas: Cabecera_factura[];
}
