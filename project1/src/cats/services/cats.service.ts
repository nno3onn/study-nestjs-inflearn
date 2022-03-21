import { CatsRepository } from './../cats.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CatRequestDto } from '../dto/cats.request.dto';
import { Cat } from '../cats.schema';

@Injectable()
export class CatsService {
  constructor(private readonly CatsRepository: CatsRepository) {}

  async getAllCat() {
    const allCat = await this.CatsRepository.findAll();
    const readOnlyCats = allCat.map((cat) => cat.readOnlyData);
    return readOnlyCats;
  }

  async uploadImg(cat: Cat, files: Express.Multer.File[]) {
    const fileName = `cats/${files[0].filename}`;

    const newCat = await this.CatsRepository.findByIdAndUpdateImg(
      cat.id,
      fileName,
    );

    return newCat;
  }

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
