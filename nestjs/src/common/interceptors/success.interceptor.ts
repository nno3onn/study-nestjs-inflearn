// Interceptor
// - AOP(관점 지향 프로그래밍)
// - controller가 보낸 데이터를 받고 가공해서 최종 res를 보냄
// - 주로 서비스의 return값 데이터를 원하는 형식에 맞게 가공할 때 많이 사용된다

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        // - data: =response
        success: true,
        data,
      })),
    );
  }
}
