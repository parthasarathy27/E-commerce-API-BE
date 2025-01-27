function calculateDiscount(priceOld, priceNew) {
    if (priceOld <= 0 || priceNew < 0 || priceNew > priceOld) {
        throw new Error('Invalid price values provided.');
    }
    const discountAmount = parseFloat((priceOld - priceNew).toFixed(2));
    const discountPercentage = parseFloat(((discountAmount / priceOld) * 100).toFixed(2));
    return { discountAmount, discountPercentage };
}

module.exports = calculateDiscount;
