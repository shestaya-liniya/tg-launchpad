import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(
    @Body() body: { user: CreateUserDto; initDataRaw: string }
  ) {
    const { user, initDataRaw } = body;
    return this.userService.create(user, initDataRaw);
  }

  @Get(':telegramId/:initDataRaw')
  findOne(
    @Param('telegramId') telegramId: string,
    @Param('initDataRaw') initDataRaw: string,
  ) {
    return this.userService.findOne(+telegramId, initDataRaw);
  }
}
