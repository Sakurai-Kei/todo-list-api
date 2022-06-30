import { User } from 'src/api/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 120 })
  public title: string;

  @ManyToOne(() => User, (user) => user.tasks)
  public user: User;
}
