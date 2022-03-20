import { CatRequestDto } from './dto/cats.request.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';

@Injectable()
export class CatsRepository {
  //* mongoose schema를 사용할 수 있도록 함
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async findCatByIdWithoutPassword(catId: string): Promise<Cat | null> {
    return await this.catModel.findById(catId).select('-password');
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    return await this.catModel.findOne({ email });
  }

  async existsByEmail(email: string): Promise<any> {
    return await this.catModel.exists({ email }); // 중복 체크
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }
}
