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

  async create(body: CreateUserDto): Promise<User | string> {
    const checkIfTaken = await this.userRepository.findOneBy({
      name: body.name,
    });
    if (checkIfTaken) {
      return 'Name already Taken';
    }
    const user: User = new User();

    user.name = body.name;

    return this.userRepository.save(user);
  }

  async findOne(name: string): Promise<User> {
    const user: User = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.tasks', 'task')
      .where('user.name = :name', { name })
      .getOne();
    return user;
  }

  async update(name: string, body: UpdateUserDto) {
    const checkIfTaken = await this.userRepository.findOneBy({
      name: body.name,
    });
    if (checkIfTaken) {
      return 'Name already Taken';
    }

    const user: User = await this.userRepository.findOneBy({ name });

    user.name = body.name;

    await this.userRepository.save(user);

    return user;
  }

  async remove(name: string): Promise<string> {
    const checkIfUserExist = await this.userRepository.findOneBy({
      name,
    });

    if (!checkIfUserExist) {
      return 'User does not exist';
    }

    await this.taskRepository.delete({ user: checkIfUserExist });

    await this.userRepository.delete(checkIfUserExist);

    return `User ${checkIfUserExist.name} has been deleted`;
  }
}
