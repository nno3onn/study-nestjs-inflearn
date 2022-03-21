import { CatsService } from './../services/cats.service';
import { multerOptions } from '../../common/utils/multer.options';
import { JwtAuthGuard } from '../../auth/jwt/jwt.guard';
import { LoginRequestDto } from '../../auth/dto/login.request';
import { AuthService } from '../../auth/auth.service';
import { SuccessInterceptor } from '../../common/interceptors/success.interceptor';
import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { CatRequestDto } from '../dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from '../dto/cat.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Cat } from '../cats.schema';

@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat) {
    return cat.readOnlyData;
  }

  @ApiResponse({
    status: 400,
    description: 'Server Error',
  })
  @ApiResponse({
    status: 200,
    description: '성공!',
    type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() catRequestDto: CatRequestDto) {
    return await this.catsService.signUp(catRequestDto);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }

  //* 로그아웃
  // - 필요없음. 왜냐하면 front에서 jwt를 제거하면 로그아웃되기 때문

  //* 업로드한 고양이 이미지를 서버 폴더에 저장
  @ApiOperation({ summary: '고양이 이미지 업로드' })
  // FilesInterceptor(fieldName, maxCount, MulterOptions) -> 폴더 및 파일 자동 생성
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats')))
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  uploadCatImg(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @CurrentUser() cat: Cat,
  ) {
    // return { image: `http://localhost:3000/media/cats/${files[0].filename}` };
    return this.catsService.uploadImg(cat, files);
  }

  @ApiOperation({ summary: '모든 고양이 가져오기' })
  @Get('all')
  getAllCat() {
    return this.catsService.getAllCat();
  }
}
