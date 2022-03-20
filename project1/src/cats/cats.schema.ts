import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true, // DB에서 만들어질 때 timestamp(created, updated, ...)를 자동으로 생성해줌
};

@Schema(options)
// extendsd Document: Mongoose의 document를 상속 받음
export class Cat extends Document {
  @ApiProperty({
    example: 'nno3onn@naver.com',
    description: 'cats email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'nno3onn',
    description: 'cats name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '12345',
    description: 'cats password',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '',
    description: 'cats image',
    required: false,
  })
  @Prop()
  @IsString()
  imgUrl: string;

  // 가상 field
  readonly readOnlyData: { id: string; email: string; password: string };
}

// class Cat을 schema로 만들어줌
export const CatSchema = SchemaFactory.createForClass(Cat);

//* virtual: client에게 보여줄 데이터만 작성
// 실제 db에 있는 값이 아닌, 가상 데이터
// readOnlyData : field명
CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  };
});
