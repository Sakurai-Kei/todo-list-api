import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.create(body);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string): Promise<User> {
    return this.userService.findOne(name);
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() body: UpdateUserDto) {
    return this.userService.update(name, body);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.userService.remove(name);
  }
}
