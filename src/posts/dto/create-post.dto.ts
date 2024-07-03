import { ApiProperty } from '@nestjs/swagger';
import {IsNumber, IsString, MinLength} from "class-validator";

export class CreatePostDto {
  @ApiProperty({example: 'Заголовок поста', description: 'Заголовок поста'})
  @IsString({message: 'Должно быть строкой'})
  readonly title: string;

  @ApiProperty({example: 'Текст поста', description: 'Содержание поста'})
  @IsString({message: 'Должно быть строкой'})
  @MinLength(5, {message: 'Не меньше 5 символов'})
  readonly content: string;

  @ApiProperty({example: '12', description: 'ID пользователя'})
  @IsNumber({}, {message: "Должно быть числом"})
  readonly userId: number;
}