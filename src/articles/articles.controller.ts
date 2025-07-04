import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { createAndUpdateSchema } from './schemaArticle/createAndUpdate';
import { swaggerFormat } from './schemaArticle/swaggerFormat';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiCreatedResponse({ type: ArticleEntity })
  @UseInterceptors(FileInterceptor('imageUrl'))
  @ApiConsumes('multipart/form-data')
  @ApiBody(swaggerFormat)
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    const validateSchema = createAndUpdateSchema.safeParse(createArticleDto);
    if (!validateSchema.success) {
      throw new BadRequestException(validateSchema.error.format());
    }
    const result = await this.articlesService.create(file, validateSchema.data);
    return result;
  }

  @Get('draft')
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  findDraft() {
    return this.articlesService.findDrafts();
  }
  @Get()
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticleEntity })
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ArticleEntity })
  @UseInterceptors(FileInterceptor('imageUrl'))
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: ArticleEntity })
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    const updatedArticle = this.articlesService.update(
      +id,
      file,
      updateArticleDto,
    );
    const validateSchema = createAndUpdateSchema.safeParse(updateArticleDto);
    console.log('upload', updateArticleDto);
    if (!validateSchema.success) {
      throw new BadRequestException(validateSchema.error.format());
    }
    console.log('data', validateSchema.data);
    const resultUpdate = await this.articlesService.update(
      +id,
      file,
      validateSchema.data,
    );
    return resultUpdate;
  }

  @Delete(':id')
  @ApiOkResponse({ type: ArticleEntity })
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
