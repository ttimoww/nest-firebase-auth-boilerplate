import { Module } from '@nestjs/common';

// Controllers
import { AppController } from './app.controller';

// Services
import { AppService } from './app.service';

// Modules
import { AuthModule } from './auth/auth.module';
import { FirestoreModule } from './firestore/firestore.module';
import { UserModule } from './user/user.module';
@Module({
    imports: [
        FirestoreModule.forRoot({
            useFactory: () => ({
                projectId: process.env.FIREBASE_PROJECT_ID,
                credentials: {
                    client_email: process.env.FIREBASE_CLIENT_EMAIL,
                    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
                }
            }),
        }),
        AuthModule,
        UserModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
