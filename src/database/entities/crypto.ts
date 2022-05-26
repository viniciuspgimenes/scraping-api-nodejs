import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CryptoVariation } from "./crypto-variation";

@Entity('crypto')
export class Crypto {
    @PrimaryGeneratedColumn()
    id: number;
    @Index({ unique: true })
    @Column()
    name: string;
    @Index({ unique: true })
    @Column()
    shortName: string;
    @Column({ type: "bigint" })
    createdAt: number;
    @OneToMany(() => CryptoVariation, variation => variation.crypto)
    variations: CryptoVariation[];
}