/* eslint-disable prettier/prettier */
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { Task } from './entities/task.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './storage/database.sqlite',
        // DATABASECONECTION
        // host: config.get<string>('DATABASE_HOST'),
        // port: Number(config.get<string>('DATABASE_PORT')),
        // username: config.get<string>('DATABASE_USERNAME'),
        // password: config.get<string>('DATABASE_PASSWORD'),
        // database: config.get<string>('DATABASE_NAME'),
        // dialectOptions: {
        //   ssl: {
        //     require: true,
        //     rejectUnauthorized: false,
        //   },
        // },
      });
      sequelize.addModels([Task]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
