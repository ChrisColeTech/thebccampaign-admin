const handleOptions = (event) => {
    return {
        statusCode: 200,
        headers: {
            "access-control-allow-methods": "POST,OPTIONS",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            "Access-Control-Max-Age": "2592000",
            "Access-Control-Allow-Credentials": "true",
        },
    };
};

module.exports = { handleOptions };
