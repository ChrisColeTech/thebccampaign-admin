const { client, query, handleOptions } = require('./faunaClient');


const handler = async (event) => {
    if (event.httpMethod === "OPTIONS") {
        return handleOptions(event);
    }

    const data = JSON.parse(event.body);
    const { approved, username, email, password, ref } = data;
    console.log(`Function 'update' invoked. Update user with ref: ${ref}`);
    // Logic to update a user in the database

    try {
        const response = await client.query(query.Update(query.Ref(query.Collection('users'), ref), {
            data: {
                approved: approved,
                email: email,
                username: username,
                password: password,
            },
        }))
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
