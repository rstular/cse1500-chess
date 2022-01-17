const https = require("https");
const logger = require("../logger");
const { Currency, EndpointHost } = require("./storeconf");
const { TOKEN_DATA } = require("./tokens");
const { generateRandomString } = require("../utils");
const PaymentDatabase = require("./paymentDatabase");

function constructOrderPayload(products) {
    // Calculate the total price of the order.
    const total = products.reduce((acc, product) => {
        return acc + product.price;
    }, 0);

    const orderId = generateRandomString(64);

    const PAYLOAD = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: Currency,
                    value: total.toFixed(2),
                },
                description: "An order for super useful items in a ches game",
                soft_descriptor: "P2WCHESS",
                reference_id: orderId,
            },
        ],
        application_context: {
            shipping_preference: "NO_SHIPPING",
            user_action: "PAY_NOW",
            brand_name: "Best Chess Ever",
        },
    };
    // Add order to database
    PaymentDatabase.addOrder(
        orderId,
        products.reduce((acc, product) => {
            if (!acc[product.id]) {
                acc[product.id] = 0;
            }
            acc[product.id] += 1;
            return acc;
        }, {})
    );
    return PAYLOAD;
}

function createOrder(payload, responseObject) {
    logger.verbose("Creating PayPal order");
    const data = new TextEncoder().encode(JSON.stringify(payload));
    const options = {
        hostname: EndpointHost,
        path: "/v2/checkout/orders",
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
            responseObject.status(res.statusCode);
            responseObject.setHeader("Content-Type", "application/json");
            responseObject.end(JSON.stringify(data));
            logger.debug(`Created PayPal order ID ${data.id}`);
        });
    });
    req.write(data);
    req.end();
}

module.exports = {
    constructOrderPayload,
    createOrder,
};
