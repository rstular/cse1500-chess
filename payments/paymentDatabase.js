const logger = require("../logger");

const PaymentDatabase = {
    idItemMap: {},
    redeemableOrders: new Set(),
    redeemedOrders: new Set(),
    moneySpent: 0,
    addMoneySpent: function (amount) {
        this.moneySpent += amount;
    },
    addOrder: function (orderId, items) {
        logger.debug(`Adding order ID "${orderId}" to database`);
        this.idItemMap[orderId] = items;
    },
    getOrder: function (orderId) {
        logger.debug(`Getting order ID "${orderId}" from database`);
        return this.idItemMap[orderId];
    },
};

module.exports = PaymentDatabase;
