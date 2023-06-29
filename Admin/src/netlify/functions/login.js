const { Client, query } = require('faunadb');
const { handleOptions } = require('./handleOptions');
const jwt = require('jsonwebtoken');

/* Configure faunaDB Client with our secret */
const client = new Client({ secret: 'fnAFG-Ky5LAATX9wNckFUbX0ngbxY2jv_PlqSUVN' });

/* Export our lambda function as named "handler" export */
const handler = async (event) => {
    if (event.httpMethod === "OPTIONS") {
        return handleOptions(event);
    }

    /* Parse the string body into a usable JS object */
    const data = JSON.parse(event.body);
    console.log('Function `login` invoked', data);
    const { username, password } = data;

    /* Construct the fauna query */
    try {
        const response = await client.query(
            query.Get(query.Match(query.Index('users_by_username'), username))
        );

        if (!response.data || response.data.password !== password) {
            throw new Error('Invalid username or password');
        }

        const token = generateToken(response.ref.id); // Generate JWT token with user ID

        /* Success! Return the response with statusCode 200 */
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            },
            body: JSON.stringify({ success: true, token }),
        };
    } catch (error) {
        console.log('Error', error);
        /* Error! Return the error with statusCode 400 */
        return {
            statusCode: 400,
            body: JSON.stringify({ success: false, message: error.message }),
        };
    }
};

// Function to generate JWT token
function generateToken(userId) {
    const secretKey = 'fnAFG-Ky5LAATX9wNckFUbX0ngbxY2jv_PlqSUVN'; // Replace with your own secret key
    const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' }); // Customize token expiration as per your requirement
    return token;
}

module.exports = { handler };
