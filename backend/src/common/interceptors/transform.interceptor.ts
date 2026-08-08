import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: any;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => {
        const responseData = data?.data !== undefined ? data.data : data;
        const meta = data?.meta !== undefined ? data.meta : undefined;
        
        return {
          success: true,
          message: data?.message || 'Request successful',
          data: responseData,
          meta: meta,
        };
      }),
    );
  }
}
