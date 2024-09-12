//server.ts
import dotenv from 'dotenv';
dotenv.config();
console.log('Environment variables loaded:');
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not set');
import { createServer } from 'http';
import { Server } from 'socket.io';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import codeRoutes from './routes/code.routes';
import authRoutes from './routes/auth.routes';
import workspaceRoutes from './routes/workspace.routes';
import creditRoutes from './routes/credit.routes';
import paymentRoutes from './routes/payment.routes';
import creditPackageRoutes from './routes/credit-package.routes';
import subscriptionRoutes from './routes/subscription.routes';
import userRoutes from './routes/user.routes';
import adminRoutes from './routes/admin.routes';
import { authMiddleware } from './middleware/auth.middleware';
import { setupScheduledTasks } from './utils/scheduled-tasks';
import { adminMiddleware } from './middleware/admin.middleware';
import { initializeIo } from './services/socket.service';

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:4200',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Stripe webhook route should be before the express.json() middleware
app.use('/api/payments/webhook', express.raw({type: 'application/json'}), paymentRoutes);

app.use(express.json());

mongoose.set('strictQuery', false);

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/code_input_db');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

connectToMongoDB();

app.use('/api/auth', authRoutes);
app.use('/api/code', authMiddleware, codeRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/credits', creditRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/credit-packages', creditPackageRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', authMiddleware, adminMiddleware, adminRoutes);
app.use('/api/admin', adminRoutes);

// Set up scheduled tasks
setupScheduledTasks();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:4200',
    methods: ['GET', 'POST']
  }
});

initializeIo(io);

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { httpServer, io };