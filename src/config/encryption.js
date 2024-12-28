import { createTransform } from 'redux-persist';
import CryptoJS from 'crypto-js';

// Define your encryption key (keep it secret!)
const SECRET_KEY = 'my-very-secure-key';

// Encrypt function
const encrypt = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Decrypt function
const decrypt = (data) => {
  const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

// Create a transform
export const encryptTransform = createTransform(
  // Transform the state on its way to being serialized and persisted (encrypt)
  (inboundState) => encrypt(inboundState),

  // Transform the state being rehydrated (decrypt)
  (outboundState) => decrypt(outboundState),

  // Specify which reducers to apply this to (optional)
  { whitelist: ['auth'] }
);
