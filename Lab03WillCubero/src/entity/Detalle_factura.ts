import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Cabecera_factura } from "./Cabecera_factura";
import { Producto } from "./Producto";
import { Factura } from "./Factura";

@Entity() // Indica que esta clase es una entidad de base de datos
export class Detalle_factura {
  @PrimaryColumn({ unique: true, nullable: false }) // Define la columna como clave primaria
  numero: number;

  @PrimaryColumn({ unique: true, nullable: false }) // Define la columna como clave primaria
  codigo_producto: number;

  @ManyToOne(() => Cabecera_factura, cabecera_factura => cabecera_factura.detalle_factura)
  @JoinColumn({ name: 'numero' }) // Especifica la columna de unión para la relación ManyToOne
  cabecera_factura: Cabecera_factura;

  @Column() // Define una columna
  cantidad: number;

  @ManyToOne(() => Producto, producto => producto.detalle_factura)
  @JoinColumn({ name: 'codigo_producto' }) // Especifica la columna de unión para la relación ManyToOne
  producto: Producto;


 @ManyToOne(()=>Factura,(factura)=>factura.detallefacturacion)
 @JoinColumn({name:"num_factura"})
 factura:Factura



 //@OneToMany(() =>CabeceraFacturacion, (cabecerafacturacion)=>cabecerafacturacion.detallefactura)
 //cabecerafacturacion: CabeceraFacturacion[]


 //Revisar el error si sale mal algo
 //@ManyToOne(()=>Producto, (producto)=>producto.detallefacturacion)
 //@JoinColumn({name:"id"})
 //producto:Producto



}
