import { TodoPriority, TodoStatus } from "@/types";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("todos")
export class Todo {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  title!: string;

  @Column({ type: "text", nullable: true })
  description!: string | null;

  @Column({
    type: "enum",
    enum: TodoStatus,
    default: TodoStatus.PENDING,
  })
  status!: TodoStatus;

  @Column({
    type: "enum",
    enum: TodoPriority,
    default: TodoPriority.MEDIUM,
  })
  priority!: TodoPriority;

  @Column({ type: "timestamp", nullable: true })
  dueDate!: Date | null;

  @Column()
  userId!: string;

  @ManyToOne("User", "todos", { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: any;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
