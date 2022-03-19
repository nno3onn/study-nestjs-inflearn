import { SuccessInterceptor } from './../common/interceptors/success.interceptor';
import { CatsService } from './cats.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Req,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { CatRequestDto } from './dto/cats.request.dto';
import { Cat } from './cats.schema';

@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  //* 현재 로그인한 고양이 정보 불러오기
  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  //* 회원가입
  @Post()
  async signUp(@Body() catRequestDto: CatRequestDto) {
    console.log(catRequestDto);
    return await this.catsService.signUp(catRequestDto);
  }

  //* 로그인
  @Post('login')
  logIn() {
    return 'login';
  }

  //* 로그아웃
  @Post('logout')
  logOut() {
    return 'logout';
  }

  //* 이미지 업로드
  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
