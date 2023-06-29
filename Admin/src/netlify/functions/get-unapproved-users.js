const { client, query } = require('./faunaClient');

const handler = async (event) => {
    try {
        const response = await client.query(
            query.Map(
                query.Paginate(
                    query.Filter(
                        query.Documents(query.Collection('users')),
                        query.Lambda(
                            (x) => query.Not(query.Select(['data', 'approved'], query.Get(x)))
                        )
                    )
                ),
                query.Lambda(
                    (x) => {
                        return {
                            ref: query.Select(['ref'], query.Get(x)),
                            data: query.Select(['data'], query.Get(x))
                        };
                    }
                )
            )
        );
        console.log('Success', response);
        const users = response.data.map((user) => user);
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow requests from any origin
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            },
            body: JSON.stringify(users),
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
