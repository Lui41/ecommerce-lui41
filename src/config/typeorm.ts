import { registerAs } from '@nestjs/config';

export const typeOrmConfigService = registerAs('typeorm', () => ({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  autoLoadEntities: true,
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
}));