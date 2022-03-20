import { AuthModule } from './../auth/auth.module';
import { CatsRepository } from './cats.repository';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsController } from './cats.controller';
import { Cat, CatSchema } from './cats.schema';
import { CatsService } from './cats.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),

    //* 순환 참조 모듈 (서로를 import하는 경우) -> 모듈 간의 순환 종속성 해결
    forwardRef(() => AuthModule), // authService 사용(JwtLogin)
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository], // imports CatsModule하는 곳에서 catModule의 모든 providers를 사용할 수 있음
})
export class CatsModule {}
