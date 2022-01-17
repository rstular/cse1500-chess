const express = require("express");
const router = express.Router();
const logger = require("../logger");
const {
    constructOrderPayload,
    createOrder,
} = require("../payments/createOrder");
const { captureOrder } = require("../payments/capturePayment");
const { Items } = require("../communication/protodef");

router.post("/create-order/", (req, res, _next) => {
    if (typeof req.body.item !== "string") {
        res.status(400).end(JSON.stringify({ error: "Item is not a string" }));
        return;
    }

    if (!(req.body.item in Items)) {
        res.status(400).end(JSON.stringify({ error: "Item does not exist" }));
        return;
    }

    const item = Items[req.body.item];

    const orderData = constructOrderPayload([item]);

    createOrder(orderData, res);
});

router.post("/capture-order/:orderId/", (req, res, _next) => {
    if (
        typeof req.params.orderId !== "string" ||
        req.params.orderId.length === 0
    ) {
        res.status(400).end(
            JSON.stringify({ error: "Order ID is not a string" })
        );
        return;
    }

    logger.debug(`Capturing PayPal order ${req.params.orderId}`);

    const orderId = req.params.orderId;
    captureOrder(orderId, res);
});

module.exports = router;
