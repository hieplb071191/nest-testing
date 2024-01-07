import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

    protected logger = new Logger()

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`${req.method}: ${req.originalUrl}`)
    next();
  }
}