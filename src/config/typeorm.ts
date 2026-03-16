import {registerAs} from '@nestjs/config';
import {environment} from './environment';

const typeOrmConfig = {
    type: 'postgres',
    database: environment.DB_NAME,
    host: environment.DB_HOST,
    port: Number(environment.DB_PORT),
    username: environment.DB_USERNAME,
    password: environment.DB_PASSWORD,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    autoLoadEntities: true,
    logging: false,
    synchronize: true,
    dropSchema: false,
};

export const typeOrmConfigService = registerAs('typeorm', () => typeOrmConfig);