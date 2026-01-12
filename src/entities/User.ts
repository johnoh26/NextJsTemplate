import { UserRole } from "@/types";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ type: "varchar", nullable: true })
  password!: string | null;

  @Column({ type: "varchar" })
  name!: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: UserRole;

  @Column({ type: "varchar", nullable: true })
  image!: string | null;

  @Column({ default: false })
  emailVerified!: boolean;

  @Column({ type: "varchar", nullable: true })
  resetToken!: string | null;

  @Column({ type: "timestamp", nullable: true })
  resetTokenExpiry!: Date | null;

  @OneToMany("Todo", "user")
  todos!: any[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
