import { ApiProperty } from '@nestjs/swagger';
import { Article } from '@prisma/client';
import { IsEnum } from 'class-validator';
import { categoriesRole } from 'src/helpers/data';

export class ArticleEntity implements Article {
  @ApiProperty()
  id: number;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty()
  body: string;

  @IsEnum(categoriesRole)
  category: categoriesRole;

  @ApiProperty({ required: false, default: false })
  published: boolean = false;

  @ApiProperty()
  createAte: Date;

  @ApiProperty()
  updatedAt: Date;
}
