
const { client, query } = require('./faunaClient');

const handler = async (event) => {
    const data = JSON.parse(event.body);
    const { ref } = data;
    console.log(`Function 'read' invoked. Read ref: ${ref}`);
    try {
        const response = await client.query(query.Get(query.Ref(query.Collection('users'), ref)))
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
