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
      secretOrKey: 'secretKey',
      ignoreExpiration: false,
    });
  }

  //* token이 유효하면 실행됨
  // jwt의 payload
  async validate(payload: Payload) {
    // payload 유효성 검사

    const cat = await this.catsRepository.findCatByIdWithoutPassword(
      payload.sub,
    );

    if (!cat) {
      throw new UnauthorizedException();
    }
    return cat; // request.user에 들어감
  }
}
