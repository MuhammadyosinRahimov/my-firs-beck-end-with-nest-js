import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BoardsController } from './boards/boards.controller';
import { BoardService } from './boards/boards.service';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entiti/user.entity';
import { Product } from './product/entity/product.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Product], // Иловаи Product Entity
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Product]), // Иловаи Product Entity
    AuthModule,
  ],
  controllers: [BoardsController, ProductController],
  providers: [BoardService, ProductService],
})
export class AppModule {}
