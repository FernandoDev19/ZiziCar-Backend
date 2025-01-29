import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() user: CreateUserDto){
    return this.userService.create(user);
  }

  @Get()
  findAll(){
    return this.userService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string){
    return this.userService.findOneById(id);
  }

  @Put(':userId')
  update(@Param('userId') userId: string, @Body() user: UpdateUserDto){
    return this.userService.update(userId, user);
  }
}
