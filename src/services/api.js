// Dummy product data for FreshVeg Direct
const VEGETABLES = [
  { id: 1, name: 'Potato', price: 30, stock: 150, image: '/images/potato.jpg', description: 'Fresh, starchy potatoes perfect for boiling, roasting, and mashing.', category: 'Root Vegetables' },
  { id: 2, name: 'Tomato', price: 25, stock: 200, image: '/images/tomato.jpg', description: 'Juicy tomatoes ideal for salads, sauces, and curries.', category: 'Vegetables' },
  { id: 3, name: 'Onion', price: 40, stock: 250, image: '/images/onion.jpg', description: 'Aromatic onions that add flavor to every dish.', category: 'Root Vegetables' },
  { id: 4, name: 'Carrot', price: 50, stock: 180, image: '/images/carrot.jpg', description: 'Crunchy carrots rich in beta-carotene and sweetness.', category: 'Root Vegetables' },
  { id: 5, name: 'Cabbage', price: 35, stock: 120, image: '/images/cabbage.jpg', description: 'Crisp cabbage leaves perfect for salads and slaws.', category: 'Leafy Vegetables' },
  { id: 6, name: 'Cauliflower', price: 45, stock: 100, image: '/images/cauliflower.jpg', description: 'Tender cauliflower florets great for roasting and soups.', category: 'Cruciferous' },
  { id: 7, name: 'Brinjal', price: 40, stock: 90, image: '/images/brinjal.jpg', description: 'Soft eggplant ideal for curries, grills, and dips.', category: 'Vegetables' },
  { id: 8, name: 'Okra', price: 60, stock: 110, image: '/images/okra.jpg', description: 'Fresh okra pods that are perfect for stews and stir-fries.', category: 'Vegetables' },
  { id: 9, name: 'Green Chilli', price: 80, stock: 70, image: '/images/green-chilli.jpg', description: 'Spicy green chilies for bold heat in your dishes.', category: 'Spices' },
  { id: 10, name: 'Capsicum', price: 70, stock: 130, image: '/images/capsicum.jpg', description: 'Sweet bell peppers in rich colors for salads and sautés.', category: 'Vegetables' },
  { id: 11, name: 'Beetroot', price: 55, stock: 100, image: '/images/beetroot.jpg', description: 'Earthy beetroots full of sweetness and nutrition.', category: 'Root Vegetables' },
  { id: 12, name: 'Radish', price: 30, stock: 140, image: '/images/radish.jpg', description: 'Crisp radishes with a fresh, peppery bite.', category: 'Root Vegetables' },
  { id: 13, name: 'Cucumber', price: 35, stock: 160, image: '/images/cucumber.jpg', description: 'Cool cucumbers ideal for salads and refreshing drinks.', category: 'Vegetables' },
  { id: 14, name: 'Pumpkin', price: 25, stock: 85, image: '/images/pumpkin.jpg', description: 'Sweet pumpkin perfect for soups, curries, and baking.', category: 'Vegetables' },
  { id: 15, name: 'Bottle Gourd', price: 30, stock: 95, image: '/images/bottle-gourd.jpg', description: 'Mild bottle gourd great for soups and curries.', category: 'Vegetables' },
  { id: 16, name: 'Bitter Gourd', price: 50, stock: 80, image: '/images/bitter-gourd.jpg', description: 'Healthy bitter gourd with a distinct, bitter flavor.', category: 'Vegetables' },
  { id: 17, name: 'Ridge Gourd', price: 40, stock: 100, image: '/images/ridge-gourd.jpg', description: 'Tender ridge gourd for stir-fries and curry dishes.', category: 'Vegetables' },
  { id: 18, name: 'Snake Gourd', price: 45, stock: 75, image: '/images/snake-gourd.jpg', description: 'Long snake gourd with mild flavor in cooked dishes.', category: 'Vegetables' },
  { id: 19, name: 'Drumstick', price: 90, stock: 60, image: '/images/drumstick.jpg', description: 'Nutritious drumstick pods for soups and stews.', category: 'Vegetables' },
  { id: 20, name: 'Green Peas', price: 100, stock: 70, image: '/images/green-peas.jpg', description: 'Sweet green peas rich in protein and fiber.', category: 'Legumes' },
  { id: 21, name: 'Beans', price: 60, stock: 85, image: '/images/beans.jpg', description: 'Fresh green beans perfect for stir-fries and salads.', category: 'Legumes' },
  { id: 22, name: 'Sweet Corn', price: 45, stock: 110, image: '/images/sweet-corn.jpg', description: 'Sweet corn kernels ideal for grilling and snacking.', category: 'Vegetables' },
  { id: 23, name: 'Raw Banana', price: 35, stock: 120, image: '/images/raw-banana.jpg', description: 'Starchy raw bananas for cooking and savory dishes.', category: 'Fruits' },
  { id: 24, name: 'Sweet Potato', price: 50, stock: 130, image: '/images/sweet-potato.jpg', description: 'Sweet potatoes rich in flavor and vitamins.', category: 'Root Vegetables' },
  { id: 25, name: 'Garlic', price: 120, stock: 50, image: '/images/garlic.jpg', description: 'Strong garlic cloves for seasoning and flavor.', category: 'Spices' },
  { id: 26, name: 'Ginger', price: 150, stock: 45, image: '/images/ginger.jpg', description: 'Fresh ginger root with spicy warmth and aroma.', category: 'Spices' },
  { id: 27, name: 'Spinach', price: 20, stock: 170, image: '/images/spinach.jpg', description: 'Leafy spinach packed with iron and vitamins.', category: 'Leafy Vegetables' },
  { id: 28, name: 'Coriander', price: 15, stock: 190, image: '/images/coriander.jpg', description: 'Fragrant coriander leaves perfect for garnishes.', category: 'Herbs' },
  { id: 29, name: 'Mint', price: 10, stock: 200, image: '/images/mint.jpg', description: 'Refreshing mint leaves for drinks and dishes.', category: 'Herbs' },
  { id: 30, name: 'Broccoli', price: 120, stock: 90, image: '/images/broccoli.jpg', description: 'Nutritious broccoli florets full of vitamins.', category: 'Cruciferous' },
];


