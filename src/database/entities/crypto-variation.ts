import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Crypto } from "./crypto";

@Entity('crypto_variation')
export class CryptoVariation {
    @PrimaryGeneratedColumn()
    id: number;
    @Index()
    @Column({ type: "decimal" })
    value: number;
    @Index()
    @Column({ type: "bigint" })
    extractedAt: number;
    @Column({ type: "bigint" })
    createdAt: number;
    @ManyToOne(() => Crypto, crypto => crypto.variations)
    crypto: Crypto;
}

