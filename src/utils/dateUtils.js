function calculateExpiryDate(startDate, days = 7) {
    const start = new Date(startDate);
    if (isNaN(start.getTime())) {
        throw new Error('Invalid start date provided.');
    }
    return new Date(start.getTime() + days * 24 * 60 * 60 * 1000);
}

module.exports = calculateExpiryDate;