// API Service
export const api = {
  // Get all products
  getAllProducts: () => {
    return Promise.resolve(VEGETABLES);
  },

  // Get single product
  getProductById: (id) => {
    return Promise.resolve(VEGETABLES.find(p => p.id === parseInt(id)));
  },

  // Search products
  searchProducts: (query) => {
    return Promise.resolve(
      VEGETABLES.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  },

  // Filter products by category
  filterByCategory: (category) => {
    return Promise.resolve(
      VEGETABLES.filter(p => p.category === category)
    );
  },

  // Get unique categories
  getCategories: () => {
    const categories = [...new Set(VEGETABLES.map(p => p.category))];
    return Promise.resolve(categories);
  },

  // Mock login
  login: (email, password) => {
    return Promise.resolve({
      success: true,
      user: {
        id: 1,
        email,
        name: email.split('@')[0],
        role: 'customer',
      },
      token: 'mock-token-' + Math.random(),
    });
  },

  // Mock register
  register: (name, email, password, role = 'customer') => {
    return Promise.resolve({
      success: true,
      user: {
        id: Math.random(),
        email,
        name,
        role,
      },
      token: 'mock-token-' + Math.random(),
    });
  },

  // Mock login with role support
  login: (email, password, role = 'customer') => {
    return Promise.resolve({
      success: true,
      user: {
        id: 1,
        email,
        name: email.split('@')[0],
        role,
      },
      token: 'mock-token-' + Math.random(),
    });
  },

  // Mock seller login
  sellerLogin: (email, password) => {
    return api.login(email, password, 'seller');
  },
};

export default api;
