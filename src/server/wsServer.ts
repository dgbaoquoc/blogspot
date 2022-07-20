import { applyWSSHandler } from '@trpc/server/adapters/ws';
import ws from 'ws';
import { createContext } from './createContext';
import { appRouter } from './routes/app.router';

const wss = new ws.Server({
  port: 3001,
});

const handler = applyWSSHandler({
  wss,
  createContext,
  router: appRouter,
});

wss.on('connection', () => {
  console.log(`++ ws connection ${wss.clients.size}`);

  wss.on('close', () => {
    console.log(`-- ws close ${wss.clients.size}`);
  });
});

console.log('ws server started');

process.on('SIGTERM', () => {
  console.log('SIGTERM');

  handler.broadcastReconnectNotification();

  wss.close();
});
