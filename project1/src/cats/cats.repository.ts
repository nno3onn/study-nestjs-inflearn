import { CommentsSchema } from './../comments/comments.schema';
import { CatRequestDto } from './dto/cats.request.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import { Types } from 'mongoose';
import mongoose from 'mongoose';

@Injectable()
export class CatsRepository {
  //* mongoose schema를 사용할 수 있도록 함
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async findAll() {
    const CommentsModel = mongoose.model('comments', CommentsSchema);

    const result = await this.catModel
      .find()
      .populate('comments', CommentsModel); // populate: Comments 모델의 comments 필드도 같이 띄워줌
    return result;
  }

  async findByIdAndUpdateImg(id: string, fileName: string) {
    const cat = await this.catModel.findById(id);

    cat.imgUrl = `http://localhost:3000/media/${fileName}`;

    const newCat = await cat.save();
    return newCat.readOnlyData;
  }

  async findCatByIdWithoutPassword(
    catId: string | Types.ObjectId,
  ): Promise<Cat | null> {
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
