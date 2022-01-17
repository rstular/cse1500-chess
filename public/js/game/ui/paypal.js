import { ItemsEnum } from "/js/game/communication/protodef.js";
import { showModalWithContent } from "/js/game/ui/modal.js";
import { redeemItems } from "/js/game/ui/inventory.js";
import { sounds } from "/js/game/audio.js";

const BUTTON_STYLE = {
    layout: "vertical",
    color: "blue",
    shape: "rect",
    label: "paypal",
    tagline: false,
    height: 30,
};

function initializePayPalButton(productName, elementId) {
    paypal
        .Buttons({
            style: BUTTON_STYLE,
            // Set up the transaction
            createOrder: function (_data, _actions) {
                return fetch("/payments/create-order/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        item: productName,
                    }),
                })
                    .then((res) => {
                        return res.json();
                    })
                    .then((orderData) => {
                        console.log(orderData);
                        return orderData.id;
                    });
            },

            // Finalize the transaction
            onApprove: function (data, actions) {
                return fetch(`/payments/capture-order/${data.orderID}/`, {
                    method: "POST",
                })
                    .then((res) => {
                        return res.json();
                    })
                    .then((orderData) => {
                        console.log(orderData);
                        // Three cases to handle:
                        //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                        //   (2) Other non-recoverable errors -> Show a failure message
                        //   (3) Successful transaction -> Show confirmation or thank you

                        // This example reads a v2/checkout/orders capture response, propagated from the server
                        // You could use a different API or structure for your 'orderData'
                        let errorDetail =
                            Array.isArray(orderData.details) &&
                            orderData.details[0];

                        if (
                            errorDetail &&
                            errorDetail.issue === "INSTRUMENT_DECLINED"
                        ) {
                            return actions.restart(); // Recoverable state, per:
                            // https://developer.paypal.com/docs/checkout/integration-features/funding-failure/
                        }

                        if (errorDetail) {
                            let msg =
                                "Sorry, your transaction could not be processed.";
                            if (errorDetail.description)
                                msg += "\n\n" + errorDetail.description;
                            if (orderData.debug_id)
                                msg += " (" + orderData.debug_id + ")";
                            return showModalWithContent("Payment error", msg); // Show a failure message
                        }

                        // Successful capture!
                        console.log(
                            "Capture result",
                            orderData,
                            JSON.stringify(orderData, null, 2)
                        );
                        sounds.money.play();
                        showModalWithContent(
                            "Payment successful",
                            "Transaction successful!\n\nYour items will be delivered to you shortly."
                        );

                        if (orderData.orderIDs) {
                            orderData.orderIDs.forEach((orderID) => {
                                redeemItems(orderID);
                            });
                        }
                    });
            },
        })
        .render(elementId);
}

export function initializePayPal() {
    initializePayPalButton(ItemsEnum.Assassination, "#pp-btn-assassination");
    initializePayPalButton(ItemsEnum.Drunk, "#pp-btn-drunk");
}
