import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { Module } from '@nestjs/common/decorators/modules';

@Module({
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
