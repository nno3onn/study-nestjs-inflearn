import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    // res가 완료된 후 실행
    res.on('finish', () => {
      this.logger.log(
        `${req.ip} ${req.method} ${req.statusCode} ${req.originalUrl}`,
      );
    });

    next();
  }
}
