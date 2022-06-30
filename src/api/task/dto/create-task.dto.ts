import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/api/user/entities/user.entity';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  public user: User;
}
