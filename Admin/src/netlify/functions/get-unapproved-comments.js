const { client, query, handleOptions } = require('./faunaClient');

const handler = async (event) => {
  try {
    const response = await client.query(
      query.Map(
        query.Paginate(
          query.Filter(
            query.Documents(query.Collection('comments')),
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

    const comments = response.data.map((comment) => comment);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      },
      body: JSON.stringify(comments),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

module.exports = { handler };
