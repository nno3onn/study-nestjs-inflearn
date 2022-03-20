import { CatsRepository } from './../../cats/cats.repository';
import { Payload } from './jwt.payload';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    //* decode jwt token
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  //* token이 유효하면 실행됨
  // jwt의 payload
  async validate(payload: Payload) {
    // payload 유효성 검사
    // - 보안상 이유로 request.user에 저장할 때, password 필드를 제외하고 저장하는 것이 좋음
    const cat = await this.catsRepository.findCatByIdWithoutPassword(
      payload.sub,
    );

    if (!cat) {
      throw new UnauthorizedException('접근 오류');
    }
    return cat; // request.user에 cat이 들어감
  }
}
