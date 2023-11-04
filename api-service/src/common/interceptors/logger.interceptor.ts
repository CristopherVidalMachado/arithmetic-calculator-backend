import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const logger = new Logger(context.getClass().name);
        const req = context.switchToHttp().getRequest();
        logger.log(`${req.method} ${req.url}`);

        const now = Date.now();
        return next
            .handle()
            .pipe(
                tap(() => {
                    logger.log(req)
                }),
                catchError(err => {
                    logger.error(`After... ${Date.now() - now}ms`);
                    return err;
                }),
            );
    }
}