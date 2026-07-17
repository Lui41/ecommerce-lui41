import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { join } from 'path';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,

  autoLoadEntities: true,
  migrations: [join(__dirname, '/../migrations/*{.js,.ts}')],
  migrationsRun: true,

  synchronize: false,
  logging: false,
  dropSchema: false,

  ssl:
    process.env.NODE_ENV === 'production'
      ? {
          rejectUnauthorized: false,
        }
      : false,
};

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  migrations: [join(__dirname, '/../migrations/*{.js,.ts}')],
  synchronize: false,
  logging: false,
  ssl:
    process.env.NODE_ENV === 'production'
      ? {
          rejectUnauthorized: false,
        }
      : false,
});
