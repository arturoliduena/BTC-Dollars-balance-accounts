import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from "@nestjs/common";

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger("EventsGateway");
  private previousExchangeRate: number;
  private exchangeRate: number;

  afterInit(server: Server) {
    this.logger.log('Initialized!');
    this.exchangeRate = this.getExchangeRate()
    this.previousExchangeRate = this.getExchangeRate()
      this.sendMessage('events', {current: this.exchangeRate, previous: this.previousExchangeRate})
    setInterval(() => {
      this.previousExchangeRate = this.exchangeRate;
      this.exchangeRate = this.getExchangeRate()
      this.sendMessage('events', {current: this.exchangeRate, previous: this.previousExchangeRate})
    }, 15000);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.sendMessage('events', {current: this.exchangeRate, previous: this.previousExchangeRate})
  }

  sendMessage(event: string, value: number | string | { current: number, previous: number }): void {
    this.server.emit(event, value);
  }

  getExchangeRate(): number {
    return Number((Math.random() * 100).toFixed(2));
  }

  @SubscribeMessage('eventsFromClient')
  handleEvent(@MessageBody() data: string): string {
    return data;
  }
}