import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';

@ApiTags('Роли Пользователя')
@Controller('roles')
export class RolesController {
  constructor(private roleSrvice: RolesService) {}

  @ApiOperation({summary: 'Получить список всех ролей'})
  @ApiResponse({status: 200, type: [Role]})
  @Get('/all')
  getAllRoles() {
    return this.roleSrvice.getAllRoles();
  }

  @ApiOperation({summary: 'Проверить наличие конкретной роли'})
  @ApiResponse({status: 200, type: Role})
  @Get('/:value')
  getRoleByValue(@Param('value') value:string) {
    return this.roleSrvice.getRoleByValue(value)
  }

  @ApiOperation({summary: 'Создать новую роль'})
  @ApiResponse({status: 200, type: Role})
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleSrvice.createRole(dto);
  }
}