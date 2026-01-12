import { Todo } from "@/entities/Todo";
import { User } from "@/entities/User";
import { TodoPriority, TodoStatus, UserRole } from "@/types";
import bcrypt from "bcryptjs";
import "reflect-metadata";
import { AppDataSource } from "./data-source";

async function seed() {
  try {
    console.log("Initializing database connection...");
    await AppDataSource.initialize();
    console.log("Database connected!");

    const userRepository = AppDataSource.getRepository(User);
    const todoRepository = AppDataSource.getRepository(Todo);

    // Clear existing data
    console.log("Clearing existing data...");
    const existingTodos = await todoRepository.find();
    if (existingTodos.length > 0) {
      await todoRepository.remove(existingTodos);
    }
    const existingUsers = await userRepository.find();
    if (existingUsers.length > 0) {
      await userRepository.remove(existingUsers);
    }

    // Create admin user
    console.log("Creating admin user...");
    const hashedAdminPassword = await bcrypt.hash("admin123", 10);
    const adminUser = userRepository.create({
      email: "admin@example.com",
      password: hashedAdminPassword,
      name: "Admin User",
      role: UserRole.ADMIN,
      emailVerified: true,
    });
    await userRepository.save(adminUser);

    // Create regular users
    console.log("Creating regular users...");
    const hashedUserPassword = await bcrypt.hash("user123", 10);

    const user1 = userRepository.create({
      email: "john@example.com",
      password: hashedUserPassword,
      name: "John Doe",
      role: UserRole.USER,
      emailVerified: true,
    });
    await userRepository.save(user1);

    const user2 = userRepository.create({
      email: "jane@example.com",
      password: hashedUserPassword,
      name: "Jane Smith",
      role: UserRole.USER,
      emailVerified: true,
    });
    await userRepository.save(user2);

    // Create todos for user1
    console.log("Creating todos for John Doe...");
    const todos1 = [
      {
        title: "Complete project proposal",
        description: "Finish the Q1 project proposal and send it to the team",
        status: TodoStatus.IN_PROGRESS,
        priority: TodoPriority.HIGH,
        dueDate: new Date("2026-01-15"),
        userId: user1.id,
      },
      {
        title: "Review code changes",
        description: "Review the pull requests from the team",
        status: TodoStatus.PENDING,
        priority: TodoPriority.MEDIUM,
        dueDate: new Date("2026-01-12"),
        userId: user1.id,
      },
      {
        title: "Update documentation",
        description: "Update the API documentation with new endpoints",
        status: TodoStatus.COMPLETED,
        priority: TodoPriority.LOW,
        dueDate: new Date("2026-01-08"),
        userId: user1.id,
      },
      {
        title: "Fix authentication bug",
        description: "Investigate and fix the SSO login issue",
        status: TodoStatus.IN_PROGRESS,
        priority: TodoPriority.HIGH,
        dueDate: new Date("2026-01-11"),
        userId: user1.id,
      },
      {
        title: "Team meeting preparation",
        description: "Prepare slides for the weekly team sync",
        status: TodoStatus.PENDING,
        priority: TodoPriority.MEDIUM,
        dueDate: new Date("2026-01-13"),
        userId: user1.id,
      },
    ];

    for (const todoData of todos1) {
      const todo = todoRepository.create(todoData);
      await todoRepository.save(todo);
    }

    // Create todos for user2
    console.log("Creating todos for Jane Smith...");
    const todos2 = [
      {
        title: "Design new landing page",
        description: "Create mockups for the new product landing page",
        status: TodoStatus.PENDING,
        priority: TodoPriority.HIGH,
        dueDate: new Date("2026-01-20"),
        userId: user2.id,
      },
      {
        title: "Client call",
        description: "Schedule and prepare for the client demo",
        status: TodoStatus.COMPLETED,
        priority: TodoPriority.MEDIUM,
        dueDate: new Date("2026-01-09"),
        userId: user2.id,
      },
      {
        title: "Database optimization",
        description: "Optimize slow queries in the production database",
        status: TodoStatus.IN_PROGRESS,
        priority: TodoPriority.HIGH,
        dueDate: new Date("2026-01-14"),
        userId: user2.id,
      },
    ];

    for (const todoData of todos2) {
      const todo = todoRepository.create(todoData);
      await todoRepository.save(todo);
    }

    console.log("Seed data created successfully!");
    console.log("\nTest credentials:");
    console.log("Admin: admin@example.com / admin123");
    console.log("User 1: john@example.com / user123");
    console.log("User 2: jane@example.com / user123");

    await AppDataSource.destroy();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
