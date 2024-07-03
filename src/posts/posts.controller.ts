import { Body, Controller, Get, Post, Delete, Param, UploadedFiles, UseInterceptors, Request, UploadedFile } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { FileInterceptor } from "@nestjs/platform-express";
import * as model from './posts.model';

@ApiTags('Посты пользователей с картинками')
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService){}

  @ApiOperation({summary: 'Получить список всех постов'})
  @ApiResponse({status: 200, type: [model.Post]})
  @Get()
  getAll() {
    return this.postService.getAll()
  }

  @ApiOperation({summary: 'Создание нового поcта'})
  @ApiResponse({status: 200, type: model.Post})
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() dto: CreatePostDto, @UploadedFile() image) {
    return this.postService.create(dto, image)
  }
  
  @Delete('/:postId')
  delete(@Param('postId') postId:number) {
    return this.postService.delete(postId)
  }

}
