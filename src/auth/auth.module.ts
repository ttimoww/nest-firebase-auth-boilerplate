import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Module({
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        },
        AuthService]
})
export class AuthModule {}
