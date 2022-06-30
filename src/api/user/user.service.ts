import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../task/entities/task.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @InjectRepository(Task)
  private readonly taskRepository: Repository<Task>;

  create(body: CreateUserDto): Promise<User> {
    const user: User = new User();

    user.name = body.name;

    return this.userRepository.save(user);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(name: string): Promise<User> {
    const user: User = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.tasks', 'task')
      .where('user.name = :name', { name })
      .getOne();
    return user;
  }

  async update(name: string, body: UpdateUserDto): Promise<User> {
    const user: User = await this.userRepository.findOneBy({ name });
    const task: Task = new Task();

    task.title = body.title;
    task.user = user;

    await this.taskRepository.save(task);

    return user;
  }

  remove(name: string) {
    return `This action removes a #${name} user`;
  }
}
