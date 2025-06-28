import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { cloudinaryService } from 'config/cloudinary/cloudinaryService';

import { categoriesRole } from 'src/helpers/data';

@Injectable()
export class ArticlesService {
  constructor(
    private prisma: PrismaService,
    private readonly cloudinary: cloudinaryService,
  ) {}
  async create(file: Express.Multer.File, createArticleDto: CreateArticleDto) {
    try {
      const userExisting = await this.prisma.article.findFirst({
        where: {
          title: createArticleDto.title,
        },
      });

      if (userExisting) {
        throw new BadRequestException({
          status: 400,
          message: 'Article title already exists',
        });
      }
      const imageUrl = await this.cloudinary.uploadImage(file);
      const article = await this.prisma.article.create({
        data: {
          imageUrl: imageUrl,
          title: createArticleDto.title,
          description: createArticleDto.description,
          body: createArticleDto.body,
          category: createArticleDto.category,
          published: Boolean(createArticleDto.published),
        },
      });

      return {
        status: 201,
        message: 'Article created successfully',
        data: article,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException({
        status: 400,
        message: 'Failed to create article',
        error: error.message,
      });
    }
  }

  findDrafts() {
    return this.prisma.article.findMany({
      where: {
        published: false,
      },
    });
  }

  findAll() {
    return this.prisma.article.findMany({
      where: {
        published: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.article.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    file: Express.Multer.File,
    updateArticleDto: UpdateArticleDto,
  ) {
    try {
      const imageUrl = await this.cloudinary.uploadImage(file);

      const article = this.prisma.article.update({
        where: {
          id,
        },
        data: {
          ...(imageUrl && { imageUrl }),
          title: updateArticleDto.title,
          description: updateArticleDto.description,
          body: updateArticleDto.body,
          category: updateArticleDto.category,
          published: updateArticleDto?.published === true,
        },
      });
      return article;
    } catch (error) {
      console.error('Prisma update error:', error);
      throw new Error('Failed to update article');
    }
  }

  remove(id: number) {
    return this.prisma.article.delete({
      where: { id },
    });
  }
}
