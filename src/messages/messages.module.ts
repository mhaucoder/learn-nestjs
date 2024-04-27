import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { Module } from '@nestjs/common/decorators/modules';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schema/message.schema';
import { CacheCustomModule } from 'src/cache/cache.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }], "mongoDB"), CacheCustomModule],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}