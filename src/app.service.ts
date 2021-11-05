import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello from a public route';
    }
    getProtectedHello(): string {
        return 'Hello from a private route';
    }
}
