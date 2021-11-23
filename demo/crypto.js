const crypto = require('crypto');

const secretKey = '12345678';
const inputEncoding = 'utf8';
const outputEncoding = 'hex';

const encrypt = (str) => {
  try {
    const cipher = crypto.createCipheriv('des-ecb', secretKey, '');
    let encrypted = cipher.update(str, inputEncoding, outputEncoding);
    encrypted += cipher.final(outputEncoding);
    return encrypted;
  } catch (err) {
    console.error('加密失败:', err);
    return str;
  }
}

const encryptedData = encrypt('hello world!');
console.log('encrypted data:', encryptedData);

const decrypt = (encrypted) => {
  try {
    const decipher = crypto.createDecipheriv('des-ecb', secretKey, '');
    let decrypted = decipher.update(encrypted, outputEncoding, inputEncoding);
    decrypted += decipher.final(inputEncoding);
    return decrypted;
  } catch (err) {
    console.error('解密失败:', err);
    return encrypted;
  }
}

const decryptedData = decrypt(encryptedData);
console.log('decrypted data:', decryptedData);

const md5 = (str) => {
  return crypto.createHash('md5').update(str, 'utf8').digest('hex');
};

const md5Data = md5('hello world!');
console.log('md5 data:', md5Data);