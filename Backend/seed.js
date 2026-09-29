const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/userSchema');
const Product = require('./models/productSchema');
const Order = require('./models/orderSchema');
const connectDB = require('./config/mongodb');

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log('✓ Database cleared');

    // Seed Users
    console.log('👥 Seeding users...');
    const hashedPassword = await bcrypt.hash('password123', 10);
    const users = await User.insertMany([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: hashedPassword,
        role: 'user',
        isVerified: true,
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: hashedPassword,
        role: 'user',
        isVerified: true,
      },
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
        isVerified: true,
      },
      {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        password: hashedPassword,
        role: 'user',
        isVerified: false,
      },
      {
        name: 'Sarah Williams',
        email: 'sarah@example.com',
        password: hashedPassword,
        role: 'user',
        isVerified: true,
      },
    ]);
    console.log(`✓ Created ${users.length} users`);

    // Seed Products
    console.log('📦 Seeding products...');
    const products = await Product.insertMany([
      {
        name: 'Wireless Noise-Cancelling Headphones',
        description: 'Immersive sound experience with advanced active noise cancellation.',
        category: 'Electronics',
        stock: 15,
        price: 299.99,
        ratings: 4.8,
        numReviews: 24,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
      {
        name: 'Minimalist Modern Chair',
        description: 'A stylish and comfortable addition to any contemporary living room.',
        category: 'Furniture',
        stock: 30,
        price: 150.00,
        ratings: 4.2,
        numReviews: 12,
        imageUrl: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
      {
        name: 'Professional DSLR Camera',
        description: 'Capture stunning moments with high-resolution clarity and speed.',
        category: 'Electronics',
        stock: 8,
        price: 1199.99,
        ratings: 4.9,
        numReviews: 50,
        imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
      {
        name: 'Classic White Sneakers',
        description: 'Versatile and comfortable, a staple for any casual outfit.',
        category: 'Clothing',
        stock: 50,
        price: 85.00,
        ratings: 4.5,
        numReviews: 89,
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
      {
        name: 'Smart Fitness Watch',
        description: 'Track your heart rate, steps, and sleep with this sleek smartwatch.',
        category: 'Electronics',
        stock: 40,
        price: 199.99,
        ratings: 4.6,
        numReviews: 65,
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
      {
        name: 'Portable Bluetooth Speaker',
        description: 'Compact speaker with deep bass and 12-hour battery life.',
        category: 'Electronics',
        stock: 60,
        price: 59.99,
        ratings: 4.3,
        numReviews: 102,
        imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
      {
        name: 'Leather Messenger Bag',
        description: 'Premium full-grain leather bag, perfect for work or travel.',
        category: 'Accessories',
        stock: 25,
        price: 129.99,
        ratings: 4.7,
        numReviews: 34,
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
      {
        name: 'Ceramic Coffee Mug Set',
        description: 'Set of 4 handcrafted ceramic mugs, dishwasher and microwave safe.',
        category: 'Home',
        stock: 45,
        price: 32.99,
        ratings: 4.4,
        numReviews: 21,
        imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
      {
        name: "Men's Slim Fit Denim Jacket",
        description: 'Durable denim jacket with a modern slim fit and classic wash.',
        category: 'Clothing',
        stock: 35,
        price: 74.99,
        ratings: 4.1,
        numReviews: 18,
        imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
      {
        name: "Women's Floral Summer Dress",
        description: 'Lightweight breathable fabric with a flattering floral print.',
        category: 'Clothing',
        stock: 28,
        price: 49.99,
        ratings: 4.5,
        numReviews: 41,
        imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
      {
        name: 'Stainless Steel Cookware Set',
        description: '10-piece cookware set, oven safe and induction compatible.',
        category: 'Home',
        stock: 12,
        price: 249.99,
        ratings: 4.8,
        numReviews: 29,
        imageUrl: 'https://images.unsplash.com/photo-1584990347449-a2d4c3e2c6f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
      {
        name: 'Yoga Mat with Carry Strap',
        description: 'Extra thick non-slip mat, ideal for yoga, pilates, and stretching.',
        category: 'Sports',
        stock: 55,
        price: 27.99,
        ratings: 4.6,
        numReviews: 73,
        imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
      {
        name: 'Adjustable Dumbbell Set',
        description: 'Space-saving dumbbells adjustable from 5 to 25 lbs per hand.',
        category: 'Sports',
        stock: 18,
        price: 179.99,
        ratings: 4.7,
        numReviews: 38,
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
      {
        name: 'Organic Face Moisturizer',
        description: 'Lightweight daily moisturizer with SPF 30 and natural botanicals.',
        category: 'Beauty',
        stock: 70,
        price: 24.99,
        ratings: 4.4,
        numReviews: 56,
        imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
      {
        name: 'Matte Lipstick Set',
        description: 'Long-lasting matte lipstick collection in 6 versatile shades.',
        category: 'Beauty',
        stock: 65,
        price: 34.99,
        ratings: 4.5,
        numReviews: 47,
        imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
      {
        name: 'Mechanical Gaming Keyboard',
        description: 'RGB backlit keyboard with hot-swappable switches for gamers.',
        category: 'Electronics',
        stock: 22,
        price: 89.99,
        ratings: 4.6,
        numReviews: 61,
        imageUrl: 'https://images.unsplash.com/photo-1595225476474-63038da0b32b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
      {
        name: 'Wireless Ergonomic Mouse',
        description: 'Comfortable ergonomic design to reduce wrist strain during long use.',
        category: 'Electronics',
        stock: 48,
        price: 39.99,
        ratings: 4.3,
        numReviews: 33,
        imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
      {
        name: 'Wooden Bookshelf',
        description: '5-tier solid wood bookshelf with a rustic industrial finish.',
        category: 'Furniture',
        stock: 10,
        price: 189.99,
        ratings: 4.5,
        numReviews: 15,
        imageUrl: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
      {
        name: 'Memory Foam Mattress Topper',
        description: 'Queen-size topper for pressure relief and better sleep quality.',
        category: 'Home',
        stock: 20,
        price: 119.99,
        ratings: 4.7,
        numReviews: 27,
        imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
      {
        name: 'Polarized Sunglasses',
        description: 'UV400 protection sunglasses with a lightweight aluminum frame.',
        category: 'Accessories',
        stock: 38,
        price: 44.99,
        ratings: 4.4,
        numReviews: 22,
        imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
      {
        name: "Kids' Building Blocks Set",
        description: '150-piece educational building block set for creative play.',
        category: 'Toys',
        stock: 42,
        price: 29.99,
        ratings: 4.8,
        numReviews: 64,
        imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
      {
        name: 'Insulated Stainless Water Bottle',
        description: 'Keeps drinks cold for 24 hours or hot for 12, leak-proof design.',
        category: 'Sports',
        stock: 80,
        price: 22.99,
        ratings: 4.6,
        numReviews: 91,
        imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
      {
        name: 'Running Shoes - Lightweight',
        description: 'Breathable mesh upper with responsive cushioning for daily runs.',
        category: 'Footwear',
        stock: 33,
        price: 94.99,
        ratings: 4.7,
        numReviews: 78,
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
      {
        name: 'Leather Ankle Boots',
        description: 'Genuine leather boots with a durable rubber sole for all seasons.',
        category: 'Footwear',
        stock: 19,
        price: 109.99,
        ratings: 4.5,
        numReviews: 26,
        imageUrl: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
      {
        name: 'Scented Soy Candle Set',
        description: 'Set of 3 hand-poured soy candles in lavender, vanilla, and sandalwood.',
        category: 'Home',
        stock: 50,
        price: 19.99,
        ratings: 4.3,
        numReviews: 19,
        imageUrl: 'https://images.unsplash.com/photo-1602523961358-f9f03dd557dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
    ]);
    console.log(`✓ Created ${products.length} products`);

    // Seed Orders
    console.log('🛒 Seeding orders...');
    const orders = await Order.insertMany([
      {
        userId: users[0]._id,
        items: [
          {
            productId: products[0]._id,
            qty: 1,
            price: products[0].price,
          },
          {
            productId: products[1]._id,
            qty: 2,
            price: products[1].price,
          },
        ],
        totalAmount: products[0].price + products[1].price * 2,
        address: {
          fullName: 'John Doe',
          street: '123 Main St',
          city: 'New York',
          postalCode: '10001',
          country: 'USA',
        },
        status: 'Delivered',
        paymentId: 'pay_123456789',
      },
      {
        userId: users[1]._id,
        items: [
          {
            productId: products[2]._id,
            qty: 1,
            price: products[2].price,
          },
        ],
        totalAmount: products[2].price,
        address: {
          fullName: 'Jane Smith',
          street: '456 Oak Ave',
          city: 'Los Angeles',
          postalCode: '90001',
          country: 'USA',
        },
        status: 'Shipped',
        paymentId: 'pay_987654321',
      },
      {
        userId: users[0]._id,
        items: [
          {
            productId: products[3]._id,
            qty: 1,
            price: products[3].price,
          },
          {
            productId: products[2]._id,
            qty: 1,
            price: products[2].price,
          },
        ],
        totalAmount: products[3].price + products[2].price,
        address: {
          fullName: 'John Doe',
          street: '123 Main St',
          city: 'New York',
          postalCode: '10001',
          country: 'USA',
        },
        status: 'Pending',
        paymentId: 'pay_555666777',
      },
      {
        userId: users[4]._id,
        items: [
          {
            productId: products[3]._id,
            qty: 3,
            price: products[3].price,
          },
        ],
        totalAmount: products[3].price * 3,
        address: {
          fullName: 'Sarah Williams',
          street: '789 Pine Rd',
          city: 'Chicago',
          postalCode: '60601',
          country: 'USA',
        },
        status: 'Delivered',
        paymentId: 'pay_111222333',
      },
      {
        userId: users[1]._id,
        items: [
          {
            productId: products[1]._id,
            qty: 1,
            price: products[1].price,
          },
          {
            productId: products[0]._id,
            qty: 1,
            price: products[0].price,
          },
        ],
        totalAmount: products[1].price + products[0].price,
        address: {
          fullName: 'Jane Smith',
          street: '456 Oak Ave',
          city: 'Los Angeles',
          postalCode: '90001',
          country: 'USA',
        },
        status: 'Cancelled',
        paymentId: null,
      },
    ]);
    console.log(`✓ Created ${orders.length} orders`);

    console.log('\n✨ Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Products: ${products.length}`);
    console.log(`   - Orders: ${orders.length}`);
    console.log('\n💡 Test credentials:');
    console.log('   - Email: john@example.com');
    console.log('   - Email: admin@example.com');
    console.log('   - Password: password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();