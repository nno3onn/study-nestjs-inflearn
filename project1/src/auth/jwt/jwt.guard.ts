import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
//* type이 'jwt'인 PassportStrategy를 실행함
export class JwtAuthGuard extends AuthGuard('jwt') {}
