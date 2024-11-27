import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  phone!: string;

  @Column({ nullable: true })
  department?: string;

  @Column({ nullable: true })
  degree?: string;

  @Column({ nullable: true })
  passedOutYear?: number;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  district?: string;

  @Column({ nullable: true })
  state?: string;

  @Column({ nullable: true })
  pinCode?: string;
}
