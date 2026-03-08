require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  {
    name: 'Kanjivaram Pure Silk Saree',
    description: 'Handwoven pure Kanjivaram silk saree with traditional temple border and rich pallu. Perfect for weddings and special occasions.',
    price: 18999,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=400&fit=crop',
    stock: 8
  },
  {
    name: 'Banarasi Georgette Saree',
    description: 'Elegant Banarasi georgette saree with intricate zari work and floral motifs. Lightweight and comfortable for all-day wear.',
    price: 12499,
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&h=400&fit=crop',
    stock: 12
  },
  {
    name: 'Bridal Silk Saree with Heavy Zari',
    description: 'Luxurious bridal silk saree featuring heavy zari embroidery and stone work. Comes with designer blouse piece.',
    price: 24999,
    image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=400&fit=crop',
    stock: 5
  },
  {
    name: 'Tussar Silk Saree',
    description: 'Pure Tussar silk saree with natural texture and elegant drape. Features traditional block prints and tassel details.',
    price: 8999,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop&sat=-50',
    stock: 15
  },
  {
    name: 'Narayanpet Cotton Saree',
    description: 'Authentic Narayanpet cotton saree with contrast border. Soft, breathable fabric ideal for daily wear and comfort.',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=400&fit=crop&hue=30',
    stock: 20
  },
  {
    name: 'Designer Silk Saree with Embroidery',
    description: 'Contemporary designer silk saree with modern embroidery patterns. Perfect blend of tradition and style.',
    price: 15999,
    image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop&hue=30',
    stock: 10
  },
  {
    name: 'Chanderi Silk Cotton Saree',
    description: 'Elegant Chanderi silk cotton blend with delicate zari border. Lightweight and perfect for festive occasions.',
    price: 6799,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=400&fit=crop&hue=60',
    stock: 14
  },
  {
    name: 'Patola Silk Saree',
    description: 'Traditional Patola silk saree with geometric patterns and vibrant colors. Handcrafted with precision and care.',
    price: 21999,
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&h=400&fit=crop&hue=90',
    stock: 6
  },
  {
    name: 'Linen Saree with Silver Border',
    description: 'Premium linen saree with elegant silver zari border. Breathable fabric perfect for summer occasions.',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=400&fit=crop&sat=-30',
    stock: 18
  },
  {
    name: 'Mysore Silk Saree',
    description: 'Pure Mysore silk saree with rich texture and lustrous finish. Features traditional motifs and gold zari work.',
    price: 16499,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop&hue=120',
    stock: 9
  },
  {
    name: 'Pochampally Ikat Silk Saree',
    description: 'Authentic Pochampally ikat silk saree with traditional tie-dye patterns. Unique design and vibrant colors.',
    price: 11999,
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=400&fit=crop&hue=150',
    stock: 11
  },
  {
    name: 'Organza Silk Saree with Floral Print',
    description: 'Delicate organza silk saree with beautiful floral prints. Lightweight and elegant for evening events.',
    price: 7999,
    image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop&hue=180',
    stock: 13
  }
];

const seedProducts = async () => {
  try {
    const DB_URI = `mongodb+srv://vikassilksrjpm_db_user:${process.env.DB_PASSWORD}@cluster0.npfu9oo.mongodb.net/vikassilks?retryWrites=true&w=majority`;
    
    await mongoose.connect(DB_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} products created successfully`);
    
    console.log('\nProduct IDs:');
    createdProducts.forEach(product => {
      console.log(`${product.name}: ${product._id}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
