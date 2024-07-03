import { Body, Controller, Param, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({summary: 'Получить список всех пользователей'})
  @ApiResponse({status: 200, type: [User]})
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({summary: 'Создание нового пользователя'})
  @ApiResponse({status: 200, type: User})
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto)
  }

  @ApiOperation({summary: 'Получить список всех пользователей'})
  @ApiResponse({status: 200, type: [User]})
  @Get(':id')
  getUserById(@Param('id') id:number) {
    return this.usersService.getUserById(id);
  }

}
