import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("companies")
export class Company {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "company_name", type: "varchar", length: 255 })
  companyName!: string;

  @Column({ name: "company_apply_link", type: "text" })
  companyApplyLink!: string;

  @Column({ name: "company_logo", type: "text", nullable: true })
  companyLogo?: string;

  @Column({ name: "role", type: "varchar", length: 100, nullable: true })
  role?: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt!: Date;
}
