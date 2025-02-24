import { Zapato } from "src/zapatos/entities/zapato.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Venta {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Zapato, (zapato) => zapato.ventas)  
    @JoinColumn({ name: 'zapatoId' })  
    zapato: Zapato;

    @Column('int')
    cantidad: number;

    @Column('float')
    total: number;
}
