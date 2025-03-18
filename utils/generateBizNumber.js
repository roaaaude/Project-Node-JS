const Card = require('../models/card.model');

/**
 * Generate a unique business card number
 * @returns {Promise<number>} Unique business card number
 */
const generateBizNumber = async () => {
  while (true) {
    const randomNumber = Math.floor(Math.random() * 1_000_000) + 1_000_000;
    const card = await Card.findOne({ bizNumber: randomNumber });
    
    if (!card) {
      return randomNumber;
    }
  }
};

module.exports = generateBizNumber; 