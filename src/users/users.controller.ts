import { Body, Controller, Param, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/guards/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';

const roles = ['Admin', 'User']

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({summary: 'Получить список всех пользователей'})
  @ApiResponse({status: 200, type: [User]})
  @Roles(...roles)
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({summary: 'Создание нового пользователя'})
  @ApiResponse({status: 200, type: User})
  // @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto)
  }

  @ApiOperation({summary: 'Получить пользователея с заданным ID'})
  @ApiResponse({status: 200, type: User})
  @Roles(...roles)
  @UseGuards(RolesGuard, JwtAuthGuard)
  @Get(':id')
  getUserById(@Param('id') id:number) {
    return this.usersService.getUserById(id);
  }

  @ApiOperation({summary: 'Добавить пользователю новую роль'})
  @ApiResponse({status: 200})
  @Roles("Admin")
  @UseGuards(RolesGuard)
  @Post('/addrole')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  @ApiOperation({summary: 'Удалить роль у пользователя'})
  @ApiResponse({status: 200})
  @Roles("Admin")
  @UseGuards(RolesGuard)
  @Post('/removerole')
  removeRole(@Body() dto: AddRoleDto) {
    return this.usersService.removeRole(dto);
  }

  @ApiOperation({summary: 'Забанить пользователя'})
  @ApiResponse({status: 200})
  @Roles("Admin")
  @UseGuards(RolesGuard)
  @Post('/ban')
  banUser(@Body() dto: BanUserDto) {
    return this.usersService.banUser(dto);
  }

}
