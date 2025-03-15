import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { User } from './entiti/user.entity';
// Убедись, что у тебя есть сущность пользователя

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Подключаем сущность
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
