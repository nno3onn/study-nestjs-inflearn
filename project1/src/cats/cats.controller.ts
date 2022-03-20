import { JwtAuthGuard } from './../auth/jwt/jwt.guard';
import { LoginRequestDto } from './../auth/dto/login.request';
import { AuthService } from './../auth/auth.service';
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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { CatRequestDto } from './dto/cats.request.dto';
import { Cat } from './cats.schema';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cat.dto';
import { Request } from 'express';
import { CurrentUser } from 'src/common/decorators/user.decorator';

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

  @ApiOperation({ summary: '고양이 이미지 업로드' })
  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
