require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const adminPhone = '9999999999'; 
  const adminPassword = 'admin123';
  
  // Check if user already exists
  let user = await User.findOne({ phone: adminPhone });
  
  if (user) {
    // Update existing user to ADMIN role
    user.role = 'ADMIN';
    await user.save();
    console.log(`✅ Existing user ${adminPhone} has been promoted to ADMIN!`);
  } else {
    // Create a brand new Admin user
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    user = await User.create({
      name: 'System Admin',
      phone: adminPhone,
      password: hashedPassword,
      role: 'ADMIN',
      walletBalance: 0
    });
    console.log(`✅ New Admin created successfully!`);
    console.log(`   📱 Phone: ${adminPhone}`);
    console.log(`   🔑 Password: ${adminPassword}`);
  }
  
  process.exit();
}).catch(err => {
  console.error('❌ Database Error:', err);
  process.exit(1);
});