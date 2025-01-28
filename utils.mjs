export function generateRandomFileName(extension = '') {
    const timestamp = Date.now(); // Current timestamp
    const randomString = Math.random().toString(36).substring(2, 10); // Random 8-character string
    return `${timestamp}-${randomString}${extension ? `.${extension}` : ''}`;
  }