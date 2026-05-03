require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  // ── JUST ARRIVED ─────────────────────────────────────────────────
  { name: 'Elegant Silk Saree', description: 'Handwoven pure silk saree with traditional motifs.', price: 8999, image: 'https://placehold.co/400x600/FFE5E5/8B4513?text=Silk+Saree', category: 'sarees', subcategory: 'art-silk', stock: 10, tags: ['just-arrived'] },
  { name: 'Traditional Cotton Saree', description: 'Soft breathable cotton saree for daily wear.', price: 3499, image: 'https://placehold.co/400x600/FFF0E5/8B4513?text=Cotton+Saree', category: 'sarees', subcategory: 'cotton-sarees', stock: 15, tags: ['just-arrived'] },
  { name: 'Pure Tussar Silk', description: 'Natural texture tussar silk with block prints.', price: 6799, image: 'https://placehold.co/400x600/FFF5E5/8B4513?text=Tussar+Silk', category: 'sarees', subcategory: 'art-silk', stock: 12, tags: ['just-arrived'] },
  { name: 'Handwoven Cotton Kurti', description: 'Handwoven cotton kurti with embroidery details.', price: 1299, image: 'https://placehold.co/400x600/FFE8E8/8B4513?text=Cotton+Kurti', category: 'womens', subcategory: 'kurtis', stock: 20, tags: ['just-arrived'] },
  { name: 'Luxury Silk Collection', description: 'Premium silk saree with gold zari border.', price: 12999, image: 'https://placehold.co/400x600/FFF8E5/8B4513?text=Luxury+Silk', category: 'sarees', subcategory: 'semi-kanchi', stock: 8, tags: ['just-arrived'] },
  { name: 'Festive Special Saree', description: 'Vibrant festive saree with rich embroidery.', price: 7499, image: 'https://placehold.co/400x600/FFE3E3/8B4513?text=Festive+Saree', category: 'sarees', subcategory: 'art-silk', stock: 14, tags: ['just-arrived'] },
  { name: 'Classic Elegance Saree', description: 'Timeless classic saree for all occasions.', price: 9299, image: 'https://placehold.co/400x600/FFF3E5/8B4513?text=Classic+Saree', category: 'sarees', subcategory: 'semi-kanchi', stock: 9, tags: ['just-arrived'] },
  { name: 'Royal Kanjivaram', description: 'Pure Kanjivaram silk with temple border.', price: 18999, image: 'https://placehold.co/400x600/FFE6E6/8B4513?text=Kanjivaram', category: 'sarees', subcategory: 'semi-kanchi', stock: 6, tags: ['just-arrived'] },
  { name: 'Printed Linen Saree', description: 'Breathable linen saree with modern prints.', price: 4999, image: 'https://placehold.co/400x600/FFF0E0/8B4513?text=Linen+Saree', category: 'sarees', subcategory: 'cotton-sarees', stock: 18, tags: ['just-arrived'] },

  // ── BRIDAL COLLECTION ─────────────────────────────────────────────
  { name: 'Royal Bridal Silk Saree with Zari Work', description: 'Luxurious bridal silk saree with heavy zari embroidery and stone work.', price: 25999, image: 'https://placehold.co/400x600/FFE5D5/8B4513?text=Bridal+1', category: 'sarees', subcategory: 'semi-kanchi', stock: 5, tags: ['bridal'] },
  { name: 'Traditional Red Bridal Kanjivaram', description: 'Classic red Kanjivaram silk saree for the perfect bridal look.', price: 32999, image: 'https://placehold.co/400x600/FFD5D5/8B4513?text=Bridal+2', category: 'sarees', subcategory: 'semi-kanchi', stock: 4, tags: ['bridal'] },
  { name: 'Designer Bridal Silk with Heavy Embroidery', description: 'Designer bridal silk saree with intricate hand embroidery.', price: 45999, image: 'https://placehold.co/400x600/FFE8D5/8B4513?text=Bridal+3', category: 'sarees', subcategory: 'semi-kanchi', stock: 3, tags: ['bridal'] },
  { name: 'Golden Bridal Saree with Stone Work', description: 'Stunning golden saree adorned with premium stone work.', price: 38999, image: 'https://placehold.co/400x600/FFF5D5/8B4513?text=Bridal+4', category: 'sarees', subcategory: 'semi-kanchi', stock: 4, tags: ['bridal'] },
  { name: 'Maroon Bridal Silk Cotton Blend', description: 'Rich maroon silk cotton blend saree for bridal occasions.', price: 28999, image: 'https://placehold.co/400x600/FFE0D5/8B4513?text=Bridal+5', category: 'sarees', subcategory: 'semi-kanchi', stock: 6, tags: ['bridal'] },
  { name: 'Pink Bridal Designer Collection', description: 'Elegant pink bridal saree with designer pallu and border.', price: 42999, image: 'https://placehold.co/400x600/FFD5E5/8B4513?text=Bridal+6', category: 'sarees', subcategory: 'semi-kanchi', stock: 3, tags: ['bridal'] },
  { name: 'Green Bridal Silk with Gold Border', description: 'Auspicious green silk saree with heavy gold zari border.', price: 35999, image: 'https://placehold.co/400x600/D5FFE5/8B4513?text=Bridal+7', category: 'sarees', subcategory: 'semi-kanchi', stock: 5, tags: ['bridal'] },
  { name: 'Orange Bridal Kanjivaram Special', description: 'Vibrant orange Kanjivaram saree for the modern bride.', price: 29999, image: 'https://placehold.co/400x600/FFE8D0/8B4513?text=Bridal+8', category: 'sarees', subcategory: 'semi-kanchi', stock: 4, tags: ['bridal'] },
];

const seedTaggedProducts = async () => {
  try {
    const DB_URI = `mongodb+srv://vikassilksrjpm_db_user:${process.env.DB_PASSWORD}@cluster0.npfu9oo.mongodb.net/vikassilks?retryWrites=true&w=majority`;
    await mongoose.connect(DB_URI);
    console.log('Connected to MongoDB');

    // Remove existing tagged products and re-insert
    await Product.deleteMany({ tags: { $in: ['just-arrived', 'bridal'] } });
    console.log('Cleared existing tagged products');

    const created = await Product.insertMany(products);
    console.log(`${created.length} products seeded`);
    console.log(`  just-arrived: ${created.filter(p => p.tags.includes('just-arrived')).length}`);
    console.log(`  bridal:       ${created.filter(p => p.tags.includes('bridal')).length}`);

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedTaggedProducts();
