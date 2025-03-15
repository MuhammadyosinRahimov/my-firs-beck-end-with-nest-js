import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { BoardService } from './boards.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Board, BoardStatus } from './board.model';
import { CreateBoartdto } from './dto/createBoard.dto';

@ApiTags('api')
@Controller('api')
export class BoardsController {
  constructor(private boardService: BoardService) {}

  @ApiResponse({ status: 200, description: 'Рӯйхати ҳамаи лавҳаҳо' })
  @Get('/get')
  getAllBoard(): Board[] {
    return this.boardService.getAllBoard();
  }

  @ApiResponse({ status: 200, description: 'Лавҳа бо муваффақият эҷод шуд' })
  @Post('/post')
  createBoard(@Body() createBoartdto: CreateBoartdto): Board {
    return this.boardService.createBoard(createBoartdto);
  }
  @Get('/:title')
  getBoardById(@Param('title') title: string): Board {
    return this.boardService.getBoardById(title);
  }
  @Delete('/delet/:id')
  deleteBoardById(@Param('id') id: string): void {
    this.boardService.deletBoardById(id);
  }
  @Patch('/status/:id')
  updateBoard(@Param('id') id: string, @Body('status') status: BoardStatus) {
    return this.boardService.updateBoard(id, status);
  }

  @ApiResponse({
    status: 200,
    description: 'Board details updated successfully',
  })
  @Put('/:id/details')
  updateBoardDetails(
    @Param('id') id: string,
    @Body('title') title?: string,
    @Body('description') description?: string,
  ): Board {
    return this.boardService.updateBoardDetails(id, title, description);
  }
}
