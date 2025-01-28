export function generateRandomFileName(extension = '') {
  const timestamp = Date.now(); // Current timestamp
  const randomString = Math.random().toString(36).substring(2, 10); // Random 8-character string
  return `${timestamp}-${randomString}${extension ? `.${extension}` : ''}`;
};

export const API_BASE_URL = 'https://api.stability.ai/v2beta/stable-image';
export const API_KEY = 'sk-Q5da9o1re6LzNSkq5nPzZctqv97UbLtfXGmnuUKTi8GZnlcf';