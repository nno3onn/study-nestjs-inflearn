import { CommentsCreateDto } from '../comments.create.dto';
import { ApiOperation } from '@nestjs/swagger';
import { CommentsService } from './../services/comments.service';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: '모든 고양이 프로필에 적힌 댓글 가져오기' })
  @Get()
  async getAllComments() {
    return this.commentsService.getAllComments();
  }

  @ApiOperation({ summary: '특정 고양이 프로필에 댓글 남기기' })
  @Post(':id')
  async createComment(@Param() id: string, @Body() body: CommentsCreateDto) {
    return this.commentsService.createComment(id, body);
  }

  @ApiOperation({ summary: '좋아요 수 올리기' })
  @Patch(':id')
  async plusLike(@Param() id: string) {
    return this.commentsService.plusLike(id);
  }
}
