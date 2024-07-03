import { Body, Controller, Get, Post, Delete, Param, UploadedFiles, UseInterceptors, Request, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags('Посты пользователей с картинками')
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService){}

  @Get()
  getAll() {
    return this.postService.getAll()
  }

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
