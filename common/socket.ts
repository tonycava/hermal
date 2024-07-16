import { io } from 'socket.io-client';

const socket = io('http://10.31.37.161:3001');

export default socket;