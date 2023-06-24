import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Detalle_factura } from "./Detalle_factura";
// Importa las clases y decoradores necesarios de TypeORM

@Entity() // Indica que esta clase es una entidad de base de datos
export class Factura {
  @PrimaryColumn() // Define la columna como clave primaria
  id: number;

  @Column() // Define una columna numérica
  Ruc_Cliente: number;

  @Column() // Define una columna de tipo fecha
  fecha: Date;
  
   //@OneToMany(() => DetalledeFactura, (detallefacturacion) => detallefacturacion.factura)
   //detallefacturacion: DetalledeFactura[];

  @OneToMany(()=>Detalle_factura,(detallefacturacion)=>detallefacturacion.factura)
  detallefacturacion: Detalle_factura[];
}
