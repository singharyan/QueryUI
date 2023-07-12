let socket;

if (typeof WebSocket !== 'undefined') {
  socket = new WebSocket('wss://ws-server-tensax.onrender.com/:5000');
} else {
  console.warn('WebSocket is not supported');
}

export { socket };