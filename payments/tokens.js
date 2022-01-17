const logger = require("../logger");
const https = require("https");
const { EndpointHost } = require("./storeconf");

const TOKEN_DATA = {
    accessToken: null,
};

const CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

function getAccessToken() {
    logger.verbose("Getting PayPal access token");

    if (
        typeof CLIENT_SECRET !== "string" ||
        CLIENT_SECRET.length === 0 ||
        typeof CLIENT_ID !== "string" ||
        CLIENT_ID.length === 0
    ) {
        logger.error("Missing PayPal client secret or client ID");
        process.exit(-1);
    }

    const data = new TextEncoder().encode("grant_type=client_credentials");
    const options = {
        hostname: EndpointHost,
        path: "/v1/oauth2/token",
        method: "POST",
        auth: `${CLIENT_ID}:${CLIENT_SECRET}`,
        headers: {
            Accept: "application/json",
            "Accept-Language": "en_US",
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };

    const req = https.request(options, (res) => {
        res.on("data", (d) => {
            TOKEN_DATA.accessToken = JSON.parse(new TextDecoder().decode(d));
            logger.debug("Obtained PayPal access token");
            setTimeout(
                getAccessToken,
                (TOKEN_DATA.accessToken.expires_in - 10) * 1000
            );
        });
    });

    req.on("error", (e) => {
        logger.error("Error obtaining PayPal access token: " + e);
        process.exit(-1);
    });

    req.write(data);
    req.end();
}

module.exports = { TOKEN_DATA, getAccessToken };
