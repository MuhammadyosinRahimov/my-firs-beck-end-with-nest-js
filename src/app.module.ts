import { Module } from '@nestjs/common';
import { BoardsController } from './boards/boards.controller';
import { BoardService } from './boards/boards.service';

@Module({
  imports: [],
  controllers: [BoardsController],
  providers: [BoardService],
})
export class AppModule {}
