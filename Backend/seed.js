const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./model/User");
const Product = require("./model/Product");
const Order = require("./model/Orders");

dotenv.config({ path: path.join(__dirname, ".env") });

const users = [
  {
    name: "Admin User",
    email: "admin@fizcart.com",
    password: "admin123",
    role: "admin",
    verified: true,
  },
  {
    name: "Faiz Customer",
    email: "faiz@example.com",
    password: "user123",
    role: "user",
    verified: true,
  },
  {
    name: "Demo Buyer",
    email: "buyer@example.com",
    password: "user123",
    role: "user",
    verified: true,
  },
];

const products = [
  {
    name: "Wireless Headphones",
    description: "Comfortable Bluetooth headphones with deep bass and long battery life.",
    price: 2499,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    stock: 25,
    ratings: 4.5,
    numReviews: 18,
  },
  {
    name: "Smart Watch",
    description: "Fitness tracking smartwatch with heart-rate monitor and notification support.",
    price: 3999,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    stock: 15,
    ratings: 4.2,
    numReviews: 11,
  },
  {
    name: "Running Shoes",
    description: "Lightweight running shoes designed for daily comfort and grip.",
    price: 1899,
    category: "Fashion",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    stock: 40,
    ratings: 4.7,
    numReviews: 29,
  },
  {
    name: "Cotton T-Shirt",
    description: "Soft regular-fit cotton t-shirt for casual everyday wear.",
    price: 599,
    category: "Fashion",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    stock: 60,
    ratings: 4.1,
    numReviews: 8,
  },
  {
    name: "Laptop Backpack",
    description: "Water-resistant backpack with padded laptop section and extra storage.",
    price: 1299,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    stock: 30,
    ratings: 4.4,
    numReviews: 14,
  },
  {
    name: "Ceramic Coffee Mug",
    description: "Minimal ceramic mug for coffee, tea, and hot chocolate.",
    price: 299,
    category: "Home",
    imageUrl: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d",
    stock: 75,
    ratings: 4.0,
    numReviews: 6,
  },
];

const addresses = [
  {
    fullName: "Faiz Customer",
    street: "21 MG Road",
    city: "Mumbai",
    postalCode: "400001",
    country: "India",
  },
  {
    fullName: "Demo Buyer",
    street: "44 Park Street",
    city: "Kolkata",
    postalCode: "700016",
    country: "India",
  },
];

const seedData = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in Backend/.env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const seedEmails = users.map((user) => user.email);
    const seedProductNames = products.map((product) => product.name);

    const oldUsers = await User.find({ email: { $in: seedEmails } }).select("_id");
    const oldUserIds = oldUsers.map((user) => user._id);

    if (oldUserIds.length > 0) {
      await Order.deleteMany({ userId: { $in: oldUserIds } });
    }

    await User.deleteMany({ email: { $in: seedEmails } });
    await Product.deleteMany({ name: { $in: seedProductNames } });

    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    const createdUsers = await User.insertMany(hashedUsers);
    const createdProducts = await Product.insertMany(products);

    const customer = createdUsers.find((user) => user.email === "faiz@example.com");
    const buyer = createdUsers.find((user) => user.email === "buyer@example.com");

    const orders = [
      {
        userId: customer._id,
        items: [
          {
            productId: createdProducts[0]._id,
            qty: 1,
            price: createdProducts[0].price,
          },
          {
            productId: createdProducts[3]._id,
            qty: 2,
            price: createdProducts[3].price,
          },
        ],
        totalAmount: createdProducts[0].price + createdProducts[3].price * 2,
        address: addresses[0],
        paymentId: "pay_demo_001",
        status: "Delivered",
      },
      {
        userId: buyer._id,
        items: [
          {
            productId: createdProducts[2]._id,
            qty: 1,
            price: createdProducts[2].price,
          },
          {
            productId: createdProducts[4]._id,
            qty: 1,
            price: createdProducts[4].price,
          },
        ],
        totalAmount: createdProducts[2].price + createdProducts[4].price,
        address: addresses[1],
        paymentId: "pay_demo_002",
        status: "Shipped",
      },
    ];

    await Order.insertMany(orders);

    console.log("Dummy data seeded successfully");
    console.log(`Users: ${createdUsers.length}`);
    console.log(`Products: ${createdProducts.length}`);
    console.log(`Orders: ${orders.length}`);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seedData();
