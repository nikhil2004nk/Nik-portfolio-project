import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    require('fs').appendFileSync('error.log', `[${new Date().toISOString()}] ${String(exception)}\n${exception && typeof exception === 'object' && 'stack' in exception ? (exception as any).stack : ''}\n\n`);

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message = typeof exceptionResponse === 'string' ? exceptionResponse : (exceptionResponse as any).message || message;
    }

    response.status(status).json({
      success: false,
      message: Array.isArray(message) ? message[0] : message,
      error: exception instanceof HttpException ? exception.name : 'InternalServerError',
      rawError: exception instanceof Error ? exception.message : String(exception),
      stack: exception instanceof Error ? exception.stack : undefined,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
