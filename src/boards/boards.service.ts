import { CreateBoartdto } from './dto/createBoard.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';

@Injectable()
export class BoardService {
  private boards: Board[] = [];

  getAllBoard(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoartdto): Board {
    const { title, description, price, img } = createBoardDto;

    const board: Board = {
      id: String(this.boards.length + 1),
      title,
      description,
      price: price,
      img,
      status: BoardStatus.PUBLIC, // ✅ Ensure BoardStatus.PUBLIC exists
    };

    this.boards.push(board); // ✅ Fixed push issue
    return board;
  }

  getBoardById(title: string): Board {
    const board = this.boards.find((board) => board.title === title);

    if (!board) {
      throw new NotFoundException(`Board with ID ${title} not found`);
    }

    return board;
  }
  deletBoardById(id: string): void {
    this.boards = this.boards.filter((board) => board.id !== id);
  }
  updateBoard(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
  updateBoardDetails(id: string, title?: string, description?: string): Board {
    const board = this.getBoardById(id);

    if (title) {
      board.title = title;
    }
    if (description) {
      board.description = description;
    }

    return board;
  }
}
