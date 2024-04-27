import { Injectable } from '@nestjs/common/decorators/core';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './schema/message.schema';
import { Model } from 'mongoose';
import { CacheService } from 'src/cache/cache.service';
import { Inject, NotFoundException } from '@nestjs/common';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name, "mongoDB") private messageModel: Model<Message>,
    private readonly cacheService: CacheService
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<MessageDocument>{
    const created : MessageDocument= await this.messageModel.create(createMessageDto);
    return created;
  }

  async update(id: string,updateMessageDto:Partial<UpdateMessageDto>): Promise<MessageDocument> {
    return this.messageModel.findByIdAndUpdate(id, updateMessageDto,{ new: true });
  }

  async findAll(): Promise<MessageDocument[]> {
    this.cacheService.initTest();
    return this.messageModel.find().exec();
  }


  async findOne(id: string) {
    const record : MessageDocument = await this.messageModel.findById(id);
    if(!record){
      throw new NotFoundException();
    }
    return record;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
