import { CatsRepository } from './../../cats/cats.repository';
import { CommentsCreateDto } from './../comments.create.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comments } from '../comments.schema';
import { Model } from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
    private readonly catsRepository: CatsRepository,
  ) {}

  async getAllComments() {
    try {
      return await this.commentsModel.find();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  // id: 게시물의 id
  async createComment(id: string, commentData: CommentsCreateDto) {
    try {
      // targetCat: 게시물 글쓴이 정보
      const targetCat = await this.catsRepository.findCatByIdWithoutPassword(
        id,
      );
      // author: 댓글 쓴 고양이 id
      const { contents, author } = commentData;
      // validateAuthor: 댓글 쓴 고양이 정보
      const validateAuthor =
        await this.catsRepository.findCatByIdWithoutPassword(author);

      const newComment = new this.commentsModel({
        author: validateAuthor._id,
        contents,
        info: targetCat._id,
      });
      return await newComment.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async plusLike(id: string) {
    const comment = await this.commentsModel.findById(id);
    comment.likeCount += 1;
    return await comment.save();
    try {
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
