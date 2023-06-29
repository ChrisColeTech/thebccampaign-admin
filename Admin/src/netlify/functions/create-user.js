const { client, query, handleOptions } = require('./faunaClient');


const createUser = async (event) => {
    if (event.httpMethod === "OPTIONS") {
        return handleOptions(event);
    }

    const data = JSON.parse(event.body);
    console.log('Function `createUser` invoked', data);
    // Logic to create a user in the database

    try {
        const response = await client.query(query.Create(query.Collection('users'), item));
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

module.exports = { createUser };
