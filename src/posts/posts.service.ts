import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.model';
import { User } from '../users/users.model'; 
import { Role } from '../roles/roles.model'; 
import { FilesService } from '../files/files.service';

@Injectable()
export class PostsService {

  constructor(@InjectModel(Post) private postRepository: typeof Post, private fileService: FilesService) {}

  async create(dto: CreatePostDto, image: any) {
    const oldPost = await this.getPostByTitle(dto.title);
    if (oldPost) {
      throw new HttpException('Такой пост уже есть', HttpStatus.FORBIDDEN);
    }

    const fileName = image ? await this.fileService.createFile(image) : '';

    const post = await this.postRepository.create({ ...dto, image: fileName });
    return post;
  }

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
