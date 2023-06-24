import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Cabecera_factura } from "./Cabecera_factura";

@Entity() // Indica que esta clase es una entidad de base de datos
export class Cliente {
  @PrimaryColumn({ unique: true }) // Define la columna como clave primaria
  Ruc_cliente: number;

  @Column({ type: "varchar", length: 45, nullable: false }) // Define una columna
  Nombres_cliente: string;

  @Column({ type: "varchar", length: 45, nullable: false }) // Define una columna
  Apellidos_cliente: string;

  @Column({ type: "varchar", length: 100, nullable: false }) // Define una columna
  Direccion_cliente: string;

  @Column({ nullable: false }) // Define una columna
  Telefono_cliente: number;

  @OneToMany(() => Cabecera_factura, (cabecera_factura) => cabecera_factura.cliente) // Define una relación OneToMany
  cabecera_facturas: Cabecera_factura[];
}
