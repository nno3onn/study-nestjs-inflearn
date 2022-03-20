import { CatsRepository } from './cats.repository';
import { Model } from 'mongoose';
import { CatRequestDto } from './dto/cats.request.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cats.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CatsService {
  constructor(private readonly CatsRepository: CatsRepository) {}

  async signUp(catRequestDto: CatRequestDto) {
    const { email, name, password } = catRequestDto;

    //* 유효성 검사
    const isCatExist = await this.CatsRepository.existsByEmail(email);
    if (isCatExist) {
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }

    //* password 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    //* db 저장
    const cat = await this.CatsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
    //   {
    //     "success": true,
    //     "data": {
    //         "id": "623604a8b030e475229185aa",
    //         "email": "aaaaaaa@naver.com",
    //         "name": "red"
    //     }
    // }
  }
}
