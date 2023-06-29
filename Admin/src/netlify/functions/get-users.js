const { Client, query } = require('faunadb');
const { handleOptions } = require('./handleOptions');
/* Configure faunaDB Client with our secret */
const client = new Client({ secret: 'fnAFG-Ky5LAATX9wNckFUbX0ngbxY2jv_PlqSUVN' });

const getUsers = async (event) => {
    if (event.httpMethod === "OPTIONS") {
        return handleOptions(event);
    }

    console.log('Function `getUsers` invoked');
    // Logic to retrieve users from the database

    try {
        const response = await client.query(query.Paginate(query.Match(query.Index('all_users'))));
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

module.exports = { getUsers };
