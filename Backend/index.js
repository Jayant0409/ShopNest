  const express = require('express');
  const cors = require('cors');
  const connectDB = require('./config/mongodb.js');
  const app = express();
  const dotenv = require('dotenv');

  dotenv.config();

  connectDB(); // Connect to MongoDB

  app.use(express.json());


  app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', process.env.FRONTEND_URL],
  credentials: true
}));

  app.use("/api/auth", require("./routes/authRoutes.js"));
  app.use("/api/products", require("./routes/productRoutes.js"));
  app.use("/api/orders", require("./routes/orderRoutes.js"))
  app.use("/api/payment",require("./routes/paymentRoutes.js"))
  app.use('/api/analytics', require('./routes/analyticsRoutes')); 


 // Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('ShopNest API is running in Development mode...');
  });
}

console.log("Razorpay Key:", process.env.RAZORPAY_KEY_ID);

 const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

