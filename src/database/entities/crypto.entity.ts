import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity('crypto')
export class CryptoEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Index({ unique: true })
    @Column()
    name: string;
    @Index({ unique: true })
    @Column()
    shortName: string;
}