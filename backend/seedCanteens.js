const mongoose = require('mongoose');
const Canteen = require('./models/Canteen');
const Food = require('./models/Food');

mongoose.connect('mongodb://localhost:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seed() {
  await Canteen.deleteMany({});
  await Food.deleteMany({});

  const canteens = [
    {
      name: 'Cantina',
      description: 'Multi-cuisine canteen with snacks, pizza, pasta, rolls, beverages, and more.',
      image: '/images/canteens/Cantina.jpg',
    },
    {
      name: 'South Indian Canteen',
      description: 'Authentic South Indian breakfast, meals, and filter coffee.',
      image: '/images/canteens/South-Indian.jpg',
    },
    {
      name: 'North Indian Canteen',
      description: 'Popular North Indian snacks, rice, breads, and curries.',
      image: '/images/canteens/North-Indian.jpg',
    }
  ];

  const canteenDocs = await Canteen.insertMany(canteens);

  // Cantina (Menu Board 1) 
  const cantinaFoods = [
    { name: 'French Fries w. Paprika', description: 'Crispy fries tossed with paprika', price: 80, category: 'Starters', image: '/images/food/fries.png', canteen: canteenDocs[0]._id },
    { name: 'Chicken Wings', description: 'Crispy chicken wings', price: 90, category: 'Starters', image: '/images/food/chicken_wings.png', canteen: canteenDocs[0]._id },
    { name: 'Dragon Chicken', description: 'Spicy chicken preparation', price: 120, category: 'Starters', image: '/images/food/dragon_chicken.png', canteen: canteenDocs[0]._id },
    { name: 'Honey Chilli Potato', description: 'Potato tossed in honey chilli sauce', price: 80, category: 'Starters', image: '/images/food/honey_chilli_potato.png', canteen: canteenDocs[0]._id },
    { name: 'Masala Omelette', description: 'Masala style fluffy omelette', price: 70, category: 'Egg Factory', image: '/images/food/masala_omelette.png', canteen: canteenDocs[0]._id },
    { name: 'Chilli Cheese Toast', description: 'Grilled toast with cheese & chilli', price: 50, category: 'Sandwiches', image: '/images/food/chilli_cheese_toast.png', canteen: canteenDocs[0]._id },
    { name: 'Veg Biryani', description: 'Vegetable biryani rice', price: 80, category: 'Biryani', image: '/images/food/veg_biryani.png', canteen: canteenDocs[0]._id },
    { name: 'Farmhouse Pizza', description: 'Classic vegetarian pizza', price: 100, category: 'Pizza', image: '/images/food/farmhouse_pizza.png', canteen: canteenDocs[0]._id },
    { name: 'Peri Peri Chicken Pizza', description: 'Spicy peri-peri chicken pizza', price: 100, category: 'Pizza', image: '/images/food/peri_chicken_pizza.png', canteen: canteenDocs[0]._id },
    { name: 'Alfredo Pasta', description: 'Creamy Italian Alfredo pasta', price: 100, category: 'Pasta', image: '/images/food/alfredo_pasta.png', canteen: canteenDocs[0]._id },
    { name: 'Chicken Shawarma Roll', description: 'Wrap with chicken shawarma filling', price: 80, category: 'Rolls', image: '/images/food/chicken_shawarma_roll.png', canteen: canteenDocs[0]._id },
    { name: 'Chocolate Milkshake', description: 'Classic chocolate milkshake', price: 90, category: 'Milkshakes', image: '/images/food/chocolate_milkshake.png', canteen: canteenDocs[0]._id },
    { name: 'Burger Meal Combo', description: 'Burger, fries & mocktail combo', price: 190, category: 'Combo', image: '/images/food/burger_meal_combo.png', canteen: canteenDocs[0]._id },
  ];

  // South Indian Canteen (Menu Board 2) 
  const southIndianFoods = [
    { name: 'Idly (1 nos)', description: 'Steamed rice cake', price: 10, category: 'Breakfast', image: '/images/food/idly.png', canteen: canteenDocs[1]._id },
    { name: 'Vada', description: 'South Indian fried lentil snack', price: 15, category: 'Breakfast', image: '/images/food/vada.png', canteen: canteenDocs[1]._id },
    { name: 'Khara Bath', description: 'Spiced rava (semolina) breakfast', price: 40, category: 'Breakfast', image: '/images/food/khara_bath.png', canteen: canteenDocs[1]._id },
    { name: 'Kesari Bath', description: 'Sweet semolina pudding', price: 40, category: 'Breakfast', image: '/images/food/kesari_bath.png', canteen: canteenDocs[1]._id },
    { name: 'Plain Dosa', description: 'Crispy crepe', price: 40, category: 'Dosa', image: '/images/food/plain_dosa.png', canteen: canteenDocs[1]._id },
    { name: 'Masala Dosa', description: 'Dosa stuffed with potato masala', price: 50, category: 'Dosa', image: '/images/food/masala_dosa.png', canteen: canteenDocs[1]._id },
    { name: 'Onion Uttapam', description: 'Thick pancake with onion', price: 50, category: 'Breakfast', image: '/images/food/onion_uttapam.png', canteen: canteenDocs[1]._id },
    { name: 'Rice Bath', description: 'Rice cooked with spices', price: 50, category: 'Meals', image: '/images/food/rice_bath.png', canteen: canteenDocs[1]._id },
    { name: 'Bisibelebath', description: 'Mixed rice & lentil dish', price: 60, category: 'Meals', image: '/images/food/bisibelebath.png', canteen: canteenDocs[1]._id },
    { name: 'Curd Rice', description: 'Rice mixed with curd/yogurt', price: 50, category: 'Meals', image: '/images/food/curd_rice.png', canteen: canteenDocs[1]._id },
    { name: 'Butter Milk', description: 'Traditional buttermilk drink', price: 15, category: 'Beverages', image: '/images/food/buttermilk.png', canteen: canteenDocs[1]._id },
    { name: 'Filter Coffee', description: 'Fresh South Indian filter coffee', price: 20, category: 'Beverages', image: '/images/food/filter_coffee.png', canteen: canteenDocs[1]._id }
  ];

  // North Indian Canteen (Menu Board 3) 
  const northIndianFoods = [
    { name: 'Loaded Nachos', description: 'Crispy nachos loaded w/ toppings', price: 70, category: 'Snacks', image: '/images/food/loaded_nachos.png', canteen: canteenDocs[2]._id },
    { name: 'Rice Bath', description: 'Spiced rice', price: 60, category: 'Rice', image: '/images/food/rice_bath.png', canteen: canteenDocs[2]._id },
    { name: 'Dal Rice', description: 'Rice with dal', price: 70, category: 'Rice', image: '/images/food/dal_rice.png', canteen: canteenDocs[2]._id },
    { name: 'Curd Rice', description: 'Rice mixed with curd', price: 60, category: 'Rice', image: '/images/food/curd_rice.png', canteen: canteenDocs[2]._id },
    { name: 'Tandoori Roti & Curry', description: 'Tandoori roti, curry', price: 80, category: 'Bread & Curry', image: '/images/food/tandoori_roti_curry.png', canteen: canteenDocs[2]._id },
    { name: 'Butter Naan & Curry', description: 'Butter naan with curry', price: 80, category: 'Bread & Curry', image: '/images/food/butter_naan_curry.png', canteen: canteenDocs[2]._id },
    { name: 'Hyderabadi Biryani', description: 'Rich Hyderabadi biryani', price: 90, category: 'Biryani', image: '/images/food/hyderabadi_biryani.png', canteen: canteenDocs[2]._id },
    { name: 'Paneer Butter Masala', description: 'Paneer curry in butter/cream', price: 100, category: 'Veg Curries', image: '/images/food/paneer_butter_masala.png', canteen: canteenDocs[2]._id },
    { name: 'Gobi Manchurian', description: 'Cauliflower in Indo-Chinese sauce', price: 80, category: 'Snacks', image: '/images/food/gobi_manchurian.png', canteen: canteenDocs[2]._id },
    { name: 'Chili Mushroom', description: 'Mushroom in spicy chili sauce', price: 90, category: 'Snacks', image: '/images/food/chili_mushroom.png', canteen: canteenDocs[2]._id },
    { name: 'Samosa', description: 'Fried potato pastry', price: 20, category: 'Snacks', image: '/images/food/samosa.png', canteen: canteenDocs[2]._id }
  ];

  await Food.insertMany([...cantinaFoods, ...southIndianFoods, ...northIndianFoods]);

  console.log('Seeded items of canteen!');
  process.exit();
}

seed();
