import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Transaction from '../models/Transaction';
import User from '../models/User';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

async function seedDatabase() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/loopr';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Transaction.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️ Cleared existing data');

    // Create demo user
    const hashedPassword = await bcrypt.hash('password', 10);
    const demoUser = new User({
      email: 'admin@loopr.com',
      password: hashedPassword,
      name: 'Admin User'
    });
    await demoUser.save();
    console.log('👤 Created demo user');

    // Read and import transactions from JSON file
    const transactionsPath = path.join(__dirname, '../../data/transactions.json');
    
    if (fs.existsSync(transactionsPath)) {
      const rawData = fs.readFileSync(transactionsPath, 'utf8');
      const transactions = JSON.parse(rawData);
      
      // Transform and insert transactions
      const transformedTransactions = transactions.map((transaction: any) => {
        const { id, ...rest } = transaction; // Remove id field, MongoDB will auto-generate _id
        return {
          ...rest,
          date: new Date(rest.date) // Ensure date is proper Date object
        };
      });
      
      await Transaction.insertMany(transformedTransactions);
      console.log(`💾 Inserted ${transformedTransactions.length} transactions`);
    } else {
      // Create sample transactions if JSON file doesn't exist
      const sampleTransactions = [
        {
          date: new Date('2024-01-15'),
          amount: 5000,
          category: 'Revenue',
          status: 'Paid',
          user_id: 'john_doe',
          user_profile: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
        },
        {
          date: new Date('2024-01-16'),
          amount: 1200,
          category: 'Expense',
          status: 'Paid',
          user_id: 'jane_smith',
          user_profile: 'https://images.unsplash.com/photo-1494790108755-2616b612b190?w=150&h=150&fit=crop&crop=face'
        },
        {
          date: new Date('2024-01-17'),
          amount: 3500,
          category: 'Revenue',
          status: 'Pending',
          user_id: 'bob_wilson',
          user_profile: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        },
        {
          date: new Date('2024-01-18'),
          amount: 800,
          category: 'Expense',
          status: 'Paid',
          user_id: 'alice_johnson',
          user_profile: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
        },
        {
          date: new Date('2024-01-19'),
          amount: 2200,
          category: 'Revenue',
          status: 'Paid',
          user_id: 'john_doe',
          user_profile: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
        }
      ];
      
      await Transaction.insertMany(sampleTransactions);
      console.log(`💾 Inserted ${sampleTransactions.length} sample transactions`);
    }

    console.log('🎉 Database seeded successfully!');
    console.log('\n📋 Demo credentials:');
    console.log('Email: admin@loopr.com');
    console.log('Password: password');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  seedDatabase();
}

export default seedDatabase;
