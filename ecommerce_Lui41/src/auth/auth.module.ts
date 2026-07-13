import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, RolesGuard],
  exports: [RolesGuard],
})
export class AuthModule {}
