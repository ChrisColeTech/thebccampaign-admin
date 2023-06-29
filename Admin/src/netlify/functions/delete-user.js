const { client, query, handleOptions } = require('./faunaClient');

const handler = async (event) => {
    if (event.httpMethod === "OPTIONS") {
        return handleOptions(event);
    }
    const data = JSON.parse(event.body);
    const { ref } = data;
    console.log(`Function 'delete' invoked. delete ref: ${ref}`)
    try {
        const response = await client.query(query.Delete(query.Ref(query.Collection('users'), id)));
        console.log('Success', response);
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            },
            body: JSON.stringify(response),
        };
    } catch (error) {
        console.log('Error', error);
        return {
            statusCode: 400,
            body: JSON.stringify(error),
        };
    }
};

module.exports = { handler };
