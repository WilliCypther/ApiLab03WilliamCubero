import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Cliente } from "./Cliente";
import { Vendedor } from "./Vendedor";
import { Detalle_factura } from "./Detalle_factura";

@Entity() // Indica que esta clase es una entidad de base de datos
export class Cabecera_factura {
  @PrimaryColumn({ unique: true }) // Define la columna como clave primaria
  Numero: number;

  @Column({ nullable: false, type: "date" }) // Define una columna
  Fecha: Date;

  @ManyToOne(() => Cliente, (cliente) => cliente.cabecera_facturas) // Define una relación ManyToOne con la entidad Cliente
  cliente: Cliente;

  @ManyToOne(() => Vendedor, (vendedor) => vendedor.cabecera_facturas) // Define una relación ManyToOne con la entidad Vendedor
  vendedor: Vendedor;

  @OneToMany(() => Detalle_factura, (detalle_factura) => detalle_factura.cabecera_factura) // Define una relación OneToMany con la entidad Detalle_factura
  detalle_factura: Detalle_factura[];


  //@ManyToOne( ()=> DetalledeFactura,(detallefactura)=>detallefactura.cabecerafacturacion)
 // detallefactura: DetalledeFactura

}
