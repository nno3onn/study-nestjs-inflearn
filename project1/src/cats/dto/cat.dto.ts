import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

//* PickType: class Cat에서 필요한 부분만 가져올 수 있음
//* (+) OmitType: 필요없는 부분을 제외하고 가져올 수 있음
export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '310894',
    description: 'cats id',
  })
  id: string;
}
