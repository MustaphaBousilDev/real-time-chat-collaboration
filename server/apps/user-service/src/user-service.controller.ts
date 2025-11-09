import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user-service.service';

@Controller()
export class UserServiceController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() userData: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.userService.createUser(userData);
  }

  @Get(':id')
  getUserById(@Param('id') userId: string) {
    return this.userService.getUserById(userId);
  }
}
