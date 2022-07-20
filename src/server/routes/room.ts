import * as trpc from '@trpc/server';
import { randomUUID } from 'crypto';
import { createRouter } from '../createRouter';
import { Events } from './../../constant/events';
import {
  Message,
  messageSubSchema,
  sendMessageSchema,
} from './../../constant/schemas';

export const roomRouter = createRouter()
  .mutation('send-message', {
    input: sendMessageSchema,
    resolve: ({ ctx, input }) => {
      const message: Message = {
        id: randomUUID(),
        ...input,
        sentAt: new Date(),
        sender: {
          name: ctx.session?.user?.name || 'unknown',
        },
      };

      ctx.ee.emit(Events.SEND_MESSAGE, message);

      return true;
    },
  })
  .subscription('onSendMessage', {
    input: messageSubSchema,
    resolve: ({ ctx, input }) => {
      return new trpc.Subscription<Message>((emit) => {
        const onMessage = (data: Message) => {
          if (input.roomId === data.roomId) {
            emit.data(data);
          }
        };

        ctx.ee.on(Events.SEND_MESSAGE, onMessage);

        return () => {
          ctx.ee.off(Events.SEND_MESSAGE, onMessage);
        };
      });
    },
  });
