import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

import { categoriesRole } from 'src/helpers/data';

export class CreateArticleDto {
  @ApiProperty()
  title: string;
  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  body: string;

  @IsEnum(categoriesRole)
  category: categoriesRole;

  @ApiProperty({ required: false, default: false })
  @IsBoolean()
  @IsString()
  @IsOptional()
  published?: boolean | string = false;
}
