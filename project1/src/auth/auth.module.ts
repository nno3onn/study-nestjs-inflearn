import { CatsModule } from './../cats/cats.module';
import { JwtStrategy } from './jwt/jwt.strategy';
import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    //* strategy 기본 설정
    PassportModule.register({ defaultStrategy: 'jwt', session: true }),
    //* login
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1y' },
    }),

    //* 순환 참조 모듈 (서로를 import하는 경우) -> 모듈 간의 순환 종속성 해결
    forwardRef(() => CatsModule), // catsRepository 사용
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
