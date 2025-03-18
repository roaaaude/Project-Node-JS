const User = require('../models/user.model');
const Card = require('../models/card.model');
const generateBizNumber = require('./generateBizNumber');

/**
 * Seed initial data to the database
 */
const seedData = async () => {
  try {
    // Check if users already exist
    const userCount = await User.countDocuments();
    
    if (userCount === 0) {
      console.log('Seeding initial users...');
      
      // Create regular user
      const regularUser = await User.create({
        name: {
          first: 'Regular',
          middle: '',
          last: 'User',
        },
        phone: '0501234567',
        email: 'regular@example.com',
        password: 'Regular@123',
        image: {
          url: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
          alt: 'Regular user profile image',
        },
        address: {
          state: '',
          country: 'Israel',
          city: 'Tel Aviv',
          street: 'Rothschild',
          houseNumber: 10,
          zip: 1234567,
        },
        isBusiness: false,
        isAdmin: false,
      });

      // Create business user
      const businessUser = await User.create({
        name: {
          first: 'Business',
          middle: '',
          last: 'User',
        },
        phone: '0501234568',
        email: 'business@example.com',
        password: 'Business@123',
        image: {
          url: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
          alt: 'Business user profile image',
        },
        address: {
          state: '',
          country: 'Israel',
          city: 'Jerusalem',
          street: 'Jaffa',
          houseNumber: 20,
          zip: 7654321,
        },
        isBusiness: true,
        isAdmin: false,
      });

      // Create admin user
      const adminUser = await User.create({
        name: {
          first: 'Admin',
          middle: '',
          last: 'User',
        },
        phone: '0501234569',
        email: 'admin@example.com',
        password: 'Admin@123',
        image: {
          url: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
          alt: 'Admin user profile image',
        },
        address: {
          state: '',
          country: 'Israel',
          city: 'Haifa',
          street: 'HaNassi',
          houseNumber: 30,
          zip: 3456789,
        },
        isBusiness: true,
        isAdmin: true,
      });

      console.log('Initial users created successfully');

      // Check if cards already exist
      const cardCount = await Card.countDocuments();
      
      if (cardCount === 0) {
        console.log('Seeding initial cards...');
        
        // Create sample cards for business user
        for (let i = 1; i <= 3; i++) {
          const bizNumber = await generateBizNumber();
          
          await Card.create({
            title: `Card ${i}`,
            subtitle: `Subtitle for Card ${i}`,
            description: `This is a description for Card ${i}. It contains information about the business.`,
            phone: `05012345${i}0`,
            email: `card${i}@example.com`,
            web: `https://card${i}.example.com`,
            image: {
              url: 'https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg',
              alt: `Business card ${i} image`,
            },
            address: {
              state: '',
              country: 'Israel',
              city: 'Tel Aviv',
              street: `Street ${i}`,
              houseNumber: i * 10,
              zip: 1000000 + i,
            },
            bizNumber,
            user_id: businessUser._id,
          });
        }
        
        console.log('Initial cards created successfully');
      }
    }
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
  }
};

module.exports = seedData; 