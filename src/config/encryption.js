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



export const envConfig = {
  CLIENT_ID: process.env.REACT_NATIVE_CLIENT_ID || "DGgdjkgwdkgqkwdgkjqwgd2535821ti26383821tejg2jet8",
  ENABLE_FEATURE_X: process.env.REACT_APP_ENABLE_FEATURE_X === "true",
  AUTH_SERVICE_URL: process.env.REACT_APP_AUTH_SERVICE_URL || "http://localhost:4000/auth",
  DIGILOCKER_AUTH_URL: process.env.REACT_APP_DIGILOCKER_AUTH_URL || "https://digilocker.gov.in/auth",
  APP_ENV: process.env.REACT_APP_ENV || "development",
  APP_VERSION: process.env.REACT_APP_VERSION || "1.0.0",
  LOG_LEVEL: process.env.REACT_APP_LOG_LEVEL || "info",
  DEVICE_ID : process.env.REACT_DEVICE_ID || 'Windows1O0G1GYY2RFJE',
  CLIENT_ID : process.env.REACT_CLIENT_ID || '25UT2GT2I8T28T2JG2282GG8G2GU2U2IB1VC11O0G1GYY2RFJE'
};


