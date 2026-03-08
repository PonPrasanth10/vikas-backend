// Test Cart API Endpoints
// Run this after seeding products and creating a user

const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

// Replace with your actual token after login
const TOKEN = 'your_jwt_token_here';

// Replace with actual product ID from seed script
const PRODUCT_ID = 'product_id_here';

const config = {
  headers: { Authorization: `Bearer ${TOKEN}` }
};

async function testCartAPI() {
  try {
    console.log('1. Testing Add to Cart...');
    const addResponse = await axios.post(
      `${API_URL}/cart`,
      { productId: PRODUCT_ID, quantity: 2 },
      config
    );
    console.log('✓ Add to Cart:', addResponse.data);

    console.log('\n2. Testing Get Cart...');
    const getResponse = await axios.get(`${API_URL}/cart`, config);
    console.log('✓ Get Cart:', getResponse.data);

    console.log('\n3. Testing Update Cart Item...');
    const updateResponse = await axios.put(
      `${API_URL}/cart`,
      { productId: PRODUCT_ID, quantity: 3 },
      config
    );
    console.log('✓ Update Cart:', updateResponse.data);

    console.log('\n4. Testing Remove Cart Item...');
    const removeResponse = await axios.delete(
      `${API_URL}/cart/${PRODUCT_ID}`,
      config
    );
    console.log('✓ Remove Item:', removeResponse.data);

    console.log('\n5. Testing Clear Cart...');
    const clearResponse = await axios.delete(`${API_URL}/cart`, config);
    console.log('✓ Clear Cart:', clearResponse.data);

    console.log('\n✅ All tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Uncomment to run tests
// testCartAPI();

console.log('Update TOKEN and PRODUCT_ID variables, then uncomment testCartAPI() to run tests');
