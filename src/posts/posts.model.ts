import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';

interface PostCreationAttrs {
    title: string;
    content: string;
    userId: number;
    image: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs>{

    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    
    @ApiProperty({example: 'Это мой пост', description: 'Уникальный заголовок поста'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;
    
    @ApiProperty({example: 'Содержание...', description: 'Содержание поста'})
    @Column({type: DataType.STRING, allowNull: false})
    content: string;
    
    @ApiProperty({example: '55fe6bf8-f09a-477f-a977-cea1eab5c47b.jpg', description: 'Статический адрес рисунка поста'})
    @Column({type: DataType.STRING})
    image: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    author: User;

}