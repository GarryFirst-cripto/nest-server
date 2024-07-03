import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User, private roleService: RolesService) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('User');
    await user.$set('roles', [role.id]);
    user.dataValues.roles = [role]
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({include: {all: true}});
    return users;
  }

  async getUserById(id) {
    const users = await this.userRepository.findOne({where: {id}, include: {all: true}});
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId, { include: {all: true} });
    const role = await this.roleService.getRoleByValue(dto.value);
    if (user && role) {
      const hasRole = user.roles.filter(role => role.value === dto.value)[0];
      if (hasRole) {
        throw new HttpException('У Пользователя такая роль уже есть', HttpStatus.NOT_FOUND);
      }
      user.$add('roles', role.id);
      return { result: 'Ok' };
    }
    throw new HttpException('Пользователь или роль не найдены...', HttpStatus.NOT_FOUND);
  }

  async removeRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId, {include: {all: true}});
    if (user) {
      const role = user.roles.filter(role => role.value === dto.value)[0];
      if (role) {
        user.$remove('roles', role.id)
        return { remove: 'Ok' };
      }
      throw new HttpException('У Пользователя нет такой роли...', HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Пользователь не найден...', HttpStatus.NOT_FOUND);
  }

  async banUser(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (user) {
      user.banned = true;
      user.banReason = dto.banReason;
      await user.save();
      return user;
    }
    throw new HttpException('Пользователь не найден...', HttpStatus.NOT_FOUND);
  }
}
