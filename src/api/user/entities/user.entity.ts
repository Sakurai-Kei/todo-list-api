import { Task } from 'src/api/task/entities/task.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 30 })
  public name: string;

  @OneToMany(() => Task, (task) => task.user)
  public tasks: Task[];
}
