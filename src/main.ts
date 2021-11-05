// Setup dotenv
import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Import firebase-admin
import admin, { ServiceAccount } from 'firebase-admin';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Connect to Firebase
    const serviceAccount : ServiceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    };
    
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    // Set CORS settings
    app.enableCors({ credentials: true, origin: process.env.FRONTEND_URL });

    await app.listen(4000);
}
bootstrap();
