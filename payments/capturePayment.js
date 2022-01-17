const https = require("https");
const logger = require("../logger");
const { TOKEN_DATA } = require("./tokens");
const { EndpointHost } = require("./storeconf");
const PaymentDatabase = require("./paymentDatabase");

function captureOrder(orderId, responseObject) {
    logger.verbose("Capturing PayPal order");
    const options = {
        hostname: EndpointHost,
        path: `/v2/checkout/orders/${orderId}/capture`,
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${TOKEN_DATA.accessToken.access_token}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
        },
    };

    const req = https.request(options, (res) => {
        res.on("data", (d) => {
            let data = JSON.parse(new TextDecoder().decode(d));
            logger.debug(`Captured PayPal order ID ${data.id}`);
            const toRespond = {
                id: data.id,
                status: data.status,
            };
            if (data.details) {
                toRespond.details = data.details;
            }
            if (data.debug_id) {
                toRespond.debug_id = data.debug_id;
            }
            if (data.purchase_units) {
                toRespond.orderIDs = data.purchase_units.map(
                    (unit) => unit.reference_id
                );
            }

            if (data.status === "COMPLETED") {
                let moneySpent = 0;
                for (const item of data.purchase_units) {
                    if (
                        item.payments.captures.every(
                            (capture) => capture.status === "COMPLETED"
                        ) &&
                        !PaymentDatabase.redeemedOrders.has(item.reference_id)
                    ) {
                        item.payments.captures.forEach((capture) => {
                            moneySpent += parseFloat(capture.amount.value);
                        });
                        PaymentDatabase.redeemableOrders.add(item.reference_id);
                    }
                }
                PaymentDatabase.addMoneySpent(moneySpent);
            }

            responseObject.status(res.statusCode);
            responseObject.setHeader("Content-Type", "application/json");
            responseObject.end(JSON.stringify(toRespond));
        });
    });
    req.end();
}

module.exports = {
    captureOrder,
};
