import { Entity, Column } from 'typeorm';
import { BaseMySqlEntity } from './BaseMySqlEntity';

@Entity()
export class Client extends BaseMySqlEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  cpforcnpj: string;

  @Column({ nullable: false })
  tel: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  number: number;

  @Column({ nullable: false })
  cep: number;

  @Column({ nullable: false })
  district: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false, length: 2 })
  uf: string;
}
