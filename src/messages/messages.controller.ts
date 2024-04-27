import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Controller, UseFilters, UseInterceptors } from '@nestjs/common/decorators/core';
import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common/decorators/http';
import { ForbiddenException } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';
import { LoggingInterceptor } from 'src/common/logging.interceptor';
import { Roles } from 'src/roles/roles.decorator';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  // @Roles(["ADMIN"])
  @UseInterceptors(new LoggingInterceptor())
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  @UseFilters(new HttpExceptionFilter())
  findAll() {
    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(+id);
  }
}
