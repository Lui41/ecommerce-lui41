/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

interface UserWithPassword {
  password?: string;
  [key: string]: unknown;
}

@Injectable()
export class ExcludePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data: unknown) => {
        if (Array.isArray(data)) {
          return data.map((user: unknown) => {
            const { password, ...userNotPassword } = user as UserWithPassword;
            return userNotPassword;
          });
        }
        if (data && typeof data === 'object') {
          const { password, ...userNotPassword } = data as UserWithPassword;
          return userNotPassword;
        }
        return data;
      }),
    );
  }
}
