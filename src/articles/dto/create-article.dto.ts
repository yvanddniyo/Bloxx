import { ApiProperty } from '@nestjs/swagger';

import { categoriesRole } from 'src/helpers/data';

export class CreateArticleDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  image: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  categories: categoriesRole[];

  @ApiProperty({ required: false, default: false })
  published?: boolean = false;
}
