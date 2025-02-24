import { Venta } from "src/venta/entities/venta.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Zapato {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text')
    nombre: string;

    @Column('text')
    marca: string;

    @Column('decimal')
    talla: number;

    @Column('float')
    precio: number;

    @Column('int', {
        default: 0
    })
    stock: number;

    @Column('text')
    género: string;

    @Column('text')
    categoría: string;

    @Column('boolean', {
        default: true
    })
    activo: boolean;

    @OneToMany(() => Venta, (venta) => venta.zapato)
    ventas: Venta[];
}
