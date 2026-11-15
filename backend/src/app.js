import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from './config/env.js';
import { connectDB } from './config/db.js';

import healthRoutes from './routes/health.routes.js';
import authRoutes from './routes/auth.routes.js';

import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
import categoryRoutes from './routes/category.routes.js';
import productRoutes from './routes/product.routes.js';
import inventoryRoutes from './routes/inventory.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import customerRoutes from './routes/customer.routes.js';
import adminCustomerRoutes from './routes/adminCustomer.routes.js';
import addressRoutes from './routes/address.routes.js';
import cartRoutes from './routes/cart.routes.js';
import wishlistRoutes from './routes/wishlist.routes.js';
import wholesaleRoutes from './routes/wholesale.routes.js';

import checkoutRoutes from './routes/checkout.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import orderRoutes from './routes/order.routes.js';
import employeeRoutes from './routes/employee.routes.js';
import offlineSaleRoutes from './routes/offlineSale.routes.js';
import chatbotRoutes from './routes/chatbot.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import attendanceRoutes from './routes/attendance.routes.js';
import newsletterRoutes from './routes/newsletter.routes.js';
const app = express();
const allowedOrigins = [
  ...env.clientUrl.split(',').map(origin => origin.trim()).filter(Boolean),
  ...(env.nodeEnv === 'development' ? ['http://localhost:5173'] : []),
  'https://hynifashionstudios.vercel.app'
];

app.disable('x-powered-by');

app.use(helmet());

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json({ limit: '1mb' }));

app.use(express.urlencoded({
  extended: true
}));

if (env.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Hyni Fashion Studio API',
    health: '/api/health'
  });
});

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    error.statusCode = 503;
    next(error);
  }
});

// HEALTH API
app.use('/api/health', healthRoutes);

// AUTHENTICATION API
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);

app.use('/api/products', productRoutes);

app.use('/api/inventory', inventoryRoutes);
app.use('/api/uploads', uploadRoutes);
// app.use('/api/customer', customerRoutes);
// CUSTOMER SUB-ROUTES
// CUSTOMER SUB-ROUTES
app.use('/api/customer/addresses', addressRoutes);
app.use('/api/customer/cart', cartRoutes);
app.use('/api/customer/wishlist', wishlistRoutes);

// CUSTOMER PROFILE ROUTES
app.use('/api/customer/profile', customerRoutes);

// WHOLESALE ROUTES
app.use('/api/wholesale', wholesaleRoutes);
// ERROR HANDLING
// UPI PAYMENT TEST API (TEMPORARY)

// WHOLESALE ROUTES
// app.use('/api/wholesale', wholesaleRoutes);

// CHECKOUT ROUTES
app.use('/api/checkout', checkoutRoutes);

// UPI PAYMENT TEST ROUTES

// PAYMENT SUBMISSION AND ADMIN VERIFICATION
app.use('/api/payments', paymentRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/offline-sales', offlineSaleRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/admin/dashboard', dashboardRoutes);
app.use('/api/admin/customers', adminCustomerRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use(notFound);

app.use(errorHandler);

export default app;