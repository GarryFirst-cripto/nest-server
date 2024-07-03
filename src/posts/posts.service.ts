import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.model';
import { User } from '../users/users.model'; 
import { Role } from '../roles/roles.model'; 
// import { FilesService } from '../files/files.service';
// import { IUser } from 'src/logger/req.interface';

@Injectable()
export class PostsService {

  // constructor(@InjectModel(Post) private postRepository: typeof Post, private fileService: FilesService) {}
  constructor(@InjectModel(Post) private postRepository: typeof Post) {}

  async create(dto: CreatePostDto, image: any) {
    const oldPost = await this.getPostByTitle(dto.title);
    if (oldPost) {
      throw new HttpException('Такой пост уже есть', HttpStatus.FORBIDDEN);
    }

    const fileName = 'adjkhafksjdhg'

    const post = await this.postRepository.create({ ...dto, image: fileName });
    return post;
  }

  // async create(dto: CreatePostDto, images: Array<any>, user: IUser ) {
  //   const oldPost = await this.getPostByTitle(dto.title);
  //   if (oldPost) {
  //     throw new HttpException('Такой пост уже есть', HttpStatus.FORBIDDEN);
  //   }
  //   const list = [];
  //   if (images) {
  //     for (let i = 0; i < images.length; i++) {
  //       const nm = await this.fileService.createFile(images[i]);
  //       list.push(nm)
  //     }
  //   }
  //   const post = await this.postRepository.create({ ...dto, userId: user.id, image: list.join(',') });
  //   return post;
  // }

  async getAll() {
    const posts = await this.postRepository.findAll({
      include: [
        { model: User, 
          include: [
            { model: Role,
              attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
            },
          ],
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }
      ]
    });
    return posts;
  }

  async getPostByTitle(title) {
    const post = await this.postRepository.findOne({ 
      where: { title },
      attributes: {
         exclude: ['title','content','image','userId','createdAt','updatedAt']
      }
    });
    return post;
  }

  async delete(id) {
    const result = await this.postRepository.destroy({ where: { id } });
    return { result };
  }

}
