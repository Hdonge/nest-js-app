import { OnModuleInit } from "@nestjs/common";
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

import { Logger } from "src/shared/services/logger";

@WebSocketGateway()
export class PostGateway implements OnModuleInit {
    @WebSocketServer()
    server: Server;

    constructor(private readonly logger: Logger) {
        this.logger.mainContext = 'PostGateway';
    }

    onModuleInit() {
        this.server.on('connection', (socket) => {
            this.logger.verbose(`${socket.id} Connected`);
        });
    }

    @SubscribeMessage('postcreated')
    handlePostCreationEvent(
        @MessageBody() body: any
    ) {
        this.logger.debug(JSON.stringify(body), 'handlePostCreationEvent');
        this.server.emit('successfulPostCreated', { postId: '123' });
        return {
            'postcreated': {
                'received': true
            }
        };
    }
}
