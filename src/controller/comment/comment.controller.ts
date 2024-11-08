import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentDto } from './commet-dto/comment';
import { CommentService } from './comment.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('comment')
@Controller('comment')
export class CommentController {

    constructor(private readonly commentService: CommentService) { }

    @Get(':id')
    List(@Param('id') id: string) {
        return this.commentService.list(id);
    }
    @Post()
    Register(@Body() commentDto: CommentDto) {
        return this.commentService.register(commentDto);
    }
}
