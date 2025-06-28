import { ApiProperty } from '@nestjs/swagger';
import { Article } from 'generated/prisma/client';
import { categoriesRole } from 'src/helpers/data';

export class ArticleEntity implements Article {
  published: boolean;
  @ApiProperty()
  id: number;

  @ApiProperty()
  image: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty()
  body: string;

  @ApiProperty()
  categories: categoriesRole[];

  @ApiProperty()
  createAte: Date;

  @ApiProperty()
  updatedAt: Date;
}
