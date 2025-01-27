const { v4: uuidv4 } = require('uuid');

function generateUniqueUrl(productName) {
    if (!productName || typeof productName !== 'string') {
        throw new Error('Invalid product name provided.');
    }
    const normalized = productName
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/ /g, '-'); // Replace spaces with dashes
    const uniqueSuffix = uuidv4().split('-')[0];
    return `${normalized}-${uniqueSuffix}`;
}

module.exports = generateUniqueUrl;
