import { Controller, Body, Post, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from '../users/users.model';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  @ApiOperation({summary: 'Вход пользователя в систему'})
  @ApiResponse({ status: 200, schema: { type: 'string', example: 'your-token-string-here' }})
  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({summary: 'Регистрация нового пользователя'})
  @ApiResponse({ status: 200, schema: { type: 'string', example: 'your-token-string-here' }})
  // @UsePipes(ValidationPipe)
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

}
