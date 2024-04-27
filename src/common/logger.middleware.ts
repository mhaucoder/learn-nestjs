import { Logger, NestMiddleware } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger("HTTP-REQUEST");

  use(req: Request, res: Response, next: NextFunction) {
    
    res.on("finish", () => {
      const { ip, method, originalUrl } = req;
      const { statusCode } = res;
      const contentLength = res.get("content-length");
      this.logger.log(`[${method}] URI: ${originalUrl} IP: ${ip} >> {status: ${statusCode}, length: ${contentLength || 0}}`);
    });

    res.on("error", (err: Error) => {
      this.logger.error(err.message);
    });

    next();
  }
}
