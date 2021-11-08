// Setup dotenv
import * as dotenv from 'dotenv';
dotenv.config();

// NestJS
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Swagger
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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

    // Setup Swagger
    if(process.env.NODE_ENV != 'production'){
        const config = new DocumentBuilder()
            .setTitle('Sample Project API')
            .setDescription('This is a sample project to demonstrate auth in Swagger UI')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api', app, document, );
    }

    // Set CORS settings
    app.enableCors({ credentials: true, origin: process.env.FRONTEND_URL });

    await app.listen(4000);
}
bootstrap();
