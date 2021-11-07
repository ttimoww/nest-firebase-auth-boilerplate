import { Module, DynamicModule } from '@nestjs/common';
import { Firestore, Settings } from '@google-cloud/firestore';
import { FirestoreDatabaseProvider, FirestoreOptionsProvider, FirestoreCollectionProviders } from './firestore.providers';

type FirestoreModuleOptions = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useFactory: (...args: any[]) => Settings;
};

@Module({})
export class FirestoreModule {
    static forRoot(options: FirestoreModuleOptions): DynamicModule {

        const optionsProvider = {
            provide: FirestoreOptionsProvider,
            useFactory: options.useFactory,
        };

        const dbProvider = {
            provide: FirestoreDatabaseProvider,
            useFactory: (config) => new Firestore(config),
            inject: [FirestoreOptionsProvider],
        };

        const collectionProviders = FirestoreCollectionProviders.map(providerName => ({
            provide: providerName,
            useFactory: (db) => db.collection(providerName),
            inject: [FirestoreDatabaseProvider],
        }));

        return {
            global: true,
            module: FirestoreModule,
            providers: [optionsProvider, dbProvider, ...collectionProviders],
            exports: [dbProvider, ...collectionProviders],
        };
    }
}