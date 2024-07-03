import { Body, Controller, Get, Post, Delete, Param, UploadedFiles, UseInterceptors, Request, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { FilesInterceptor } from "@nestjs/platform-express";
// import { IRequest } from '../logger/req.interface';


@ApiTags('Посты пользователей с картинками')
@Controller('posts')
export class PostsController {

  constructor(private postService: PostsService){}

  @Get()
  getAll() {
    return this.postService.getAll()
  }

  @Post()
  create(@Body() dto: CreatePostDto, @UploadedFile() image) {
    return this.postService.create(dto, image)
  }

  // @Post()
  // @UseInterceptors(FilesInterceptor('images'))
  // create(@Body() dto: CreatePostDto, @UploadedFiles() images: Array<Express.Multer.File>, @Request() req: IRequest) {
  //   return this.postService.create(dto, images, req.user)
  // }

  @Delete('/:postId')
  delete(@Param('postId') postId:number) {
    return this.postService.delete(postId)
  }

}
