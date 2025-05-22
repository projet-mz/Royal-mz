import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  },
  pingInterval: 5000, // Increase ping frequency for faster reconnections
  pingTimeout: 2000
});

const supabaseUrl = process.env.SUPABASE_URL || 'https://yjpgggnltnomvvvugoni.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const connectedClients = new Map();

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);
  
  connectedClients.set(socket.id, {
    id: socket.id,
    userId: null,
    platform: socket.handshake.query.platform || 'unknown',
    rooms: []
  });

  socket.on('authenticate', async (data) => {
    try {
      const { token } = data;
      
      const { data: user, error } = await supabase.auth.getUser(token);
      
      if (error) {
        socket.emit('auth_error', { message: 'Authentication failed' });
        return;
      }
      
      const client = connectedClients.get(socket.id);
      if (client) {
        client.userId = user.user.id;
        connectedClients.set(socket.id, client);
      }
      
      socket.join(`user:${user.user.id}`);
      
      client.rooms.push(`user:${user.user.id}`);
      
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.user.id)
        .single();
      
      if (!userError && userData) {
        socket.join(`role:${userData.role}`);
        client.rooms.push(`role:${userData.role}`);
      }
      
      socket.emit('authenticated', { userId: user.user.id });
      
      io.emit('presence_update', getPresenceData());
    } catch (error) {
      console.error('Authentication error:', error);
      socket.emit('auth_error', { message: 'Authentication failed' });
    }
  });

  socket.on('sync_state', (data) => {
    const { room, state, version } = data;
    
    socket.to(room).emit('state_update', { state, version });
  });

  socket.on('heartbeat', () => {
    socket.emit('heartbeat_ack');
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
    
    connectedClients.delete(socket.id);
    
    io.emit('presence_update', getPresenceData());
  });
});

function getPresenceData() {
  const presenceData = {
    total: connectedClients.size,
    byRole: {},
    byPlatform: {}
  };
  
  for (const client of connectedClients.values()) {
    const platform = client.platform;
    presenceData.byPlatform[platform] = (presenceData.byPlatform[platform] || 0) + 1;
    
    if (client.rooms) {
      for (const room of client.rooms) {
        if (room.startsWith('role:')) {
          const role = room.replace('role:', '');
          presenceData.byRole[role] = (presenceData.byRole[role] || 0) + 1;
        }
      }
    }
  }
  
  return presenceData;
}

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    connections: connectedClients.size,
    uptime: process.uptime()
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});
