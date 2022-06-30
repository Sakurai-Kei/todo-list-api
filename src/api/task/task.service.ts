import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  @InjectRepository(Task)
  private readonly taskRepository: Repository<Task>;

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async create(body: CreateTaskDto): Promise<Task | string> {
    const checkIfUserExist = await this.userRepository.findOneBy({
      name: body.name,
    });

    if (!checkIfUserExist) {
      return 'User does not exist';
    }

    const task = new Task();

    task.title = body.title;
    task.user = checkIfUserExist;

    await this.taskRepository.save(task);

    return task;
  }

  async update(id: number, body: UpdateTaskDto): Promise<Task | string> {
    const taskToUpdate: Task = await this.taskRepository.findOneBy({ id });

    if (!taskToUpdate) {
      return 'No task found';
    }

    taskToUpdate.title = body.title;

    await this.taskRepository.save(taskToUpdate);

    return taskToUpdate;
  }

  async remove(id: number): Promise<string> {
    const taskToDelete = await this.taskRepository.findOneBy({ id });

    if (!taskToDelete) {
      return 'No task found';
    }

    await this.taskRepository.delete(taskToDelete);

    return `Task ${taskToDelete.title} has been deleted`;
  }
}
