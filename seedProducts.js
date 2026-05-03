require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  // ── WOMENS → KURTIS ──────────────────────────────────────────────
  { name: 'Floral Print Kurti', description: 'Beautiful floral print kurti in soft cotton fabric.', price: 1299, image: 'https://placehold.co/400x500/FFE5E5/8B4513?text=Kurti+1', category: 'womens', subcategory: 'kurtis', stock: 20 },
  { name: 'Embroidered Cotton Kurti', description: 'Elegant embroidered cotton kurti for festive occasions.', price: 1599, image: 'https://placehold.co/400x500/FFF0E5/8B4513?text=Kurti+2', category: 'womens', subcategory: 'kurtis', stock: 15 },
  { name: 'Silk Blend Kurti', description: 'Premium silk blend kurti with intricate detailing.', price: 2199, image: 'https://placehold.co/400x500/FFE0E0/8B4513?text=Kurti+3', category: 'womens', subcategory: 'kurtis', stock: 12 },
  { name: 'Anarkali Kurti', description: 'Flowing Anarkali kurti with traditional embroidery.', price: 1899, image: 'https://placehold.co/400x500/FFF5E5/8B4513?text=Kurti+4', category: 'womens', subcategory: 'kurtis', stock: 18 },

  // ── WOMENS → SALWAR SUITS ────────────────────────────────────────
  { name: 'Cotton Salwar Suit', description: 'Comfortable cotton salwar suit for daily wear.', price: 2499, image: 'https://placehold.co/400x500/FFE5E5/8B4513?text=Salwar+1', category: 'womens', subcategory: 'salwar-suits', stock: 14 },
  { name: 'Printed Co-ord Set', description: 'Trendy printed co-ord set for casual outings.', price: 1999, image: 'https://placehold.co/400x500/FFF0E5/8B4513?text=Coord+2', category: 'womens', subcategory: 'salwar-suits', stock: 16 },
  { name: 'Embroidered Salwar Set', description: 'Festive embroidered salwar set with dupatta.', price: 3299, image: 'https://placehold.co/400x500/FFE0E0/8B4513?text=Salwar+3', category: 'womens', subcategory: 'salwar-suits', stock: 10 },
  { name: 'Linen Co-ord Set', description: 'Breathable linen co-ord set for summer wear.', price: 2799, image: 'https://placehold.co/400x500/FFF5E5/8B4513?text=Coord+4', category: 'womens', subcategory: 'salwar-suits', stock: 12 },

  // ── WOMENS → TSHIRTS ─────────────────────────────────────────────
  { name: 'Graphic Print Tee', description: 'Trendy graphic print tee in soft cotton.', price: 699, image: 'https://placehold.co/400x500/FFE5E5/8B4513?text=Tshirt+1', category: 'womens', subcategory: 'tshirts', stock: 30 },
  { name: 'Solid Cotton Tee', description: 'Classic solid cotton tee for everyday wear.', price: 599, image: 'https://placehold.co/400x500/FFF0E5/8B4513?text=Tshirt+2', category: 'womens', subcategory: 'tshirts', stock: 35 },
  { name: 'Oversized Tee', description: 'Comfortable oversized tee for a relaxed look.', price: 899, image: 'https://placehold.co/400x500/FFE0E0/8B4513?text=Tshirt+3', category: 'womens', subcategory: 'tshirts', stock: 25 },
  { name: 'Striped Tee', description: 'Classic striped tee with a modern fit.', price: 749, image: 'https://placehold.co/400x500/FFF5E5/8B4513?text=Tshirt+4', category: 'womens', subcategory: 'tshirts', stock: 28 },

  // ── WOMENS → MATERNITY WEAR ──────────────────────────────────────
  { name: 'Maternity Kurti', description: 'Comfortable maternity kurti with side slits.', price: 1499, image: 'https://placehold.co/400x500/FFE5E5/8B4513?text=Maternity+1', category: 'womens', subcategory: 'maternity-wear', stock: 10 },
  { name: 'Nursing Dress', description: 'Easy-access nursing dress for new mothers.', price: 1799, image: 'https://placehold.co/400x500/FFF0E5/8B4513?text=Maternity+2', category: 'womens', subcategory: 'maternity-wear', stock: 8 },
  { name: 'Maternity Leggings', description: 'Stretchy maternity leggings with belly support.', price: 999, image: 'https://placehold.co/400x500/FFE0E0/8B4513?text=Maternity+3', category: 'womens', subcategory: 'maternity-wear', stock: 15 },
  { name: 'Bump-Friendly Top', description: 'Soft bump-friendly top for all trimesters.', price: 1299, image: 'https://placehold.co/400x500/FFF5E5/8B4513?text=Maternity+4', category: 'womens', subcategory: 'maternity-wear', stock: 12 },

  // ── WOMENS → NIGHT WEAR ──────────────────────────────────────────
  { name: 'Cotton Night Suit', description: 'Soft cotton night suit for comfortable sleep.', price: 999, image: 'https://placehold.co/400x500/FFE5E5/8B4513?text=Night+1', category: 'womens', subcategory: 'night-wear', stock: 20 },
  { name: 'Satin Nighty', description: 'Luxurious satin nighty for a premium feel.', price: 1199, image: 'https://placehold.co/400x500/FFF0E5/8B4513?text=Night+2', category: 'womens', subcategory: 'night-wear', stock: 15 },
  { name: 'Printed Pyjama Set', description: 'Fun printed pyjama set for cozy nights.', price: 899, image: 'https://placehold.co/400x500/FFE0E0/8B4513?text=Night+3', category: 'womens', subcategory: 'night-wear', stock: 18 },
  { name: 'Lounge Wear Set', description: 'Comfortable lounge wear set for home wear.', price: 1399, image: 'https://placehold.co/400x500/FFF5E5/8B4513?text=Night+4', category: 'womens', subcategory: 'night-wear', stock: 14 },

  // ── WOMENS → ESSENTIALS ──────────────────────────────────────────
  { name: 'Cotton Innerwear Set', description: 'Soft cotton innerwear set for daily comfort.', price: 499, image: 'https://placehold.co/400x500/FFE5E5/8B4513?text=Essential+1', category: 'womens', subcategory: 'essentials', stock: 40 },
  { name: 'Slip Dress', description: 'Lightweight slip dress for layering or standalone wear.', price: 799, image: 'https://placehold.co/400x500/FFF0E5/8B4513?text=Essential+2', category: 'womens', subcategory: 'essentials', stock: 22 },
  { name: 'Camisole Pack', description: 'Pack of 2 camisoles in neutral shades.', price: 599, image: 'https://placehold.co/400x500/FFE0E0/8B4513?text=Essential+3', category: 'womens', subcategory: 'essentials', stock: 30 },
  { name: 'Shorts Set', description: 'Comfortable cotton shorts for home wear.', price: 699, image: 'https://placehold.co/400x500/FFF5E5/8B4513?text=Essential+4', category: 'womens', subcategory: 'essentials', stock: 25 },

  // ── MENS → TSHIRTS ───────────────────────────────────────────────
  { name: 'Classic Polo Tee', description: 'Classic polo tee in premium cotton pique.', price: 799, image: 'https://placehold.co/400x500/E5F0FF/1A3A6B?text=Polo+1', category: 'mens', subcategory: 'tshirts', stock: 30 },
  { name: 'Round Neck Tee', description: 'Essential round neck tee for everyday wear.', price: 599, image: 'https://placehold.co/400x500/E5F5FF/1A3A6B?text=Tee+2', category: 'mens', subcategory: 'tshirts', stock: 35 },
  { name: 'Printed Tee', description: 'Bold printed tee with graphic design.', price: 699, image: 'https://placehold.co/400x500/E5EEFF/1A3A6B?text=Tee+3', category: 'mens', subcategory: 'tshirts', stock: 28 },
  { name: 'Henley Tee', description: 'Stylish henley tee with button placket.', price: 899, image: 'https://placehold.co/400x500/EEF5FF/1A3A6B?text=Tee+4', category: 'mens', subcategory: 'tshirts', stock: 20 },

  // ── MENS → WHITE SHIRTS ──────────────────────────────────────────
  { name: 'Classic White Shirt', description: 'Timeless classic white shirt for formal occasions.', price: 1299, image: 'https://placehold.co/400x500/F0F5FF/1A3A6B?text=Shirt+1', category: 'mens', subcategory: 'white-shirts', stock: 25 },
  { name: 'Slim Fit White Shirt', description: 'Modern slim fit white shirt for a sharp look.', price: 1499, image: 'https://placehold.co/400x500/E8F0FF/1A3A6B?text=Shirt+2', category: 'mens', subcategory: 'white-shirts', stock: 20 },
  { name: 'Linen White Shirt', description: 'Breathable linen white shirt for summer.', price: 1699, image: 'https://placehold.co/400x500/EAF2FF/1A3A6B?text=Shirt+3', category: 'mens', subcategory: 'white-shirts', stock: 18 },
  { name: 'Oxford White Shirt', description: 'Premium Oxford weave white shirt.', price: 1899, image: 'https://placehold.co/400x500/ECF4FF/1A3A6B?text=Shirt+4', category: 'mens', subcategory: 'white-shirts', stock: 15 },

  // ── MENS → DHOTI COMBO ───────────────────────────────────────────
  { name: 'White Shirt & Dhoti Set', description: 'Traditional white shirt and dhoti combo for festivals.', price: 2499, image: 'https://placehold.co/400x500/E5F0FF/1A3A6B?text=Dhoti+1', category: 'mens', subcategory: 'dhoti-combo', stock: 12 },
  { name: 'Silk Dhoti Combo', description: 'Premium silk dhoti and shirt combo for weddings.', price: 3499, image: 'https://placehold.co/400x500/E5F5FF/1A3A6B?text=Dhoti+2', category: 'mens', subcategory: 'dhoti-combo', stock: 8 },
  { name: 'Cotton Dhoti Set', description: 'Comfortable cotton dhoti set for daily wear.', price: 1999, image: 'https://placehold.co/400x500/E5EEFF/1A3A6B?text=Dhoti+3', category: 'mens', subcategory: 'dhoti-combo', stock: 15 },
  { name: 'Festival Dhoti Combo', description: 'Festive dhoti combo with embroidered shirt.', price: 2999, image: 'https://placehold.co/400x500/EEF5FF/1A3A6B?text=Dhoti+4', category: 'mens', subcategory: 'dhoti-combo', stock: 10 },

  // ── MENS → ESSENTIALS ────────────────────────────────────────────
  { name: 'Cotton Vest Pack', description: 'Pack of 3 cotton vests for daily comfort.', price: 499, image: 'https://placehold.co/400x500/E5F0FF/1A3A6B?text=Vest+1', category: 'mens', subcategory: 'essentials', stock: 40 },
  { name: 'Boxer Shorts', description: 'Comfortable boxer shorts in soft cotton.', price: 599, image: 'https://placehold.co/400x500/E5F5FF/1A3A6B?text=Boxer+2', category: 'mens', subcategory: 'essentials', stock: 35 },
  { name: 'Handkerchief Set', description: 'Pack of 6 cotton handkerchiefs.', price: 299, image: 'https://placehold.co/400x500/E5EEFF/1A3A6B?text=HK+3', category: 'mens', subcategory: 'essentials', stock: 50 },
  { name: 'Socks Pack', description: 'Pack of 5 pairs of cotton socks.', price: 399, image: 'https://placehold.co/400x500/EEF5FF/1A3A6B?text=Socks+4', category: 'mens', subcategory: 'essentials', stock: 45 },

  // ── SAREES → SEMI KANCHI ─────────────────────────────────────────
  { name: 'Semi Kanchi Silk Saree', description: 'Elegant semi Kanjivaram silk saree with traditional border.', price: 8999, image: 'https://placehold.co/400x500/FFF0E5/8B4513?text=Kanchi+1', category: 'sarees', subcategory: 'semi-kanchi', stock: 10 },
  { name: 'Kanchi Border Saree', description: 'Beautiful Kanchi border saree with contrast pallu.', price: 7499, image: 'https://placehold.co/400x500/FFE5E5/8B4513?text=Kanchi+2', category: 'sarees', subcategory: 'semi-kanchi', stock: 12 },
  { name: 'Zari Semi Kanchi', description: 'Rich zari work semi Kanchi saree for weddings.', price: 9999, image: 'https://placehold.co/400x500/FFF5E5/8B4513?text=Kanchi+3', category: 'sarees', subcategory: 'semi-kanchi', stock: 8 },
  { name: 'Temple Border Kanchi', description: 'Traditional temple border Kanchi saree.', price: 11999, image: 'https://placehold.co/400x500/FFE8E5/8B4513?text=Kanchi+4', category: 'sarees', subcategory: 'semi-kanchi', stock: 6 },

  // ── SAREES → ART SILK ────────────────────────────────────────────
  { name: 'Art Silk Saree', description: 'Lustrous art silk saree with woven border.', price: 3999, image: 'https://placehold.co/400x500/FFF0E5/8B4513?text=ArtSilk+1', category: 'sarees', subcategory: 'art-silk', stock: 18 },
  { name: 'Printed Art Silk', description: 'Vibrant printed art silk saree for festive wear.', price: 4499, image: 'https://placehold.co/400x500/FFE5E5/8B4513?text=ArtSilk+2', category: 'sarees', subcategory: 'art-silk', stock: 15 },
  { name: 'Embroidered Art Silk', description: 'Art silk saree with delicate embroidery work.', price: 5499, image: 'https://placehold.co/400x500/FFF5E5/8B4513?text=ArtSilk+3', category: 'sarees', subcategory: 'art-silk', stock: 12 },
  { name: 'Designer Art Silk', description: 'Contemporary designer art silk saree.', price: 6499, image: 'https://placehold.co/400x500/FFE8E5/8B4513?text=ArtSilk+4', category: 'sarees', subcategory: 'art-silk', stock: 10 },

  // ── SAREES → COTTON SAREES ───────────────────────────────────────
  { name: 'Pure Cotton Saree', description: 'Soft pure cotton saree for daily wear.', price: 2499, image: 'https://placehold.co/400x500/FFF0E5/8B4513?text=Cotton+1', category: 'sarees', subcategory: 'cotton-sarees', stock: 22 },
  { name: 'Handloom Cotton Saree', description: 'Authentic handloom cotton saree with natural dyes.', price: 3299, image: 'https://placehold.co/400x500/FFE5E5/8B4513?text=Cotton+2', category: 'sarees', subcategory: 'cotton-sarees', stock: 16 },
  { name: 'Printed Cotton Saree', description: 'Colorful printed cotton saree for casual wear.', price: 1999, image: 'https://placehold.co/400x500/FFF5E5/8B4513?text=Cotton+3', category: 'sarees', subcategory: 'cotton-sarees', stock: 25 },
  { name: 'Narayanpet Cotton Saree', description: 'Authentic Narayanpet cotton saree with contrast border.', price: 3499, image: 'https://placehold.co/400x500/FFE8E5/8B4513?text=Cotton+4', category: 'sarees', subcategory: 'cotton-sarees', stock: 20 },
];

const seedProducts = async () => {
  try {
    const DB_URI = `mongodb+srv://vikassilksrjpm_db_user:${process.env.DB_PASSWORD}@cluster0.npfu9oo.mongodb.net/vikassilks?retryWrites=true&w=majority`;

    await mongoose.connect(DB_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} products seeded successfully`);

    const summary = {};
    createdProducts.forEach(p => {
      const key = `${p.category}/${p.subcategory}`;
      summary[key] = (summary[key] || 0) + 1;
    });
    console.log('\nProducts by category/subcategory:');
    Object.entries(summary).forEach(([key, count]) => console.log(`  ${key}: ${count}`));

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
