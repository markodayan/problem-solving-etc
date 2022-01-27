const createKeccakHash = require('keccak');

let address = '001d3f1ef827552ae1114027bd3ecf1f086ba0f9';

const hexGreaterThan = (limit: string) => (val: string) => parseInt(val, 16) >= parseInt(limit, 16);
const hexGreaterThan8 = hexGreaterThan('8');
const toCapitalise = (hex: string) => hexGreaterThan8(hex);

const eip55Checksum = (address: string) => {
  let formatted = address.startsWith('0x') ? address.substring(2) : address;
  let keccakHash = createKeccakHash('keccak256').update(formatted).digest('hex');
  return (
    '0x' +
    formatted
      .split('')
      .map((v, i, arr) => (toCapitalise(keccakHash[i]) ? v.toUpperCase() : v))
      .join('')
  );
};

export { eip55Checksum };

// 0x001d3F1ef827552Ae1114027BD3ECF1f086bA0F9
