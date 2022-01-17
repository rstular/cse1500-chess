const logger = require("../../logger");
const { Messages } = require("../../communication/protodef");
const PaymentDatabase = require("../../payments/paymentDatabase");

function redeemPurchaseHandler(socket, data) {
    if (
        !data.orderId ||
        typeof data.orderId !== "string" ||
        data.orderId.length === 0
    ) {
        logger.error("Invalid orderId");
        return;
    }

    if (PaymentDatabase.redeemableOrders.has(data.orderId)) {
        logger.debug(`Redeeming order ID "${data.orderId}"`);
        PaymentDatabase.redeemableOrders.delete(data.orderId);
        PaymentDatabase.redeemedOrders.add(data.orderId);
    } else {
        logger.error(`Order ID "${data.orderId}" not redeemable`);
        return;
    }

    let order = PaymentDatabase.getOrder(data.orderId);
    if (!order) {
        logger.error(`Order ID "${data.orderId}" not found`);
        return;
    }

    socket.inventory = Object.keys(order).reduce((acc, item) => {
        acc[item] = acc[item] + (order[item] ?? 0);
        return acc;
    }, socket.inventory);
    socket.sendMessage(Messages.SET_INVENTORY, { inventory: socket.inventory });
}

module.exports = redeemPurchaseHandler;
