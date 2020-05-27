const shuffle  = require('lodash/shuffle');

const chars = {
   basic: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
   complex: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ',
};
const nums = {
   basic: '12345678901234567890123456789012345678901234567890',
   complex: '1234567890123456789012345678901234567890!@$&._!@$&._',
};

// default length is 8 characters, 4 alphabetical and 4 numerical
module.exports = (input = 8, type = 'basic') => {
   let length = Math.floor(input / 2);

   if (length > 40) {
      console.warn('Short id\'s should have fewer than 80 characters. The id has been shortened for you.');
      length = 40;
   }

   if (input % 2 !== 0) {
      console.warn('Odd-digit length ids are not supported, and will be rounded down.');
   }

   const set1 = shuffle(chars[type].split('')).slice(0, length);
   const set2 = shuffle(nums[type].split('')).slice(0, length);
   return shuffle([...set1, ...set2]).join('');
};
