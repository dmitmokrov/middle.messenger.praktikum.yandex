import { getWebsocketUrl, WSParametersType } from './BaseAPI';
import store from '../store/store';

export const createWS = (parameters: WSParametersType): WebSocket => {
  const url = getWebsocketUrl(parameters);
  const socket = new WebSocket(url);

  socket.addEventListener('open', () => {
    socket.send(
      JSON.stringify({
        content: '0',
        type: 'get old',
      })
    );
  });

  socket.addEventListener('close', (event) => {
    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  });

  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    const adapterMessage = Array.isArray(message) ? message : [message];
    const usersMessage = adapterMessage.filter(
      (message) => message.type === 'message'
    );
    const currentMessages = store.getState().chatMessages;
    store.setState('chatMessages', [...usersMessage, ...currentMessages]);
  });

  socket.addEventListener('error', (event) => {
    console.log('Ошибка', event.message);
  });

  store.setState('socket', socket);

  return socket;
};
