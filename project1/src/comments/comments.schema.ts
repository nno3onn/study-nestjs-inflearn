import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true, // DB에서 만들어질 때 timestamp(created, updated, ...)를 자동으로 생성해줌
};

@Schema(options)
// extendsd Document: Mongoose의 document를 상속 받음
export class Comments extends Document {
  @ApiProperty({
    description: '작성한 고양이 id',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    unique: true,
    ref: 'cats', // 어떤 doc와 연결할 것인지
  })
  @IsEmail()
  @IsNotEmpty()
  author: Types.ObjectId;

  @ApiProperty({
    description: '댓글 컨텐츠',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Prop({
    required: true,
  })
  contents: string;

  @ApiProperty({
    description: '좋아요 수',
    required: true,
  })
  @IsPositive()
  @Prop({
    default: 0,
  })
  likeCount: number;

  @ApiProperty({
    description: '작성 대상 (게시물, 정보글)',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    unique: true,
    ref: 'cats', // 어떤 doc와 연결할 것인지
  })
  @IsNotEmpty()
  info: Types.ObjectId;
}

// class Cat을 schema로 만들어줌
export const CommentsSchema = SchemaFactory.createForClass(Comments);
